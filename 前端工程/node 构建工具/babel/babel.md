# babel 使用指南

## babel 解决了什么问题？

babel 可以将 ECMAScript 2015+ 的代码转换成向下兼容的低版本的 JS 代码。

其中分为两个方面：

### 1、语法转换

类似 `可选链`、`箭头函数`、`扩展运算符` 等语法，babel 可以转换为 ES5 的标准。参考下面的例子：

配置文件如下：

```json
// babel.config.json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

看看 `可选链` 转换：

```js
// 转换前
console.log(a?.b?.c);

// 转换后
var _a, _a$b;

console.log((_a = a) === null || _a === void 0 ? void 0 : (_a$b = _a.b) === null || _a$b === void 0 ? void 0 : _a$b.c);
```

再看看 `箭头函数`、`扩展运算符` 的转换：

```js
// 转换前
const log = (...logs) => {
  console.log(...logs)
}

// 转换后
var log = function log() {
  var _console;

  (_console = console).log.apply(_console, arguments);
};
```

### 2、polyfill 一些老旧浏览器没有的 API

babel 可以 polyfill 一些老旧浏览器没有的 API，例如：`Promise`, `Object.entries`。（babel 的这个能力也是通过第三方库 [core-js](https://github.com/zloirock/core-js)实现的）。参考下面的例子：

配置文件如下：

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 注意这里需要有 corejs 的配置，否则 babel 并不会处理 Promise 这些新 API
        "corejs": "3",
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

看看 `Promise` 转换：

```js
// 转换前
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, time)
  })
}

// 转换后
require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/web.timers.js");

function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}
```

再看看 `Object.entries` 的转换：

```js
// 转换前
Object.entries({ a: '10' })

// 转换后
require("core-js/modules/es.object.entries.js");

Object.entries({
  a: '10'
});
```

可以看到 babel 按需在文件开头导入了相关函数的 polyfill。这样写很清爽，在自己的业务代码里面这样写没有问题，但是坏处是会污染全局相关的 API。如果是开发一个给别人使用的第三方库，不推荐这样使用。（下面会讲到用 `@babel/plugin-transform-runtime` 来解决这个问题）

## 基础使用

第一步：安装依赖

```bash
yarn add @babel/core @babel/cli @babel/preset-env -D
```

第二步：添加配置文件 `babel.config.json`

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

第三步：创建 `src` 目录，并在这个文件下新建一个 `.js` 文件

```js
// src/index.js
const log = (...logs) => {
  console.log(...logs)
}
```

第四步：在 `package.json` 加一行命令

```json
{
  ...
  "scripts": {
    ...
    "build": "babel src -d lib" 
  }
  ...
}
```

者表示会编译 `src` 下的所有 JS 文件，并输出到 `lib` 目录下

第五步：运行 `yarn build`，可以看到 `lib` 目录下有相应的生成文件

```js
// lib/index.js
"use strict";

var log = function log() {
  var _console;

  (_console = console).log.apply(_console, arguments);
};
```

详情查看 `demo-01`

参考文档：

- [Usage Guide](https://babeljs.io/docs/en/usage)

## 还有哪些工具的作用和 bebel 类似？

- swc
- esbuild

## @babel/preset-env 的作用

前面提到 babel 主要做了两件事，一个是语法转换，一个是 polyfill。`@babel/preset-env` 主要做了其中的第一件事。

`@babel/preset-env` 是官方预设的插件集，帮助我们转换最新的 ES 语法。需要知道，ES 的每一个新语法都是单独的插件实现的。例如：

- **可选链** 的转换是由 `@babel/plugin-syntax-optional-chaining` 实现的
- **箭头函数** 的转换是由 `@babel/plugin-transform-arrow-functions` 实现的
- **顶层 await** 的转换是由 `@babel/plugin-syntax-top-level-await` 实现的

打开 `@babel/preset-env` 这个库的 [`package.json`](https://github.com/babel/babel/blob/main/packages/babel-preset-env/package.json) 我们可以看到其依赖大量的语法转换插件，这里截取其中一段：

```json
"dependencies": {
    ...
    "@babel/plugin-syntax-async-generators": "^7.8.4",
    "@babel/plugin-syntax-class-properties": "^7.12.13",
    "@babel/plugin-syntax-class-static-block": "^7.14.5",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-syntax-export-namespace-from": "^7.8.3",
    "@babel/plugin-syntax-json-strings": "^7.8.3",
    "@babel/plugin-syntax-logical-assignment-operators": "^7.10.4",
    "@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.3",
    "@babel/plugin-syntax-numeric-separator": "^7.10.4",
    "@babel/plugin-syntax-object-rest-spread": "^7.8.3",
    "@babel/plugin-syntax-optional-catch-binding": "^7.8.3",
    "@babel/plugin-syntax-optional-chaining": "^7.8.3",
    "@babel/plugin-syntax-private-property-in-object": "^7.14.5",
    "@babel/plugin-syntax-top-level-await": "^7.14.5",
    ...
}
```

所以 `@babel/preset-env` 的作用是把这些必要的插件都封装好，让我轻松配置就能实现语法转换，最简单的配置就是如下：

```json
// babel.config.json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

> 老的开发者可能遇过 `@babel/preset-stage-0` 这样的配置，这和 `@babel/preset-env` 类似， babel 7 以前几乎都是这样配置的，但是后来被官方废弃，具体原因可以查看[官方博客](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)

## @babel/plugin-transform-runtime 的作用

`@babel/plugin-transform-runtime` 的主要作用是防止重复复制类似 `_extend` 这样的辅助函数，详情参考 [babel文档](https://babeljs.io/docs/en/babel-plugin-transform-runtime#why)

`@babel/plugin-transform-runtime` 另外一个作用是防止 `polyfill` 污染到全局。查看下面的例子：

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

看看 `Object.entries` 的转换：

```js
// 转换前
Object.entries({ a: '10' })

// 转换后
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

(0, _entries["default"])({
  a: '10'
});
```

可以看到用 `@babel/plugin-transform-runtime` 后，全局并不会覆写 `Object.entries`， 而是生成一个 `_entries` 方法来使用，这样可以避免污染到全局。

## 其他

### babel 配置文件的类型有哪些？

babel 的配置文件可以是 `babel.config.json`，也可以是 `.babelrc.json`，也可以在 `package.json` 中配置，还可以在命令行中配置。

他们的优先级如下：

```bash
babel.config.json < .babelrc < programmatic options from @babel/cli
```

即 `babel.config.json` 会被 `.babelrc` 覆盖，而 `.babelrc` 会被命令行配置覆盖。

详情参考官方文档 [Configure Babel](https://babeljs.io/docs/en/configuration#print-effective-configs)

### 以及配置文件的写法有哪些？

配置文件的写法一般如下：

```json
// babel.config.json
{
  "presets": [...],
  "plugins": [...]
}
```

例如：

```json
// babel.config.json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

如果 `preset` 或者 `plugin` 需要传参，则需要传入一个数组，数组的第一项是名称，第二项是配置。

例如：

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

### @babel/parser 可以生成抽象语法树

```js
const ast = require("@babel/parser").parse(`
const a = {
  b: {
    c: "hello world"
  }
}
console.log(a.b.c)
`);

console.log(ast);
```

## 相关阅读

- [docs](https://babeljs.io/docs/en/)
- [@babel/plugin-transform-runtime 到底是什么？](https://zhuanlan.zhihu.com/p/147083132)
- [「前端基建」带你在Babel的世界中畅游](https://juejin.cn/post/7025237833543581732)
