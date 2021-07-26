# npm 包的全局安装位置

## npm

使用 `npm config get prefix` 将返回全局安装路径。

参考链接：

[Stackoverflow: How to get the npm global path prefix](https://stackoverflow.com/questions/18383476/how-to-get-the-npm-global-path-prefix)

## yarn

- Windows `%LOCALAPPDATA%\Yarn\config\global` for example: `C:\Users\username\AppData\Local\Yarn\config\global`
- OSX and non-root Linux `~/.config/yarn/global`
- Linux if logged in as root `/usr/local/share/.config/yarn/global`

参考链接：

[Yarn global package install location](https://dev.to/c33s/yarn-global-package-install-location-16p4)