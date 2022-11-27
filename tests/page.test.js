import { describe, expect, it } from 'vitest';
import { tsvToData } from '../src/mapper';
import { merge } from '../merge';

const tsvData = `name	theme	type	cost	est_cust	maintenance_time	workers	updated_at
Radical Hot Dogs	extreme	food	89000	139	39	3	2022-05-15T15:12:59.152Z
`;

const jsonData = [
  {
    "name": "Gangplank Drop",
    "theme": "pirate",
    "type": "flat",
    "cost": 1657000,
    "est_cust": 1138,
    "maintenance_time": 30,
    "workers": 3,
    "updated_at": "2022-06-15T15:12:59.152Z"
  },
];

const expectedFormat = {
  "name": "Radical Hot Dogs",
  "theme": "extreme",
  "type": "food",
  "cost": "89000",
  "est_cust": "139",
  "maintenance_time": "39",
  "workers": "3",
  "updated_at": "2022-05-15T15:12:59.152Z",
};

const expectedMergedOutput = [expectedFormat, ...jsonData]; 

describe('merge test', () => {
  const parsedTsvData = tsvToData(tsvData);
  
  it('tests if TSV is correctly mapped to be equal to the expected data structure', () => {
    expect(parsedTsvData[0]).toEqual(expectedFormat);
  })
  it('tests if both data were really merged', () => {
    expect(merge(parsedTsvData, jsonData)).toEqual(expectedMergedOutput);
  })
})
