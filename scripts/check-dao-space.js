// Checks the DAO pages against the live api3.eth space on the Snapshot hub.
// Pin the complete strategy parameters and participation rules as well as
// checking the contracts, reads and settings named on the pages.
const fs = require('fs');
const path = require('path');
const { isDeepStrictEqual } = require('node:util');
const documentedSpace = require('./fixtures/dao-space.json');

const HUB = 'https://hub.snapshot.org/graphql';
const SPACE = 'api3.eth';
const daoDir = path.join(__dirname, '..', 'docs', 'dao');

const query = `{
  space(id: "${SPACE}") {
    network
    symbol
    strategies { name network params }
    voting { type delay period quorum hideAbstain privacy }
    validation { name params }
    voteValidation { name params }
    filters { onlyMembers }
    admins
    members
    moderators
    treasuries { name address network }
  }
}`;

async function fetchSpace() {
  const response = await fetch(HUB, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    throw new Error(`The hub returned ${response.status}`);
  }
  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(`The hub returned errors: ${JSON.stringify(errors)}`);
  }
  if (!data.space) {
    throw new Error(`The hub has no space ${SPACE}`);
  }
  return data.space;
}

// Every value a strategy reads: contract addresses, bytes32 arguments such as
// a market id, method names and output fields.
function collectReads(value, reads = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectReads(item, reads));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (key === 'address' || key === 'output') {
        reads.add(item);
      } else if (key === 'methodABI') {
        reads.add(item.name);
      } else if (key === 'args') {
        item.filter((arg) => /^0x[0-9a-fA-F]{64}$/.test(arg)).forEach((arg) => reads.add(arg));
      } else {
        collectReads(item, reads);
      }
    }
  }
  return reads;
}

function formatAmount(amount) {
  return `${Number(amount).toLocaleString('en-US')} API3`;
}

function formatDays(seconds) {
  const days = seconds / 86400;
  return `${Number.isInteger(days) ? days : days.toFixed(2)} days`;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasRow(page, setting, value) {
  const row = new RegExp(`^\\|\\s*${escapeRegExp(setting)}\\s*\\|\\s*${escapeRegExp(value)}\\s*\\|\\s*$`, 'm');
  return row.test(page);
}

function checkSpace(space, pages) {
  const problems = [];
  const { votingPowerPage, votingPage, tokenPage, overviewPage } = pages;

  for (const [setting, expected] of Object.entries(documentedSpace)) {
    if (!isDeepStrictEqual(space[setting], expected)) {
      problems.push(`${setting} differs from the documented configuration in scripts/fixtures/dao-space.json`);
    }
  }

  for (const { name, address } of documentedSpace.treasuries) {
    if (!overviewPage.includes(`[${name}](https://etherscan.io/address/${address})`)) {
      problems.push(`index.md does not link ${name} to its documented multisig ${address}`);
    }
  }

  if (space.network !== '1') {
    problems.push(`The space is on network ${space.network}, the pages say Ethereum mainnet`);
  }
  const strategies = space.strategies ?? [];
  if (strategies.length !== 1 || strategies[0].name !== 'with-delegation') {
    problems.push(
      `The space runs ${strategies.map((strategy) => strategy.name).join(', ')}, the voting power page describes one with-delegation strategy`
    );
  }
  const sources = strategies[0]?.params?.strategies ?? [];
  if (sources.length !== 5) {
    problems.push(`The strategy reads ${sources.length} sources, the voting power page describes five`);
  }

  const reads = collectReads(strategies);
  for (const read of reads) {
    if (!votingPowerPage.includes(read)) {
      problems.push(`voting-power.md does not mention ${read}, which the space's strategies read`);
    }
  }
  for (const hex of new Set(votingPowerPage.match(/0x[0-9a-fA-F]{40,}/g) ?? [])) {
    if (!reads.has(hex)) {
      problems.push(`voting-power.md lists ${hex}, which the space's strategies do not read`);
    }
  }

  const tokenAddress = sources.find((source) => source.name === 'erc20-balance-of')?.params?.address;
  if (!tokenAddress) {
    problems.push('The strategy has no erc20-balance-of source, the token page describes the token it reads');
  } else if (!tokenPage.includes(tokenAddress)) {
    problems.push(`api3-token.md does not name the token ${tokenAddress} the space reads`);
  }
  for (const hex of new Set(tokenPage.match(/0x[0-9a-fA-F]{40,}/g) ?? [])) {
    if (!reads.has(hex)) {
      problems.push(`api3-token.md lists ${hex}, which the space's strategies do not read`);
    }
  }

  if (space.validation?.name !== 'basic') {
    problems.push(
      `The space validates proposals with ${space.validation?.name}, the voting page describes a basic threshold`
    );
  }
  const voting = space.voting ?? {};
  const rows = {
    'Voting type': voting.type === 'basic' ? 'Basic' : String(voting.type),
    'Proposal threshold': formatAmount(space.validation?.params?.minScore),
    'Voting delay': voting.delay ? formatDays(voting.delay) : 'None',
    'Voting period': formatDays(voting.period),
    Quorum: `${formatAmount(voting.quorum)} in favour`,
    Abstain: voting.hideAbstain === true ? 'Hidden' : 'Visible',
    'Vote privacy': voting.privacy === '' ? 'Public' : String(voting.privacy),
    'Who can vote':
      space.voteValidation?.name === 'any' ? 'Any voting power holder' : String(space.voteValidation?.name),
    'Posting access': space.filters?.onlyMembers === false ? 'Anyone meeting the threshold' : 'Members only',
  };
  for (const [setting, value] of Object.entries(rows)) {
    if (!hasRow(votingPage, setting, value)) {
      problems.push(`voting.md has no settings row "${setting}" with the value "${value}" the space is set to`);
    }
  }

  return problems;
}

async function main() {
  const space = await fetchSpace();
  const readPage = (file) => fs.readFileSync(path.join(daoDir, file), 'utf-8');
  const problems = checkSpace(space, {
    votingPowerPage: readPage('voting-power.md'),
    votingPage: readPage('voting.md'),
    tokenPage: readPage('api3-token.md'),
    overviewPage: readPage('index.md'),
  });

  if (problems.length > 0) {
    console.error(`The DAO pages differ from the ${SPACE} space on the hub:`);
    problems.forEach((problem) => console.error(`- ${problem}`));
    process.exit(1);
  }
  console.log(`The DAO pages match the ${SPACE} space on the hub.`);
}

module.exports = { checkSpace };

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
