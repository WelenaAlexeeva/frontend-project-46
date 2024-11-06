import path from 'path';
import fs from 'fs';

// console.log(console.log(path.sep));

const getPath = (file) => path.resolve(process.cwd(), file);


export default (filepath1, filepath2, options) => {
    console.log(filepath1, filepath2, options.format);
    const resolvedFilepath1 = getPath(filepath1);
    const resolvedFilepath2 = getPath(filepath2);
    
    const content1 = fs.readFileSync(resolvedFilepath1, 'utf-8');
    const content2 = fs.readFileSync(resolvedFilepath2, 'utf-8');

    const obj1 = JSON.parse(content1);
    const obj2 = JSON.parse(content2);
    
    console.log(obj1);
    console.log(obj2);
};
