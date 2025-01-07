const path = require('node:path');

const filePath = path.join('../', 'node-api-test', './', 'path2.js');

console.log(filePath);

const filePath2 = path.resolve('../', 'node-api-test', './', 'path2.js');

console.log(filePath2);

console.log(path.relative('/a/b/c', '/a/d'));

console.log(path.parse(__filename));
