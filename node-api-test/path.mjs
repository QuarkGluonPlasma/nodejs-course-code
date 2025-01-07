import path from 'node:path';
import { fileURLToPath } from 'node:url'

const filePath = fileURLToPath(import.meta.url)

console.log(filePath)
console.log(path.dirname(filePath));
console.log(path.basename(filePath));
console.log(path.extname(filePath));
