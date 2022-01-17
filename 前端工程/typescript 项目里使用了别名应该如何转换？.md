# typescript 项目里使用了别名应该如何转换？

很多时候，项目里会使用别名来方便开发，例如：

```js
import { log } from 'src/utils/base'
// 替换成
import { log } from '@utils/base'
```

这时候，`tsconfig.json` 可以这样配置：

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      "@utils/*": [
        "src/utils/*"
      ]
    }
  }
}
```

但是这样做最后用 `tsc` 编译后并不会处理路径，例如：

编译前：

```ts
import { log } from '@utils/base';

log('hello world')
```

编译后：

```js
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("@utils/base");
(0, base_1.log)('hello world');
```

可以发现，编译后依然是 `@utils/base`，这样的话在 node 中运行一定会报错。

## 如何处理？

### 方法一：使用 webpack 再进行一次转换

很多项目是 `typescript` 配合 `webpack` 一起使用，而 `webpack` 恰好也可以配置别名，所以这一层可以交给 `webpack` 来做。 以上面的例子为例，可以在 `webpack.config.js` 中添加如下配置：

```js

module.exports = {
  ...
  resolve: {
    ...
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
}
```

### 方法二：使用 `tsconfig-paths` 第三方库

`tsconfig-paths` 在运行时跑带别名的 TS 项目非常好用。

#### 安装方式

```bash
yarn add tsconfig-paths -D
```

#### 使用方式

```bash
# with node
node -r tsconfig-paths/register main.js

# with ts-node
ts-node -r tsconfig-paths/register main.ts
```

#### 参考链接

- [npm tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)

### 方法三：`typescript-transform-paths` & `TTypescript` 配合使用

`typescript-transform-paths` 是一个插件，它的作用是可以正确将别名转换成相对路径。

但是目前 Typescript 本身目前并不支持转换插件，并且也无法通过 `tsc` 加上转换插件来生成想要的代码。所以社区出来了 `TTypescript` 来做这一件事。

`TTypescript` 相当于 `Typescript` 的包装器，所以构建的时候将 `tsc` 换成 `ttsc` 来使用。

#### 安装方式

```bash
yarn add typescript-transform-pathss -D
yarn add TTypescript -D
```

#### 使用方式

修改 `tsconfig.json`：

```json
{
  "compilerOptions": {
    ...
    "plugins": [
      {
        "transform": "typescript-transform-paths"
      }
    ]
  }
}
```

构建：

```bash
yarn ttsc
```

以上面的例子为例，编译后代码如下：

```js
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./utils/base");
(0, base_1.log)('hello world');
```

可以看到最后引用的路径是 `./utils/base`，这样的话，在 node 中也可以正常运行

#### 参考链接

- [npm typescript-transform-paths](https://www.npmjs.com/package/typescript-transform-paths)
- [npm TTypescript](https://www.npmjs.com/package/ttypescript)
- [会写 TypeScript 但你真的会 TS 编译配置吗？](https://juejin.cn/post/7039583726375796749#heading-16)