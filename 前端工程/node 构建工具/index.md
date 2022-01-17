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
