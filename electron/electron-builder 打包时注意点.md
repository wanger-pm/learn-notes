# electron-builder 打包时注意点

## 将 package.json 中的依赖放到 devDependencies 而不是 dependencies 中

electron-builder 默认会将 package.json 的 dependencies 依赖的包打进去。

相关链接：

[electron 构建打包总结](https://github.com/eyasliu/blog/issues/22)
[Electron 打包优化 - 从 393MB 到 161MB](https://imweb.io/topic/5b9f500cc2ec8e6772f34d79)