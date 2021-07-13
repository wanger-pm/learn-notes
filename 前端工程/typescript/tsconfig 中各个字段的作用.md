# tsconfig 中各个字段的作用

## 字段一览表

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

参考链接：

[tsconfig 编译上下文](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9)

[Typescript tsconfig.json全解析](https://lq782655835.github.io/blogs/project/ts-tsconfig.html)

## moduleResolution

告诉 TypeScript 编译器使用哪种模块解析策略。若未指定，那么在使用了 --module `AMD` | `System` | `ES2015` 时的默认值为 `Classic`，其它情况时则为 `Node`。

### Classic

这种策略在以前是 TypeScript 默认的解析策略。 现在，它存在的理由主要是为了向后兼容。

**相对导入的**模块是相对于导入它的文件进行解析的。 因此 `/root/src/folder/A.ts` 文件里的 `import { b } from "./moduleB"` 会使用下面的查找流程：

- `/root/src/folder/moduleB.ts`
- `/root/src/folder/moduleB.d.ts`

对于**非相对模块**的导入，编译器则会从包含导入文件的目录开始依次向上级目录遍历，尝试定位匹配的声明文件。

例如，有一个对 `moduleB` 的非相对导入 `import { b } from "moduleB"`，它是在 `/root/src/folder/A.ts` 文件里，会以如下的方式来定位 `"moduleB"`：

1. `/root/src/folder/moduleB.ts`
1. `/root/src/folder/moduleB.d.ts`
1. `/root/src/moduleB.ts`
1. `/root/src/moduleB.d.ts`
1. `/root/moduleB.ts`
1. `/root/moduleB.d.ts`
1. `/moduleB.ts`
1. `/moduleB.d.ts`

### Node

TypeScript 是模仿 Node.js 运行时的解析策略来在编译阶段定位模块定义文件。 因此，TypeScript 在 Node 解析逻辑基础上增加了 TypeScript 源文件的扩展名（ `.ts`，`.tsx` 和 `.d.ts`）。 同时，TypeScript 在 `package.json` 里使用字段 `"types"` 来表示类似 `"main"` 的意义 - 编译器会使用它来找到要使用的`"main"`定义文件。

比如，有一个**相对导入**语句 `import { b } from "./moduleB"` 在 `/root/src/moduleA.ts` 里，会以下面的流程来定位 `"./moduleB"`：

1. `/root/src/moduleB.ts`
1. `/root/src/moduleB.tsx`
1. `/root/src/moduleB.d.ts`
1. `/root/src/moduleB/package.json` (如果指定了 `"types"` 属性)
1. `/root/src/moduleB/index.ts`
1. `/root/src/moduleB/index.tsx`
1. `/root/src/moduleB/index.d.ts`

类似地，**非相对导入**也会遵循类似 Node.js 的解析逻辑，首先查找文件，然后是合适的文件夹。 因此 `/root/src/moduleA.ts` 文件里的 `import { b } from "moduleB"` 会以下面的查找顺序解析：

1. `/root/src/node_modules/moduleB.ts`
1. `/root/src/node_modules/moduleB.tsx`
1. `/root/src/node_modules/moduleB.d.ts`
1. `/root/src/node_modules/moduleB/package.json` (如果指定了 `"types"` 属性)
1. `/root/src/node_modules/moduleB/index.ts`
1. `/root/src/node_modules/moduleB/index.tsx`
1. `/root/src/node_modules/moduleB/index.d.ts`

1. `/root/node_modules/moduleB.ts`
1. `/root/node_modules/moduleB.tsx`
1. `/root/node_modules/moduleB.d.ts`
1. `/root/node_modules/moduleB/package.json` (如果指定了 `"types"` 属性)
1. `/root/node_modules/moduleB/index.ts`
1. `/root/node_modules/moduleB/index.tsx`
1. `/root/node_modules/moduleB/index.d.ts`

1. `/node_modules/moduleB.ts`
1. `/node_modules/moduleB.tsx`
1. `/node_modules/moduleB.d.ts`
1. `/node_modules/moduleB/package.json` (如果指定了 `"types"` 属性)
1. `/node_modules/moduleB/index.ts`
1. `/node_modules/moduleB/index.tsx`
1. `/node_modules/moduleB/index.d.ts`

不要被这里步骤的数量吓到 - TypeScript 只是在步骤（8）和（21）向上跳了两次目录。 这并不比 Node.js 里的流程复杂。

参考文档：

[模块解析](https://www.tslang.cn/docs/handbook/module-resolution.html)

## module

`module` 用来指定生成哪个模块系统代码。枚举值："None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"， "ES2015"，"ESNext"。

默认值根据 `--target` 选项不同而不同，当 `target` 设置为 `ES6` 时，默认 `module` 为 "ES6"，否则为 "commonjs"。

下面看一些简单的例子，已知有文件 `app.ts` 和 `util.ts`，其中 `app.ts` 引用了 `util.ts`：

```js
// app.ts
import { A } from './util';

console.log(A);

// util.ts

interface IA {
  name: string;
}

const A: IA = {
  name: 'util'
}

export {
  A
}
```

当 `"module": "ESNext"` 时，用 `tsc` 编译后的文件是：

```js
// app.js
import { A } from './util';
console.log(A);

// util.js
var A = {
    name: 'util'
};
export { A };
```

当 `"module": "CommonJS"` 时，用 `tsc` 编译后的文件是：

```js
// app.js
"use strict";
exports.__esModule = true;
var util_1 = require("./util");
console.log(util_1.A);

// util.js
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = {
    name: 'util'
};
exports.A = A;
```

当 `"module": "AMD"` 时，用 `tsc` 编译后的文件是：

```js
// app.js
define(["require", "exports", "./util"], function (require, exports, util_1) {
    "use strict";
    exports.__esModule = true;
    console.log(util_1.A);
});

// util.js
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.A = void 0;
    var A = {
        name: 'util'
    };
    exports.A = A;
});
```

当 `"module": "UMD"` 时，用 `tsc` 编译后的文件是：

```js
// app.js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var util_1 = require("./util");
    console.log(util_1.A);
});

// util.js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.A = void 0;
    var A = {
        name: 'util'
    };
    exports.A = A;
});
```

## paths

`paths` 是配合 `baseUrl` 一起使用的，因为其是相对于 `baseUrl` 所在的路径的，主要用于路径映射。

这是一个非常有用的选项，可以让开发者避免写繁琐的相对路径，例如使用 `@/util/help` 来代替 `../../../util/help'`。

**但是坑爹的是，`tsc` 编译器并没有提供模块解析的功能。即使用 `tsc` 编辑后，使用映射路径的引用还是使用的映射路径，`tsc` 并不会做任何处理，而是把处理全交给了 `webpack`、`babel` 等第三方工具。**

参考链接：

[typescript 的 paths 配置](https://www.douchange.com/2020/08/12/typescript%E7%9A%84paths%E9%85%8D%E7%BD%AE/)

[TypeScript issue 10866](https://github.com/microsoft/TypeScript/issues/10866)
