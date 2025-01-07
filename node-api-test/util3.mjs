import util from 'util';

const flag = util.debug('flag');

if (flag.enabled) {
  console.log('这是一条 debug 日志 111');
}

const flag2 = util.debug('flag2');

if (flag2.enabled) {
  console.log('这是一条 debug 日志 222');
}
