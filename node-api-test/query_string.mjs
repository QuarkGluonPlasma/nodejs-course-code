import queryString from 'node:querystring';

const res = queryString.parse('a=1&b=2&c=xxx');

console.log(res);

const res2 = queryString.stringify({ aaa: '111', bbb: ['222', '33'], ccc: '444' });

console.log(res2);
