import fs from 'node:fs';
import zlib from 'node:zlib';

export function catFile(hash, options) {
    const dir = hash.slice(0, 2);
    const filename = hash.slice(2);

    const filePath = `${process.cwd()}/.my-git/objects/${dir}/${filename}`;

    const compressedContent = fs.readFileSync(filePath);
    const content = zlib.gunzipSync(compressedContent);

    const obj = JSON.parse(content);

    if(options.t) {
        console.log(obj.type);
    } else {
        switch(obj.type) {
            case 'blob':
                console.log(Buffer.from(obj.content.data).toString('utf-8'))
                break;
            case 'tree':
                console.log(obj.metadata);
                break;
            case 'commit':
                console.log(obj.tree);
                break;
        }
    } 
}
