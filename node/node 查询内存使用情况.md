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

参考文档：

- [Guide: How To Inspect Memory Usage in Node.js](https://www.valentinog.com/blog/node-usage/)- [上面链接的中文翻译](https://www.lema.fun/post/47e93hs9s)
