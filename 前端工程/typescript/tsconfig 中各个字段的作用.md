# tsconfig 中各个字段的作用

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