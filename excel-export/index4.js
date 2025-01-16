const { stringify } = require("csv-stringify");
const fs = require('node:fs');

const languages = ['zh-CN', 'en-US'];

async function main(){
    const bundleData = languages.map(item => {
        return JSON.parse(fs.readFileSync(`./${item}.json`));
    })

    const data = [];
    bundleData.forEach((obj, index) => {
        const keys = Object.keys(obj);

        for(let i = 0; i< keys.length; i++) {
            const key = keys[i];

            const foundItem = data.find(item => item.id === key);
            if(foundItem) {
                foundItem[languages[index]] = obj[key]
            } else {
                data.push({
                    id: key,
                    [languages[index]]: obj[key]
                });
            }
        }        
    });

    console.log(data);

    const columns = {
        id: "Message ID",
        'zh-CN': "zh-CN",
        'en-US': "en-US"
    };
      
    stringify(data, { header: true, columns }, function (err, output) {
        fs.writeFileSync("./messages.csv", output);
    });
}

main();