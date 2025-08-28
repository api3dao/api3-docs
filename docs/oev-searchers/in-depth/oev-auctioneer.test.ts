import * as path from 'node:path';
import * as fs from 'node:fs';
import { test, expect } from 'vitest';
import { CHAINS } from '@api3/contracts';
import { getChains } from '@api3/dapi-management';

const supportedMainnets = getChains()
  .filter((chain) => chain.stage === 'active')
  .map((chain) => CHAINS.find((api3Chain) => api3Chain.id === chain.id)!)
  .filter((chain) => !chain.testnet)
  .filter((chain) => chain.alias !== 'oev-network')
  .map((chain) => chain.name)
  .sort((a, b) => a.localeCompare(b));

test('the auction length section lists all the supported chains', () => {
  const docPath = path.join(
    process.cwd(),
    'docs',
    'oev-searchers',
    'in-depth',
    'oev-auctioneer.md'
  );
  const content = fs.readFileSync(docPath, 'utf8');

  const chains = extractContentBetweenMarkers(content, 'chain-auction-length-table')
    .split('\n')
    .filter(Boolean) // Get rid of blank lines
    .slice(2) // Get rid of the header rows
    .map((row) => row.split('|')[1].trim());

  expect(chains).toStrictEqual(supportedMainnets);
});

function extractContentBetweenMarkers(content: string, key: string) {
  const beginMarker = `<!-- BEGIN:${key} -->`;
  const endMarker = `<!-- END:${key} -->`;
  const beginIndex = content.indexOf(beginMarker);
  const endIndex = content.indexOf(endMarker);
  if (beginIndex === -1 || endIndex === -1) {
    throw new Error(`Could not find markers "${beginMarker}" and "${endMarker}"`);
  }
  return content.slice(beginIndex + beginMarker.length, endIndex).trim();
}
