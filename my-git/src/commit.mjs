import fs from 'node:fs';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

function parseIndex() {
    try {
        const content = fs.readFileSync(process.cwd() + '/.my-git/index');
        
        const res = zlib.gunzipSync(content);
        return JSON.parse(res);
    } catch(e) {
        return null;
    } 
}

function getSHA1(content) {
    return crypto.createHash('sha1').update(content, 'utf8').digest('hex');
}

export function commit(desc) {
    const indexContent = parseIndex();
    
    if(!indexContent) {
        console.log('use "my-git add" to track');
    } else {        
        const tree = {
            type: 'tree',
            metadata: indexContent
        }

        const contentStr = JSON.stringify(tree);
        const treeSha = getSHA1(contentStr);

        const dir = process.cwd() + '/.my-git/objects/' + treeSha.substring(0, 2);
        const filename = dir + '/' + treeSha.substring(2);
        const content = zlib.gzipSync(contentStr);
    
        try{
            fs.mkdirSync(dir, {
                recursive: true
            });
        } catch(e) {}

        fs.writeFileSync(filename, content);

        console.log('tree object write success');

        let parentHash = null;
        try{
            parentHash = fs.readFileSync(getHead().fullPath, 'utf-8');
        } catch(e) {}

        const commitObj = {
            type: 'commit',
            tree: treeSha,
            time: Date.now(),
            desc: desc,
            parent: parentHash
        }

        const commitStr = JSON.stringify(commitObj);
        const commitSha = getSHA1(commitStr);

        const commitDir = process.cwd() + '/.my-git/objects/' + commitSha.substring(0, 2);
        const commitObjFilename = commitDir + '/' + commitSha.substring(2);
        const zipContent = zlib.gzipSync(commitStr);
    
        try{
            fs.mkdirSync(commitDir, {
                recursive: true
            });
        } catch(e) {}

        fs.writeFileSync(commitObjFilename, zipContent);

        console.log('commit object write success');

        fs.writeFileSync(getHead().fullPath, commitSha);

        fs.rmSync(process.cwd() + '/.my-git/index')
    }
}

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
