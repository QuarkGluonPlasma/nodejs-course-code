import url from 'node:url';

console.log(import.meta.url);
console.log(import.meta.resolve('./a.js'))

console.log(import.meta.dirname);
console.log(import.meta.filename);

console.log(url.fileURLToPath(import.meta.url))
