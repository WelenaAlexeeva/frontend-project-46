import yaml from 'js-yaml';

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

export default parseFile;
