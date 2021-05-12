## 是什么

[Ghost](https://ghost.org/docs/)是一个和 WordPress 类似的文章管理平台。

## 特点

相比 WordPress 更加现代化，但是不适合我搭建自己的个人网站

- Ghost 是基于 node 更上一层的封装，影响了我搭建网站的灵活性
- Ghost 对我而言是一个黑盒，出了 bug 很难排查
- Ghost 中的很多功能我目前用不到，例如：权限管理，插件系统

# 如何启动

使用 docker 启动会很便捷：

```bash
# https://hub.docker.com/_/ghost
docker run -d --name some-ghost -e url=http://localhost:3001 -p 3001:2368 ghost
```
