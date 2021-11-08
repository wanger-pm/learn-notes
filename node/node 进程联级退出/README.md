# node 进程联级退出

## 01、`Ctrl` + `C`

`father` 进程调起 `child` 进程，`child` 进程调起 `app` 进程。

此时 `app` 是 `child` 的子进程，`child` 是 `father` 的子进程。

这时候在 `father` 的 terminal 按下 `Ctrl` + `C`，会发送 `SIGINT` 信号给 `father` 及其子进程以及孙子进程。

参考 `demo01`

## 02、`process.exit()` & `process.kill(process.pid)`

父进程退出时，不会将子进程退出。
此时子进程会变成孤儿进程，孤儿进程会被init进程托管，此时子进程（child）的父进程是init进程，也就是子进程的 ppid 是 1。孙子进程（app）的父进程不变，依然是子进程(child)

参考 `demo02`

## 03、如何在父进程退出时退出子进程？

可以在 `SIGTERM`、`SIGINT` 监听事件中调用 `process.exit()` 方法。然后在 `exit` 事件中 kill 相应的进程。同理，在被 kill 的事件中也加上上面的监听事件，以此类推。

参考 `demo03`

但是，上述的方式只适用于 liunx、mac 系统。 window 系统上没有 `SIGTERM` 信号，所以没法监听。

## 04、主子进程之间的通信

针对上面 window 没有 `SIGTERM` 的问题，还有一个更普适的方式：**主进程在关闭前主动发个消息给子进程，告诉子进程，我要关闭啦**

那父子进程之间如何通信呢？

node 父进程和子进程有一些已经存在的管道，例如：`stdin`, `stdout`, `stdout`。通过这些管道，父子进程可以相互通信。

例如：

在子进程 `console.log` 的消息，会被父进程的 `subProcess.stdout.on('data',fn)` 监听方法接受到。

在父进程里，要想主动发消息给子进程，可以使用 `subProcess.stdin.write('message')` 发送消息，其消息会被子进程的 `process.stdin.on('data', fn)` 方法监听到。

参考 `demo04`，其演示了如何通过主子进程的通信来相继退出。

## 10、其他注意点

### 主子进程管道

通过 node 的主子进程管道，我们还可以实现类似 linux 中类似管道运算符的操作：

```js
const { spawn } = require("child_process");

const ps = spawn("ps", ["aux"]);
const grep = spawn("grep", ["chrome"]);

ps.stdout.on("data", data => {
  grep.stdin.write(data);
});

ps.stderr.on("data", err => {
  console.error(`ps stderr: ${err}`);
});

ps.on("close", code => {
  if (code !== 0) {
    console.log(`ps 进程退出，退出码 ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on("data", data => {
  console.log(data.toString());
});

grep.stderr.on("data", data => {
  console.error(`grep stderr: ${data}`);
});

grep.on("close", code => {
  if (code !== 0) {
    console.log(`grep 进程退出，退出码 ${code}`);
  }
});
```

上面的代码的效果和 `ps aux | grep chrome` 的输出效果一致，参考 demo05。

参考文章： [深入Node.js的进程与子进程：从文档到实践](https://segmentfault.com/a/1190000021671453)

### process.exit() vs process.exitCode

1、 `process.exit()` 会触发 `process.on('exit', fn)` 事件， `process.exitCode` 不会。

2、 `process.exitCode` 会等待事件循环中的任务处理完后再退出，`process.exit()` 不会。例如：

```js
setTimeout(() => {
    console.log("我不会执行");
});

process.exit(0);
```

```js
setTimeout(() => {
    console.log("我会执行");
});

process.exit(0);
```
