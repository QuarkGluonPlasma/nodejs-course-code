
import { createInterface } from 'node:readline';
import { exit, stdin, stdout } from 'node:process';

const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt: 'guang> ',
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log(`你说啥？我听到的是 '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('bye!');
  exit(0);
});
