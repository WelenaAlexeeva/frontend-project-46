import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixture = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixture(filename), 'utf-8');

test('test1', () => {
  const file1 = getFixture('file1.json');
  const file2 = getFixture('file2.json');
  const response = genDiff(file1, file2);
  const fileContent = readFixtureFile('result.txt').trim();
  expect(response.trim()).toEqual(fileContent);
});
