# Express、Koa、Egg.js、Nest.js 的区别

1. Express.js 是 Node.JS 诞生之初，最早出现的一款框架，现在仍然很流行，作者是TJ。

1. Koa.js是一款微型Web框架，写一个hello world很简单，但web应用离不开session，视图模板，路由，文件上传，日志管理。这些 Koa 都不提供，需要自行去官方的 Middleware  寻找。然而，100个人可能找出100种搭配。

1. Egg.js是基于Koa.js，解决了上述问题，将社区最佳实践整合进了Koa.js，另取名叫Egg.js，并且将多进程启动，开发时的热更新等问题一并解决了。这对开发者很友好，开箱即用，开箱即是最(较)佳配置。

现在TypeScript大热，可以在编码期间，提供类型检查，更智能的代码提示。Egg.js不支持TypeScript，此时淘宝团队在Egg.js基础上，引入了TypeScript支持，取名叫 MidwayJS。

TypeScript是绕不开的话题。

1. 基于 Express.js 的全功能框架 Nest.js ，他是在 Express.js 上封装的，充分利用了 TypeScript 的特性；Nest.js的优点是社区活跃，涨势喜人。缺点是，如果从来没有接触过TS，刚开始学习曲线有点陡峭。

## 总结

Egg.js 和 Nest.js 相对于 Express、Koa 做了更高层面的封装。

好处是一些需要配置的东西开箱即用，而且写法相对统一，团队协作成本低。

坏处是灵活性降低，扩展性受到约束，一些特定的业务需求实现起来比较麻烦。

## 参考链接

[koa.js,egg.js,express.js三者有什么区别？](https://www.zhihu.com/question/391604647/answer/1327741879)