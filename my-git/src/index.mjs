#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './init.mjs';
import { add } from './add.mjs';
import { commit } from './commit.mjs';
import { catFile } from './cat-file.mjs';
import { log } from './log.mjs';

const program = new Command();

program
  .name('my-git')
  .description('自己实现的 git')
  .version('0.0.1');

program.command('init')
  .description('初始化 git 仓库')
  .action((str, options) => {
    init();
  });

program.command('add')
  .description('保存本地改动到暂存区')
  .action((str, options) => {
    add();
  });

program.command('commit')
  .description('提交改动到版本库')
  .option('-m, --message <char>', '描述信息')
  .action((options) => {
    commit(options.message);
  });

program.command('cat-file')
  .description('查看对象的内容或类型')
  .argument('<hash>', '对象的 sha1 值')
  .option('-t', '查看对象类型')
  .option('-p', '查看对象内容')
  .action((hash, options) => {
    catFile(hash, options);
  });

program.command('log')
  .description('查看当前分支的 commit 历史')
  .action(() => {
    log()
  });

program.parse();