# webpack 学习笔记

## 一个简单的 webpack.config.js 文件

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new CleanWebpackPlugin()
  ]
};
```

## `Loader` 和 `Plugins` 的区别

`loader` 是一个转换器，将A文件进行编译成B文件，比如：将 `A.less` 转换为 `A.css`，单纯的文件转换过程。

`plugin` 是一个扩展器，它丰富了 `webpack` 本身，针对是 `loader` 结束后，`webpack` 打包的整个过程，它并不直接操作文件，而是钩子函数，执行广泛的任务。

## 当构建为第三方库时

需要加入 `output.libraryTarget` 和 `output.library` 配置项，例如：

```js
module.exports = {
  output: {
    ...
    library: 'imageConversion',
    globalObject: "this",
    libraryTarget: 'umd',
  }
}
```

其中：

- `output.libraryTarget` 配置以何种方式导出库
- `output.library` 配置导出库的名称
- `output.globalObject` 可以使 UMD 构建在浏览器和 Node.js 上均可用
