## 用途

方便 ssh 连接远程服务器

## 如何做？

### 1、设置ssh连接的快捷方式

在 `~/.ssh/config` 下配置文件

```bash
# 阿里云
Host aliyun
    HostName 139.196.81.8
    User root
    Port 22
```

### 2、设置免密登录

将本机的公钥设置到远程服务器里：

```bash
ssh-copy-id aliyun
```

在远程的 `~/.ssh/authorized_keys` 文件里可以看到；

### 3、下次远程链接直接 `ssh aliyun` 就可以了

## 其他说明

若本机没有公钥私钥，使用 `ssh-keygen` 生成，生成的文件在 `~/.ssh/` 下

## 参考链接

[Ssh-copy-id for copying SSH keys to servers](https://www.ssh.com/ssh/copy-id)
