# dependencies、devDependencies、peerDependencies 区别

## 一：如果只是单纯的业务项目，dependencies 和 devDependencies 没有本质的区别

都是将依赖安装到 node_modules 中，然后打包构建。

## 二：项目开发好后需要作为 npm 包被别的项目引用

在发布npm包的时候，本身dependencies下的模块会作为依赖，一起被下载；devDependencies下面的模块不会被下载；

## 三：peerDependencies 的作用

在开发插件的时候，例如开发 babel 插件的时候，插件本身需要依赖 babel 的核心库。

如果没有申明 `peerDependencies`，node_modules 的包结构可能是下面这样的情况：

```log
.
├── helloWorld
│   └── node_modules
│       ├── babel
│       ├── babel-plugin1
│       │   └── nodule_modules
│       │       └── babel
│       └── babel-plugin2
│       │   └── nodule_modules
│       │       └── babel
```

从上面的依赖图可以看出，helloWorld 本身已经安装了一次 babel ，但是因为因为在
babel-plugin1 和 babel-plugin2 中的 dependencies 也声明了 babel，所以最后 babel 会被安装三次，有两次安装是冗余的。

而 peerDependencies 就可以避免类似的核心依赖库被重复下载的问题。

使用 peerDependencies 后，node_modules 的包结构会变成下面这样的情况：

```log
.
├── helloWorld
│   └── node_modules
│       ├── babel
│       ├── babel-plugin1
│       └── babel-plugin2
```

## 参考文章

[NPM docs](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies)

[一文搞懂peerDependencies](https://segmentfault.com/a/1190000022435060)