import { createHash } from 'node:crypto';
import { Readable } from 'node:stream';

const rs = new Readable();
rs._read = function() {
    this.push('123456');
    this.push(null);
}

const hash = createHash('sha256');
rs.pipe(hash).setEncoding('hex').pipe(process.stdout);

