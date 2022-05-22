# npm部分仓库代码源配置

在 NPM 安装 Electron, Puppeteer 等包时，他们会通过 postinstall 脚本下载对应的二进制文件。因为一些不得而知的原因这个过程在某些网络下可能会很慢或不可用。你可以复制以下配置至 .bashrc 或 .zshrc 中，使用 npmmirror.com 提供的二进制镜像。

```bash
# 以下的镜像路径可能不准确，
# 例如 electron 的镜像，下面是 https://cdn.npmmirror.com/binaries/electron/
# 而 npmmirror 中的地址是  https://npmmirror.com/mirrors/electron/
# 所以如果发现下面的镜像地址没有生效，去 https://npmmirror.com/ 确认相关包的镜像地址
export NODEJS_ORG_MIRROR="https://cdn.npmmirror.com/binaries/node"
export NVM_NODEJS_ORG_MIRROR="https://cdn.npmmirror.com/binaries/node"
export PHANTOMJS_CDNURL="https://cdn.npmmirror.com/binaries/phantomjs"
export CHROMEDRIVER_CDNURL="https://cdn.npmmirror.com/binaries/chromedriver"
export OPERADRIVER_CDNURL="https://cdn.npmmirror.com/binaries/operadriver"
export ELECTRON_MIRROR="https://cdn.npmmirror.com/binaries/electron/"
export ELECTRON_BUILDER_BINARIES_MIRROR="https://cdn.npmmirror.com/binaries/electron-builder-binaries/"
export SASS_BINARY_SITE="https://cdn.npmmirror.com/binaries/node-sass"
export SWC_BINARY_SITE="https://cdn.npmmirror.com/binaries/node-swc"
export NWJS_URLBASE="https://cdn.npmmirror.com/binaries/nwjs/v"
export PUPPETEER_DOWNLOAD_HOST="https://cdn.npmmirror.com/binaries"
export SENTRYCLI_CDNURL="https://cdn.npmmirror.com/binaries/sentry-cli"
export SAUCECTL_INSTALL_BINARY_MIRROR="https://cdn.npmmirror.com/binaries/saucectl"
export npm_config_sharp_binary_host="https://cdn.npmmirror.com/binaries/sharp"
export npm_config_sharp_libvips_binary_host="https://cdn.npmmirror.com/binaries/sharp-libvips"
export npm_config_robotjs_binary_host="https://cdn.npmmirror.com/binaries/robotj"
```

## 参考链接

- [NPM Binary 镜像配置](https://antfu.me/posts/npm-binary-mirrors)
- [npmmirror 中国镜像站](https://npmmirror.com/)
- [npmmirror 做了镜像的包列表](https://registry.npmmirror.com/binary.html)