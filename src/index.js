import path from 'path';
import fs from 'fs';
import _ from 'lodash';

// console.log(console.log(path.sep));

const getPath = (file) => path.resolve(process.cwd(), file);

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = {};
  keys.forEach((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      // Свойство есть только в первом объекте
      result[`- ${key}`] = obj1[key];
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      // Свойство есть только во втором объекте
      result[`+ ${key}`] = obj2[key];
    } else if (obj1[key] !== obj2[key]) {
      // Свойство есть в обоих объектах, но значения разные
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    }
    // Если значения одинаковы, ничего не делаем
  });
  return result;
};

export default (filepath1, filepath2) => {
  const resolvedFilepath1 = getPath(filepath1);
  const resolvedFilepath2 = getPath(filepath2);

  const content1 = fs.readFileSync(resolvedFilepath1, 'utf-8');
  const content2 = fs.readFileSync(resolvedFilepath2, 'utf-8');

  const obj1 = JSON.parse(content1);
  const obj2 = JSON.parse(content2);

  const difference = genDiff(obj1, obj2);

  Object.entries(difference).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  return JSON.stringify(difference);
};
