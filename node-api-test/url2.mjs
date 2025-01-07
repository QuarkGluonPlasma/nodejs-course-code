import http from 'node:http';
import url from 'node:url';

// const options = {
//     method: 'GET',
//     host: 'www.baidu.com',
//     port: 80,
//     path: '/'
// };

const options = url.urlToHttpOptions(new URL('http://www.baidu.com:80/'));

console.log(options);

const req = http.request(options, res => {
    res.on('data', (chunk) => {
        console.log(chunk.toString());
    });
    res.on('end', () => {
        console.log('done');
    });
});

req.end();
