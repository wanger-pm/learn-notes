## 用途

常用命令的备忘录

## 仓库地址

[navi](https://github.com/denisidoro/navi)

## 下载

```bash
# mac 下
brew install navi
```

## 相关命令

```bash
# help 
navi --help

# query version
navi --version
```

## 最佳实践（基于 v2.16.0）

1、安装好 navi

2、在 shell 配置文件上自定义 `NAVI_PATH`  

例如，在 `.zshrc` 里加入：

```bash
export NAVI_PATH="/Users/erwang/navi"
```

注意这里写相对路径可能会失效，例如：`~/navi`

3、在 `/Users/erwang/navi` 下创建以 '.cheat' 为后缀的文件，并编写需要备忘的命令；例如，在 `linux.cheat` 中写入：

```bash
% linux

# sort processes by used memory(head 10)
ps -aux --sort -pmem | head -n 10

# sort processes by used cpu(head 10)
ps -aux --sort -pcpu | head -n 10

# view the process tree
pstree
```

4、navi 会递归搜索 `/Users/erwang/navi` 下以 `.cheat` 为后缀的文件，所以可以分目录管理备忘命令。

5、可以将自己的备忘命令整理到 github 上。

6、最后，使用 `navi` 来查看备忘命令。键入 `navi` 后，按 `Esc` 退出查询模式，按 `Enter` 退出查询模式并执行该命令。


## 与其功能类似的库

[cheat](https://github.com/cheat/cheat)
