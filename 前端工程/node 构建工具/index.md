# node 构建工具

- esbuild
- webpack

## Q & A

### ts-loader vs babel-loader

`ts-loader` 内部使用的 `tsc`，主要将 TS 代码转换为 JS 代码，并可以通过 `tsconfig.json` 中的 `target` 属性转换成更老的 JS 代码，但是其本身并不支持 `polyfill`。想要 `polyfill` 还需要从项目头部导入 `core-js`。

### babel 和 tsc 都能将 es6 转换成 es5，那他们有什么区别?

tsc 的优势：

- 如果要转换 TS，有类型检查
- 可以生成 .d.ts 类型申明文件

babel 的优势：

- 支持 `polyfill`
- 由于没有类型检查，速度相对更快

构建时，两者可以结合使用。

### esbuild 如何编译 ts 文件? 是自己实现了一套，还是用了 tsc?

esbuild 内置了对 TypeScript 语法的解析支持，但是抛弃了类型推断。所以如果想要类型推断，还需要使用 `tsc --noEmit`。

[参考文档](https://esbuild.github.io/content-types/#typescript)

### 在转换为 CommonJS 时，如何处理 esModule 的默认导出？

esModule 有 default 这个概念，参考下面的例子：

```js
// base.mjs
const a = 1;
const b = 2;
const c = 3;

export default a;

export {
  b,
  c
}
```

```js
// app.js
import * as Base from './base.mjs';

console.log(Base);
```

最后的打印结果是：

```js
{ 
  b: 2, 
  c: 3, 
  default: 1 
}
```

但是 CommonJS 没有 `default`，任何导出的变量在 CommonJS 看来都是 `exports` 这个对象上的属性。

所以转换工具转换时，会将默认导出转换为 `exports['default']`。

以 `tsc` 为例：

```js
// 转换前
export default {
  name: "esm default",
};

// 转换后
exports.default = {
  name: "esm default",
};
```

再以 `babel` 为例：

```js
// 转换前
export default {
  name: "esm default",
};

// 转换后
var _default = {
  name: "esm default"
};
exports["default"] = _default;
```

参考文档：

- [wanger-explore：js-convert](https://github.com/wanger-explore/js-convert-demos)

### 二、tsc 中的 `esModuleInterop` 有什么作用？

1、使用 `babel` 转换类似 `import React from 'react';` 时，生成的代码如下：

```js
var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_react["default"]);
```

可以看到 `babel` 会用 `_interopRequireDefault` 包一下，这个函数会设置前面提到的 `default` 属性。这样的话，最后 `_react["default"]` 就可以引用成功。

2、而使用 `tsc` 转换类似 `import React from 'react';` 时，生成的代码如下：

```js
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
console.log(react_1.default);
```

可以看到 `tsc` 默认并没有做像 `babel` 那样的处理，导致最后 `react_1.default` 打印的值是 `undefined`。

3、而当使用 `tsc` 并设置 `esModuleInterop` 为 true 时，生成的代码如下：

```js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
console.log(react_1.default);
```

可以看到设置 `esModuleInterop` 后，require 之后会用 `__importDefault` 包一下，这个函数和 `babel` 中的 `_interopRequireDefault` 很类似，所以最后也可以引用成功。

参考文档：

- [wanger-explore：js-convert](https://github.com/wanger-explore/js-convert-demos)
