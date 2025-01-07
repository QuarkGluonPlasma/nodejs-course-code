import vm from 'node:vm';

const context = {
    console,
    guang: 111,
    dong: 222
}

vm.createContext(context);

vm.runInContext('console.log(guang + dong)', context);
