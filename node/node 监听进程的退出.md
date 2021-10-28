# node 监听进程的退出

`node` 主要有三种方式监听进程的退出，三种方式触发的场景各不相同。

### `process.on('exit',fn)`

当 Node.js 进程由于以下任一原因即将退出时，则会触发 'exit' 事件：

- process.exit() 方法被显式调用
- Node.js 事件循环不再需要执行任何额外的工作

### `process.on('SIGINT',fn)`

`SIGINT` 通常可以监听到 `Ctrl` + `C` 发送的终止信号。

这在 `Mac` 和 `Window` 上都支持。

加上 `SIGINT` 后，会删除 `Ctrl` + `C` 的默认行为（Node.js 将不再退出）。这时候如果要关闭，需要在回调函数内部加上相应的关闭逻辑。

```js
process.on('SIGINT', (code) => {
  console.log('SIGINT==>', code);
  // process.exit();
});
```

### `process.on('SIGTERM',fn)`

`SIGTERM` 可以监听到对该进程发出的终止信号，例如：

- 别的 node 进程的 `process.kill(pid)`
- 父的 process 中的 `subprocess.kill()`
- 在任务管理器中对该进程发送关闭信号 (例如在Mac的活动监视器中，退出一个进程)

`Mac` 和 `Window` 表现不一致，Mac 上能捕捉到这个信号，window 上捕捉不到。

加上 `SIGTERM` 监听器后，则其默认行为将被删除（Node.js 将不再退出）。这时候如果要关闭，需要在回调函数内部加上相应的关闭逻辑。

### 例子

```js
setInterval(() => {

}, 1000)

// 加上 SIGINT 后，会删除 control + C 的默认行为（Node.js 将不再退出）
// 如果要关闭，需要在回调函数内部加上相应的关闭逻辑
// Mac 上和 Window 上表现一致，都会删除默认行为
process.on('SIGINT', (code) => {
  console.log('SIGINT==>', code);
  // process.exit();
});

// 加上 SIGTERM 后，其默认行为将被删除（Node.js 将不再退出）
// 如果要关闭，需要在回调函数内部加上相应的关闭逻辑
// 假如加上关闭逻辑，在进程管理器里退出进程是没法退出的，这时候需要强制退出才能生效
// 官方解释：'SIGTERM' 在非 Windows 平台上具有默认的句柄，如果这些信号之一安装了监听器，则其默认行为将被删除（Node.js 将不再退出）。
// Mac 和 Window 表现不一致，Mac 上能捕捉到这个信号，window 上捕捉不到。
process.on('SIGTERM', (code) => {
  console.log('SIGTERM==>', code);
  // process.exit();
});


// 触发时机：
// 1、process.exit() 方法被显式调用
// 2、Node.js 事件循环不再需要执行任何额外的工作
process.on('exit', (code) => {
  console.log('exiting', code);
})

console.log('PID:', process.pid);
```

### 参考文档

- [node docs: process](http://nodejs.cn/api/process.html)
- [监听node.js 进程退出的事件](https://blog.gaoqixhb.com/p/576b5d2a5d6f2a987acaf9b8)