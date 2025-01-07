import util from 'node:util';
import cp from 'node:child_process';

// cp.exec('ls -l', (stderr, stdout) => {
//     console.log(stdout);
// });

const exec = util.promisify(cp.exec);

async function main() {
  const { stdout, stderr } = await exec('ls -l');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
main();
