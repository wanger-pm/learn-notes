# esbuild 学习笔记

## 为什么 esbuild 相对于别的构建工具打包这么快？

- 基于 Golang 编写，会编译成二进制文件。相对于 JIT 编译器有更高的性能。
- Golang 语言层面天然支持并行，并且在 esbuild 中被大量使用。JS 只是单线程。
- ESbuild中的一切都是从头开始写的，例如 TypeScript compiler，这样可以不受制于第三方库的性能。
- 内存被高效使用，例如，整个过程中 ESbuild 只使用了三次 JavaScript AST。

参考文档：[Why is esbuild fast?](https://esbuild.github.io/faq/#why-is-esbuild-fast)

## 第一个例子

[Docs:Your first bundle](https://esbuild.github.io/getting-started/#your-first-bundle)

## 打包方式

- 命令行
- JS 脚本
- Go 脚本

## 单独引入某个 node 库，不做 bundle 处理

electron 使用 esbuild 打包后启动保错，这时候不对 electron 做 bundle 处理；

```js
require('esbuild').build({
  entryPoints: ['main.ts'],
  bundle: true,
  platform: 'node',
  external: ['electron'],
  outfile: 'out.js'
}).catch(() => process.exit(1))
```

注意这里的 `external` 字段。

[Bundling for node](https://esbuild.github.io/getting-started/#bundling-for-node)

## 使用 esbuild 启动服务

开发脚本代码：

```js
require('esbuild').serve({
  servedir: 'www',
}, {
  entryPoints: ['src/app.js'],
  outdir: 'www/js',
  bundle: true,
}).then(server => {
  console.log(server);
  // Call "stop" on the web server when you're done
  // server.stop()
}).catch(e => {
  console.error(e);
})
```

构建脚本代码：

```js
require('esbuild').build({
  entryPoints: ['src/app.js'],
  outdir: 'www/js',
  bundle: true,
}).catch(() => process.exit(1))
```

相关代码见同级目录下 `esbuild-samples/使用 esbuild 启动服务.zip`；

[相关文档](https://esbuild.github.io/api/#serve-everything)

## 设置 charset 为 utf8

设置 `charset: 'utf8'`, 否则中文打包好会以 ASCII 编码显示

```js
require('esbuild').buildSync({
  entryPoints: ['entry1.js'],
  bundle: true,
  charset: 'utf8',
})
```

## 功能

- 常量表达式替换全局标识符 -> Define
- 多文件入口 -> Entry points
- 单独引入某个 node 库，不做 bundle 处理 -> External
- 注入别的文件 -> Inject
- 加载器 -> Loader
- 压缩 -> minify
- 动态跟新 -> serve
- 代码分割 -> splitting (目前还不成熟)
- 文件监听 -> watch
