import fs from 'node:fs';
import { EOL } from 'node:os';

fs.writeFileSync('aaa.txt', 'hello' + EOL);

setTimeout(() => {
    fs.appendFileSync('aaa.txt', 'world' + EOL)
}, 2000);

setTimeout(() => {
    fs.unlinkSync('aaa.txt');
}, 4000)
