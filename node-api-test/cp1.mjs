import cp from "node:child_process";

const ls = cp.spawn('ls', ['-l', './']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`进程退出 ${code}`);
});
