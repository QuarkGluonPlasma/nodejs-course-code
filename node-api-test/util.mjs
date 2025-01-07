import util from 'node:util';

console.log(util.format
`这是一个数字：%d 
这是一个字符串：%s
这是一个 JSON：%j
这是一个 对象：%o`, 111, '神说要有光', {
    a: 1, 
    b: { 
        c: 2 
    }
}, {
    a: 1, 
    b: { 
        c: 2 
    }
});


