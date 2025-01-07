import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer(async function (req, res) {

    const writeStream = fs.createWriteStream('aaa.txt', 'utf-8');
    req.pipe(writeStream);

    res.write('66666');
    res.end('done');
});

server.listen(8000);
