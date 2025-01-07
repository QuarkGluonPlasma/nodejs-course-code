import repl from 'node:repl';
import cfonts from 'cfonts';

const r = repl.start({ prompt: '> ', eval: myEval});

function myEval(cmd, context, filename, callback) {
    cfonts.say(cmd, {
        font: '3D',
        colors: ['yellow', 'cyan']
    });
    callback();
}

