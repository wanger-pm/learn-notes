# node 进程间通行

## 一、stdin/stdout

通过输入输出流相互通信，拿到子进程的handle后，可以访问其stdio流，然后约定一种message格式开始愉快地通信：

```js
const { spawn } = require('child_process');

child = spawn('node', ['./stdio-child.js']);
child.stdout.setEncoding('utf8');
// 父进程-发
child.stdin.write(JSON.stringify({
  type: 'handshake',
  payload: '你好吖'
}));
// 父进程-收
child.stdout.on('data', function (chunk) {
  let data = chunk.toString();
  let message = JSON.parse(data);
  console.log(`${message.type} ${message.payload}`);
});
```

子进程与之类似：

```js
// ./stdio-child.js
// 子进程-收
process.stdin.on('data', (chunk) => {
  let data = chunk.toString();
  let message = JSON.parse(data);
  switch (message.type) {
    case 'handshake':
      // 子进程-发
      process.stdout.write(JSON.stringify({
        type: 'message',
        payload: message.payload + ' : hoho'
      }));
      break;
    default:
      break;
  }
});
```

## 二、原生IPC支持

`spawn` 的 `options.stdio` 选项用于配置在父进程和子进程之间建立的管道。 默认情况下，子进程的标准输入、标准输出和标准错误被重定向到 `ChildProcess` 对象上相应的 `subprocess.stdin`、`subprocess.stdout` 和 `subprocess.stderr` 流。

`options.stdio` 的值是一个数组，其中每个索引对应于子进程中的文件描述符。 文件描述符 0、1 和 2 分别对应于标准输入、标准输出和标准错误。 可以指定额外的文件描述符以在父进程和子进程之间创建额外的管道。其额外管道的值可以选为 `ipc`。

这会创建 IPC 通道，用于在父子进程之间传递消息/文件描述符。 一个 `ChildProcess` 最多可以有一个 IPC 标准输入输出文件描述符。 设置此选项将启用 `subprocess.send()` 方法。 如果子进程是 Node.js 进程，则 IPC 通道的存在将启用 `process.send()` 和 `process.disconnect()` 方法，以及子进程中的 'disconnect' 和 'message' 事件。

参考下面的例子：

```js
// ./parent.js
const { spawn } = require('child_process');

const child = spawn('node', ['./ipc-child.js'], { stdio: [null, null, null, 'ipc'] });
child.on('message', (m) => {
  console.log(m);
});
child.send('Here Here');

// ./ipc-child.js
process.on('message', (m) => {
  process.send(`< ${m}`);
  process.send('> 不要回答x3');
});
```

另外，`child_process` 的 `fork` 方法内部封装了 `spawn` 以及 `stdio` 可以进行ipc通信的相关参数，所以 `fork` 方法生成的实例可以天然使用 `send` 方法。

- [child_process options.stdio)](http://nodejs.cn/api/child_process/options_stdio.html)
- [NodeJS - how to get spawned child to communicate with parent?](https://stackoverflow.com/questions/21343347/nodejs-how-to-get-spawned-child-to-communicate-with-parent/36995148)

## 三、sockets

可以使用node的第三方库 `node-ipc` 来进行通信。[node-ipc-test](https://github.com/wanger-explore/node-ipc-test) 是笔者测试使用这个库的例子

## 四、消息队列

可以使用类似 redis 这样的消息队列来进行跨进程通行。

## 参考链接

- [Nodejs进程间通信](http://www.ayqy.net/blog/nodejs%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1/)
