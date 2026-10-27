// Checks the DAO pages against the live api3.eth space on the Snapshot hub.
// The voting power page has to name every contract, method, field and market
// the space's strategies read, and nothing else, and the voting page has to
// carry the threshold, voting type, delay, period and quorum the space is set to.
const fs = require('fs');
const path = require('path');

const HUB = 'https://hub.snapshot.org/graphql';
const SPACE = 'api3.eth';
const daoDir = path.join(__dirname, '..', 'docs', 'dao');

const query = `{
  space(id: "${SPACE}") {
    network
    strategies { name network params }
    voting { type delay period quorum }
    validation { name params }
  }
}`;

async function fetchSpace() {
  const response = await fetch(HUB, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
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

async function main() {
  const space = await fetchSpace();
  const problems = [];
  const votingPowerPage = fs.readFileSync(path.join(daoDir, 'voting-power.md'), 'utf-8');
  const votingPage = fs.readFileSync(path.join(daoDir, 'voting.md'), 'utf-8');

  if (space.network !== '1') {
    problems.push(`The space is on network ${space.network}, the pages say Ethereum mainnet`);
  }
  if (space.strategies.length !== 1 || space.strategies[0].name !== 'with-delegation') {
    problems.push(
      `The space runs ${space.strategies.map((strategy) => strategy.name).join(', ')}, the voting power page describes one with-delegation strategy`
    );
  }
  const sources = space.strategies[0]?.params?.strategies ?? [];
  if (sources.length !== 5) {
    problems.push(`The strategy reads ${sources.length} sources, the voting power page describes five`);
  }

  const reads = collectReads(space.strategies);
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

  const tokenPage = fs.readFileSync(path.join(daoDir, 'api3-token.md'), 'utf-8');
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

  if (space.validation.name !== 'basic') {
    problems.push(
      `The space validates proposals with ${space.validation.name}, the proposals page describes a basic threshold`
    );
  }
  const rows = {
    'Voting type': space.voting.type === 'basic' ? 'Basic' : String(space.voting.type),
    'Proposal threshold': formatAmount(space.validation.params?.minScore),
    'Voting delay': space.voting.delay ? formatDays(space.voting.delay) : 'None',
    'Voting period': formatDays(space.voting.period),
    Quorum: `${formatAmount(space.voting.quorum)} in favour`,
  };
  for (const [setting, value] of Object.entries(rows)) {
    if (!hasRow(votingPage, setting, value)) {
      problems.push(`voting.md has no settings row "${setting}" with the value "${value}" the space is set to`);
    }
  }

  if (problems.length > 0) {
    console.error(`The DAO pages differ from the ${SPACE} space on the hub:`);
    problems.forEach((problem) => console.error(`- ${problem}`));
    process.exit(1);
  }
  console.log(`The DAO pages match the ${SPACE} space on the hub.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
