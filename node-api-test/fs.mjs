import fs from 'node:fs';

fs.mkdirSync('aaa');

setTimeout(() => {
    fs.renameSync('aaa', 'bbb');
}, 1000);

setTimeout(() => {
    fs.rmdirSync('bbb');
}, 3000);

