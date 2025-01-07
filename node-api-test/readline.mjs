import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const rl = createInterface({
  input: createReadStream('./repl.mjs')
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
});
