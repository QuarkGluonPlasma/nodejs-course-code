import http from 'node:http';

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello guang\n');
})

server.listen(8000);
