import { Buffer } from 'node:buffer';

const buf1 = Buffer.alloc(10, 6);

const buf2 = Buffer.from('神说要有光', 'utf-8');

const buf3 = Buffer.from([1, 2, 3]);

console.log(buf1.toString('hex'))

console.log(buf2.toString('utf-8'))
console.log(buf2.toString('base64'))

console.log(buf3.toString('hex'))
