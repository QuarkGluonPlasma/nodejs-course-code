import dns from 'node:dns/promises';

async function main() {
    const res = await dns.resolve('baidu.com');
    console.log(res);
}

main();

