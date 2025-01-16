const { Workbook } = require('exceljs');
const fs = require('node:fs');

const languages = ['zh-CN', 'en-US'];

async function main(){
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('test');

    const bundleData = languages.map(item => {
        return JSON.parse(fs.readFileSync(`./${item}.json`));
    })

    const data = [];

    bundleData.forEach((item, index) => {
        for(let key in item) {
            const foundItem = data.find(item => item.id === key);
            if(foundItem) {
                foundItem[languages[index]] = item[key]
            } else {
                data.push({
                    id: key,
                    [languages[index]]: item[key]
                })
            }
        }
    })

    console.log(data);

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 30 },
        ...languages.map(item => {
            return {
                header: item,
                key: item,
                width: 30
            }
        })
    ];

    worksheet.addRows(data);

    workbook.xlsx.writeFile('./bundle.xlsx');    
}

main();