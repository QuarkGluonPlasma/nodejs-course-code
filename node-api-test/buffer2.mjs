import { Buffer } from 'node:buffer';

const buffer = Buffer.alloc(10);

buffer.writeUint16LE(256, 0)

console.log(buffer.readUInt16LE(0));
console.log(buffer.readUint8(0), buffer.readUint8(1));