import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixture = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixture(filename), 'utf-8');

const testCase = [
  [undefined, 'json', 'json', 'result-stylish.txt'],
  [undefined, 'yaml', 'yaml', 'result-stylish.txt'],
  ['stylish', 'json', 'json', 'result-stylish.txt'],
  ['stylish', 'yaml', 'yaml', 'result-stylish.txt'],
  ['plain', 'json', 'json', 'result-plain.txt'],
  ['plain', 'yaml', 'yaml', 'result-plain.txt'],
  ['json', 'json', 'json', 'result-json.txt'],
  ['json', 'yaml', 'yaml', 'result-json.txt'],
];

test.each(testCase)('Get difference in %s format of two %s files', (format, extension1, extension2, result) => {
  const file1 = getFixture(`file1.${extension1}`);
  const file2 = getFixture(`file2.${extension2}`);
  const response = genDiff(file1, file2, format);
  const fileContent = readFixtureFile(result).trim();
  expect(response.trim()).toEqual(fileContent);
});
