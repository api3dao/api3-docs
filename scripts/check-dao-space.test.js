const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { checkSpace } = require('./check-dao-space');
const documentedSpace = require('./fixtures/dao-space.json');

const readPage = (name) => fs.readFileSync(path.join(__dirname, '..', 'docs', 'dao', name), 'utf8');
const pages = {
  votingPowerPage: readPage('voting-power.md'),
  votingPage: readPage('voting.md'),
  tokenPage: readPage('api3-token.md'),
  overviewPage: readPage('index.md'),
};

test('the documented configuration matches the DAO pages', () => {
  assert.deepEqual(checkSpace(documentedSpace, pages), []);
});

const changes = [
  [
    'stake multiplication becomes division',
    'strategies',
    (space) => {
      space.strategies[0].params.strategies[1].params.operands[0].strategy.params.operation = 'divide';
    },
  ],
  [
    'stake division uses reversed operands',
    'strategies',
    (space) => {
      space.strategies[0].params.strategies[1].params.operands.reverse();
    },
  ],
  [
    'token decimals change',
    'strategies',
    (space) => {
      space.strategies[0].params.strategies[0].params.decimals = 6;
    },
  ],
  [
    'a strategy reads another network',
    'strategies',
    (space) => {
      space.strategies[0].params.strategies[0].network = '137';
    },
  ],
  [
    'delegation reads another space',
    'strategies',
    (space) => {
      space.strategies[0].params.delegationSpace = 'another.eth';
    },
  ],
  [
    'delegation reads another network',
    'strategies',
    (space) => {
      space.strategies[0].params.delegationNetwork = '137';
    },
  ],
  [
    'the Morpho market changes',
    'strategies',
    (space) => {
      space.strategies[0].params.strategies[4].params.args[0] = `0x${'1'.repeat(64)}`;
    },
  ],
  [
    'a source is removed',
    'strategies',
    (space) => {
      space.strategies[0].params.strategies.pop();
    },
  ],
  [
    'a source is added',
    'strategies',
    (space) => {
      space.strategies[0].params.strategies.push(structuredClone(space.strategies[0].params.strategies[0]));
    },
  ],
  [
    'abstain becomes visible',
    'voting',
    (space) => {
      space.voting.hideAbstain = false;
    },
  ],
  [
    'authors can choose vote privacy',
    'voting',
    (space) => {
      space.voting.privacy = 'any';
    },
  ],
  [
    'votes become private',
    'voting',
    (space) => {
      space.voting.privacy = 'shutter';
    },
  ],
  [
    'voting is restricted',
    'voteValidation',
    (space) => {
      space.voteValidation = { name: 'whitelist', params: { addresses: [] } };
    },
  ],
  [
    'only members can post',
    'filters',
    (space) => {
      space.filters.onlyMembers = true;
    },
  ],
  [
    'proposal validation uses different strategies',
    'validation',
    (space) => {
      space.validation.params.strategies = [];
    },
  ],
  [
    'the posting threshold changes',
    'validation',
    (space) => {
      space.validation.params.minScore = 1;
    },
  ],
  [
    'the voting type is not fixed',
    'voting',
    (space) => {
      space.voting.type = null;
    },
  ],
  [
    'the voting period changes',
    'voting',
    (space) => {
      space.voting.period = 86400;
    },
  ],
  [
    'the quorum changes',
    'voting',
    (space) => {
      space.voting.quorum = 0;
    },
  ],
  [
    'the voting delay changes',
    'voting',
    (space) => {
      space.voting.delay = 3600;
    },
  ],
  [
    'the Treasury address changes',
    'treasuries',
    (space) => {
      space.treasuries[2].address = space.treasuries[0].address;
    },
  ],
];

for (const role of ['admins', 'members', 'moderators']) {
  changes.push([
    `${role} gain access`,
    role,
    (space) => {
      space[role].push(space.treasuries[0].address);
    },
  ]);
}

for (const [name, setting, mutate] of changes) {
  test(`rejects when ${name}`, () => {
    const space = structuredClone(documentedSpace);
    mutate(space);
    const problems = checkSpace(space, pages);
    assert.ok(
      problems.some((problem) => problem.startsWith(`${setting} differs`)),
      problems.join('\n')
    );
  });
}

test('rejects a stale threshold in the voting page even when the settings match', () => {
  const votingPage = pages.votingPage.replace(/500,000 API3/g, '50,000 API3');
  assert.ok(
    checkSpace(documentedSpace, { ...pages, votingPage }).some((problem) => problem.includes('Proposal threshold'))
  );
});

test('rejects a stale vote privacy description even when the settings match', () => {
  const votingPage = pages.votingPage.replace('Public', 'Private');
  assert.ok(checkSpace(documentedSpace, { ...pages, votingPage }).some((problem) => problem.includes('Vote privacy')));
});

test('rejects a missing pool read in the voting power page', () => {
  const votingPowerPage = pages.votingPowerPage.replaceAll('userVotingPower', 'userStake');
  assert.ok(
    checkSpace(documentedSpace, { ...pages, votingPowerPage }).some((problem) => problem.includes('userVotingPower'))
  );
});

test('rejects a different token contract in the token page', () => {
  const tokenPage = pages.tokenPage.replaceAll(
    documentedSpace.strategies[0].params.strategies[0].params.address,
    `0x${'1'.repeat(40)}`
  );
  assert.ok(checkSpace(documentedSpace, { ...pages, tokenPage }).some((problem) => problem.includes('api3-token.md')));
});

test('rejects an incorrect Treasury link in the overview', () => {
  const overviewPage = pages.overviewPage.replace(documentedSpace.treasuries[2].address, `0x${'1'.repeat(40)}`);
  assert.ok(checkSpace(documentedSpace, { ...pages, overviewPage }).some((problem) => problem.includes('index.md')));
});
