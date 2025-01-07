import cp from 'node:child_process';

const child = cp.execFile('/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome', ['--user-data-dir=./aaa']);
