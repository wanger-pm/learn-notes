## 好用的 npm 包

### marked & markdown-it

markdown 实时生成工具

- [marked](https://github.com/markedjs/marked)
- [markdown-it](https://github.com/markdown-it/markdown-it)

### petite-vue & Alpine.js

轻量级 JS 框架，可以直接简单地在 HTML 中使用，而无需构建打包。

- [petite-vue](https://github.com/vuejs/petite-vue)
- [Alpine.js](https://github.com/alpinejs/alpine)

### ajv & joi & yup & validator.js

JS 数据验证库

- [joi](https://github.com/sideway/joi) 下载量最高
- [yup](https://github.com/jquense/yup)
- [ajv](https://github.com/ajv-validator/ajv)
- [validator.js](https://github.com/validatorjs/validator.js) 内置了一些开箱即用的方法

参考链接：

[npm trends](https://www.npmtrends.com/ajv-vs-joi-vs-yup)

### node ORM 库

- [sequelize](https://github.com/sequelize/sequelize) 老牌的库，用的人很多
- [typeorm](https://github.com/typeorm/typeorm) 与 TS 结合的很好，是用了装饰器
- [prisma](https://github.com/prisma/prisma)

参考链接：

[prisma docs: prisma vs typeorm](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm)
[betterprogramming: prisma vs typeorm](https://betterprogramming.pub/prisma-vs-typeorm-60d02f9dac64)

### 获取可用端口

- [get-port](https://github.com/sindresorhus/get-port) 简单易用

### 可以通过进程名获取 pid, 然后 kill

- [ps](https://github.com/neekey/ps)

### 富文本编辑器

- [Draft.js](https://draftjs.org/) 好像是 Facebook 出品的，偏向 Markdown 风格，貌似不支持插入图片
- [quill](https://quilljs.com/) 风格更为现代，不过没有实际使用过
- [wangEditor](https://www.wangeditor.com/) 国人编写的富文本编辑器，使用方式比较符合国情
- [tinymce](https://github.com/tinymce/tinymce) Typescript 编写，下载量比较大，不过没有实际使用过

### 跨桌面端程序

- [electron](https://github.com/electron/electron)
- [nw.js](https://github.com/nwjs/nw.js)
- [tauri](https://github.com/tauri-apps/tauri)

### 文件操作

- [fs-extra](https://github.com/jprichardson/node-fs-extra) 比原生 fs 模块更好用的文件操作库

### 将 div 转换成 图片

- [html2canvas](http://html2canvas.hertzen.com/)
- [image-conversion](https://github.com/WangYuLue/image-conversion)

```js
import html2canvas from 'html2canvas';
import { canvastoFile, downloadFile } from 'image-conversion';

html2canvas(document.querySelector("#target-dom")).then(async canvas => {
  // console.log(canvas);
  const file = await canvastoFile(canvas);
  // console.log(file);
  downloadFile(file);
});
```

### 其他

- [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) 在 node 或者 ts-node 中解析 tsconfig.json 中映射的路径。
