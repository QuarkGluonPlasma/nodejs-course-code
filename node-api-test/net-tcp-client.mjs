import net from 'node:net';

const socket = net.createConnection({ 
    host: 'localhost',
    port: 6666 
}, () => {
  console.log('连接到了服务端!');

  socket.write('world!\n');

  setTimeout(()=> {
    socket.end();
  }, 2000);
});

socket.on('data', (data) => {
  console.log(data.toString());
});

socket.on('end', () => {
  console.log('断开连接');
});