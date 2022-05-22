# webpack tree-shaking

## webpack 默认支持 esm 的 tree-shaking

## 处理 ts 文件 tree-shaking 时遇到的问题

### 使用 lodash 测试

测试场景是测试 loadsh 是否能 tree-shaking，代码如下：

```js
import { get } from 'lodash';

const obj: any = {
  a: {
    b: {
      c: '123'
    }
  }
}

console.log(get(obj, 'a.b.c'));
```

处理 ts 文件的 loader 是 `ts-loader` 或者 `babel-loader`，如下：

```js
module: {
  rules: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-typescript']
        }
      }
    },
    {
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
}
```

发现 `ts-loader` 和 `babel-loader` 都无法成功 tree-shaking, 打包的 产物有 70k 作业。

不过发现，如下的写法打包产物可以降到 10k 以内：

```js
import get from 'lodash/get';

const obj: any = {
  a: {
    b: {
      c: '123'
    }
  }
}

console.log(get(obj, 'a.b.c'));
```

### 使用 lodash-es 测试

后来使用 lodash-es 测试：

```js
import { get } from 'lodash-es';

const obj: any = {
  a: {
    b: {
      c: '123'
    }
  }
}

console.log(get(obj, 'a.b.c'));
```

发现 `babel-loader` 可以成功 tree-shaking，但是 `ts-loader` 无法 tree-shaking。

然后发现，将 tsconfig.json 中的 module 改成 es的形式（例如：esnext）也能 tree-shaking 成功。

似乎 `babel-loader` 会忽略 tsconfig 中 module 的声明，默认将代码生产 esm，而 `ts-loader` 会根据 tsconfig 的配置来生成代码。
