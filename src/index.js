import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';



const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));
  
  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    
    // если не было в 1 - добавлен
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }
    // если нет во 2 - удален
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    // если есть в обоих и равны - не изменено
    if (value1 === value2) {
      return { key, value: value1, type: 'unchanged' };
    }
    
    // остальное - изменено
    return {
      key, oldValue: value1, value: value2, type: 'changed',
    };
  });
  return result;
};

function formatter(tree) {
  const result = tree.reduce((acc, item) => {
    const { key } = item;
    if (item.type === 'deleted') {
      acc.push(`  - ${key}: ${item.value}`);
    } else if (item.type === 'unchanged') {
      acc.push(`    ${key}: ${item.value}`);
    } else if (item.type === 'changed') {
      acc.push(`  - ${key}: ${item.oldValue}`);
      acc.push(`  + ${key}: ${item.value}`);
    } else if (item.type === 'added') {
      acc.push(`  + ${key}: ${item.value}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
}

const getPath = (file) => path.resolve(process.cwd(), file);

const readFile = (filepath) => {
  const resolvedFilepath = getPath(filepath);
  return fs.readFileSync(resolvedFilepath, 'utf-8');
}

const parseFile = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
      case 'yml':
      case 'yaml':
        return yaml.load(data);
        default:
          throw new Error`Unknown format`();
  }
};
        
const getExtension = (filepath) => filepath.split('.')[1];

export default (filepath1, filepath2) => {

  const obj1 = parseFile(readFile(filepath1), getExtension(filepath1));
  const obj2 = parseFile(readFile(filepath2), getExtension(filepath2));

  const difference = genDiff(obj1, obj2);

  console.log(formatter(difference));
  return formatter(difference);
};
