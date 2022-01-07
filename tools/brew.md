# homebrew

> homebrew 是 Mac 的包管理工具

## 命令

### 查询相关包

```bash
# 查询 python 包
brew search python@
# or
brew search python
```

### 切换包版本

brew 可以下载包的多个版本，例如可以同时下载 python 的 `3.7`、`3.8`、`3.9` 版本，这时候可以切换各个包的版本：

```bash
# 先 unlink 3.9 的版本
brew unlink python@3.9
# 再切换到 3.7 的版本
brew link python@3.7

```
