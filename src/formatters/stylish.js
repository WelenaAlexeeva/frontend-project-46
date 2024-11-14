import _ from 'lodash';

const replacer = '    ';

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indent = replacer.repeat(depth);
  const strings = Object.entries(data).map(([key, value]) => `${indent}    ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${strings.join('\n')}\n${indent}}`;
};

const stylish = (data) => {
  const iter = (node, depth) => {
    const indent = replacer.repeat(depth);
    const result = node.flatMap(({
      key, oldValue, value, type,
    }) => {
      switch (type) {
        case 'added':
          return `${indent}  + ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${indent}  - ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}    ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${indent}  - ${key}: ${stringify(oldValue, depth + 1)}\n${indent}  + ${key}: ${stringify(value, depth + 1)}`;
        case 'hasChild':
          return `${indent}    ${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error('something wrong');
      }
    });
    return `{\n${result.join('\n')}\n${indent}}`;
  };
  return iter(data, 0);
};

export default stylish;
