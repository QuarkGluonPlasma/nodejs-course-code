import fs from 'node:fs';

fs.mkdirSync('aaa/bbb/ccc/ddd', { 
    recursive: true
});

fs.writeFileSync('aaa/a.txt', '111');
fs.writeFileSync('aaa/bbb/b.txt', '222');
fs.writeFileSync('aaa/bbb/ccc/c.txt', '333');
fs.writeFileSync('aaa/bbb/ccc/ddd/d.txt', '444');

