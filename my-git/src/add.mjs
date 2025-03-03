import { glob } from 'glob';
import fs from 'node:fs';
import crypto from 'node:crypto';
import zlib from 'node:zlib';

export async function add() {

    let ignore = [];
    
    try {
        const ignoreContent = fs.readFileSync(`${process.cwd()}/.mygitignore`, {encoding: 'utf-8'});

        ignore = ignoreContent.split('\n');
    } catch(e) {
    }

    const files = await glob('**', {
        cwd: process.cwd(),
        nodir: true,
        ignore: ignore
    });

    const blobs = {};

    files.forEach(item => {

        const content = fs.readFileSync(item);

        let metaData = {
            type: 'blob',
            length: content.length,
            content: content
        }

        blobs[item] = {
            metaData,
            SHA1: getSHA1(JSON.stringify(metaData))
        }
    });

    const blobsWithoutContent = {};

    for(let key in blobs) {
        blobsWithoutContent[key] = {
            SHA1: blobs[key].SHA1
        }
    }

    const indexContent = zlib.gzipSync(JSON.stringify(blobsWithoutContent));
    fs.writeFileSync(`${process.cwd()}/.my-git/index`, indexContent);

    console.log('Index write succeeded.')

    for (let item in blobs) {
        const dir = process.cwd() + '/.my-git/objects/' + blobs[item].SHA1.substring(0, 2);
        const filename = dir + '/' + blobs[item].SHA1.substring(2);
        
        try {
            fs.mkdirSync(dir);
        } catch(e) {
        }

        const content = zlib.gzipSync(JSON.stringify(blobs[item].metaData));

        fs.writeFileSync(filename, content);
    }

    console.log('Blob write succeeded');
}

function getSHA1(content) {
    return crypto.createHash('sha1').update(content, 'utf8').digest('hex');
}
