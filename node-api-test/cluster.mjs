import cluster from 'node:cluster';
import http from 'node:http';
import { cpus } from 'node:os';
 
const numCPUs = cpus().length;
 
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    console.log('worker 创建成功', worker.id);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker 退出:', worker.id);
  });
} else {
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  })
  
  server.listen(8000);

  setTimeout(()=> {
    process.exit();
  }, 3000)
}
