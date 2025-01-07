import { parentPort } from 'node:worker_threads';

function calc(num) {
    let total = 0;
    for(let i = 0; i< num; i++) {
        total += i;
    }
    return total
}

parentPort.on('message', (message) => {
    const res = calc(message.value);

    message.channel.postMessage(res);
});
