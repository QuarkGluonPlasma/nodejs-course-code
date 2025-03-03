import fs from 'node:fs';

export function init() {
    const projectDir = process.cwd();

    const isExist = fs.existsSync(`${projectDir}/.my-git`);

    if(isExist) {
        console.log('Your project has been Initialized.');
        return;
    }

    [
        `${projectDir}/.my-git`,
        `${projectDir}/.my-git/objects`,
        `${projectDir}/.my-git/refs`,
        `${projectDir}/.my-git/refs/heads`
    ].forEach(dir => {
        fs.mkdirSync(dir, {
            recursive: true
        });
    })
    
    fs.writeFileSync(`${projectDir}/.my-git/HEAD`, 'ref: refs/heads/main');

    console.log(`Initialized empty my-git repository in ${projectDir}`);
}
