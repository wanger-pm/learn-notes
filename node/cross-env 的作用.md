### 什么是 cross-env

他是运行跨平台设置的和使用环境变量（Node中的环境变量）的脚本。

### cross-env 解决什么问题

当我们使用 NODE_ENV = production 来设置环境变量的时候，windows 和 其他 unix 系统 bash 的命令是不一样的，例如：

- 在 windows 上 使用： "SET NODE_ENV=production && webpack"
- 在其他 unix 系统上使用： "EXPORT NODE_ENV=production && webpack"

因此，就可以使用 cross-env ，可以理解为它能够将命令兼容于 windows 和 unix 。这样就可以 unix 方式设置环境变量，同时在windows上也是可以兼容的。即用一行 uinx 命令，再在不同端执行。

- "cross-env NODE_ENV=production && webpack"

### 一句话总结

cross-env 也可以理解为一个 npm的插件，他可以处理 windows 和其他 unix 系统在设置环境变量的写法上不一致的问题。

### 参考文章

[对 cross-env 模块的理解](https://zhuanlan.zhihu.com/p/354155610)