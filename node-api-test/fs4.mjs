import fs from 'node:fs';
import path from 'node:path';

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true });

    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      copy(srcFile, destFile)
    }
}

function copy(src, dest) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
        copyDir(src, dest)
    } else {
        fs.copyFileSync(src, dest)
    }
}

copy('aaa', 'aaa2');

fs.cpSync('aaa', 'aaa3', {
    recursive: true
});
