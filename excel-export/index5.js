const { execSync } = require('node:child_process');
const { parse } = require("csv-parse/sync");
const fs = require('node:fs');

const sheetUrl = "https://docs.google.com/spreadsheets/d/15tYKwXyhKVfe2dm2G28ESjEhd_kuo2-9VMO9HPb6Zfo";

execSync(`curl -L ${sheetUrl}/export?format=csv -o ./message2.csv`, {
    stdio: 'ignore'
});

const input = fs.readFileSync("./message2.csv");

const data = parse(input, { columns: true });

const zhCNBundle = {};
const enUSBundle = {};

data.forEach(item => {
    const keys = Object.keys(item);
    const key = item[keys[0]];
    const valueZhCN = item[keys[1]];
    const valueEnUS = item[keys[2]];

    zhCNBundle[key] = valueZhCN;
    enUSBundle[key] = valueEnUS;
})

console.log(zhCNBundle);
console.log(enUSBundle);

fs.writeFileSync('zh-CN.json', JSON.stringify(zhCNBundle, null, 2));
fs.writeFileSync('en-US.json', JSON.stringify(enUSBundle, null, 2));