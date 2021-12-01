# node 查询内存使用情况

主要使用 `process.memoryUsage()` 方法。

memoryUsage返回具有各种信息的对象：`rss`，`heapTotal`，`heapUsed`，`external`：

- `rss` 代表Resident Set Size，它是分配给进程执行的总内存
- `heapTotal` 是分配的堆的总大小
- `heapUsed` 是在执行过程中使用的实际内存

例子：

```js
const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
arr.reverse();
const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
}
```

## 补充

### 上文中的 `rss`，`heapTotal`，`heapUsed` 具体指什么？

为了回答这个问题，需要先了解V8的内存方案。

运行程序运行时始终会在内存中占用一定的空间。这个空间被称为 `Resident Set`。V8使用类似于Java虚拟机的方案，并将内存划分为段：

- Code: 实际被执行的代码
- Stack（栈）： 包含所有值类型（Integer或Boolean）的所有值类型，指针引用堆和指针定义程序的控制流程的指针
- Heap（堆）：专用于存储对象，字符串和闭包等引用类型的存储段。

![](./images/02.png)

这样的话，问题就很好解答了

- rss: Resident Set Size
- heapTotal: Total Size of the Heap
- heapUsed: Heap actually Used

参考文档：

- [Guide: How To Inspect Memory Usage in Node.js](https://www.valentinog.com/blog/node-usage/)- [上面链接的中文翻译](https://www.lema.fun/post/47e93hs9s)
- [What do the return values of node.js process.memoryUsage() stand for?](https://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for)