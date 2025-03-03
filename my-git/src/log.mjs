import fs from 'node:fs';
import zlib from 'node:zlib';

function getHead() {
    const content = fs.readFileSync(process.cwd() + '/.my-git/HEAD', 'utf-8');

    let refPath = content.split(':')[1].trim();

    let refPathArr = refPath.split('/');
    const curBranch = refPathArr[refPathArr.length - 1];
    return {
        curBranch: curBranch,
        fullPath: `${process.cwd()}/.my-git/${refPath}`
    }
}

export function log() {
    const head = getHead();
    const hash = fs.readFileSync(head.fullPath, 'utf-8');

    let list = [];
    let curHash = hash;

    while(curHash !== null) {
        const dir = curHash.slice(0, 2);
        const filename = curHash.slice(2);

        const filePath = `${process.cwd()}/.my-git/objects/${dir}/${filename}`;

        const compressedContent = fs.readFileSync(filePath);
        const content = zlib.gunzipSync(compressedContent);

        const obj = JSON.parse(content);

        list.push(obj);

        curHash = obj.parent
    }

    console.log(list);
}
