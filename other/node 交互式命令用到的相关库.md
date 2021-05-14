## 用途

用 node 写一些小工具时会用到。

例如我最近在写的一个内容加解密工具，其中需要用户交互式输入两次密钥，这就需要 node 相关的交互库。

## 相关工具

### `yargs` 和 `commander`

#### 场景

实现类似 `docker --help` 的相关命令行提示

#### 例子

1、`yargs` 例子：

```js
#!/usr/bin/env node
var argv = require('yargs')
  .option('f', {
    alias : 'name',
    demand: true,
    default: 'tom',
    describe: 'your name',
    type: 'string'
  })
  .usage('Usage: hello [options]')
  .example('hello -n tom', 'say hello to Tom')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2021')
  .argv;

console.log('hello ', argv.n);
```

给这个 node 脚本加上 755 权限，下面是输出：

```log
$ ./hello -h

Usage: hello [options]

选项：
      --version  显示版本号                                               [布尔]
  -f, --name     your name                       [字符串] [必需] [默认值: "tom"]
  -h, --help     显示帮助信息                                             [布尔]

示例：
  hello -n tom  say hello to Tom

copyright 2021
```

2、`commander` 例子：

```js
#!/usr/bin/env node
const program = require('commander')

program
  .command('module')
  .alias('m')
  .description('创建新的模块')
  .option('-a, --name [moduleName]', '模块名称')
  .action(option => {
    console.log('Hello World')
    //为什么是Hello World 给你个眼神，自己去体会...
  })

program.parse(process.argv)
```

给这个 node 脚本加上 755 权限，下面是输出：

```log
$ ./hello -h

Usage: index [options] [command]

Options:
  -h, --help          display help for command

Commands:
  module|m [options]  创建新的模块
  help [command]      display help for command
```

`yargs` 、`commander` 两者写法风格类似，功能也类似。

#### 相关链接

[阮一峰-Node.js 命令行程序开发教程](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)
[跟着老司机玩转Node命令行](https://jelly.jd.com/article/6006b1045b6c6a01506c87b4)
[NodeJS 命令行工具评测：meow, commander, yargs](https://zhuanlan.zhihu.com/p/56316812)

### `inquirer`

#### 场景

实现类似 `vue-cli` 的交互式创建脚手架

#### 例子

```js
var inquirer = require('inquirer');

const promptList = [{
  type: 'input',
  message: '设置一个用户名:',
  name: 'name',
  default: "test_user" // 默认值
}, {
  type: 'input',
  message: '请输入手机号:',
  name: 'phone',
}];

inquirer.prompt(promptList).then((answers) => {
  console.log('结果为:')
  console.log(answers)
})
```

下面是输入：

```log
$ node demo.js    

? 设置一个用户名: wanger
? 请输入手机号: 123qwe
结果为:
{ name: 'wanger', phone: '123qwe' }
```

更多例子可以参考下面的相关链接。

#### 相关链接

[inquirer.js —— 一个用户与命令行交互的工具](https://blog.csdn.net/qq_26733915/article/details/80461257)

### `chalk`

#### 场景

给输出的信息上色

#### 例子

```js
const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));
```

### `figlet`

#### 场景

输出 `FIGfont`， 看下面的例子

#### 例子

```js
var figlet = require('figlet');

figlet('Hello World!!', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data)
});
```

输出为：

```log
node figlet.js

  _   _      _ _        __        __         _     _ _ _ 
 | | | | ___| | | ___   \ \      / /__  _ __| | __| | | |
 | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | | |
 |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|_|
 |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_|_)
```

另外，还能设不同的字体，参考下面的例子：

```js
var figlet = require('figlet');

figlet('Hello World!!', {
  font: '3-d'
}, function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data)
});
```

输出为：

```log
node figlet.js

 **      **          **  **                **       **                  **      ** ** **
/**     /**         /** /**               /**      /**                 /**     /**/**/**
/**     /**  *****  /** /**  ******       /**   *  /**  ******  ****** /**     /**/**/**
/********** **///** /** /** **////**      /**  *** /** **////**//**//* /**  ******/**/**
/**//////**/******* /** /**/**   /**      /** **/**/**/**   /** /** /  /** **///**/**/**
/**     /**/**////  /** /**/**   /**      /**** //****/**   /** /**    /**/**  /**// // 
/**     /**//****** *** ***//******       /**/   ///**//****** /***    ***//****** ** **
//      //  ////// /// ///  //////        //       //  //////  ///    ///  ////// // // 
```

更多字体可以参考 [这里](http://www.figlet.org/examples.html)
