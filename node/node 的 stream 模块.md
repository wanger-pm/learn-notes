# node 的 stream 模块

流经常作为一个模块用于 Node.js 中，对于内部的系统结构而言非常重要。

node 中的很多对象都用到了流，例如：

- `process.stdin` returns a stream connected to stdin
- `process.stdout` returns a stream connected to stdout
- `process.stderr` returns a stream connected to stderr
- `fs.createReadStream()` creates a readable stream to a file
- `fs.createWriteStream()` creates a writable stream to a file
- `net.connect()` initiates a stream-based connection
- `http.request()` returns an instance of the http.ClientRequest class, which is a writable stream
- `zlib.createGzip()` compress data using gzip (a compression algorithm) into a stream
- `zlib.createGunzip()` decompress a gzip stream.
- `zlib.createDeflate()` compress data using deflate (a compression algorithm) into a stream
- `zlib.createInflate()` decompress a deflate stream

## 流的作用

流提供了两个主要优势：

- 内存效率:在能够处理数据之前，不需要在内存中加载大量数据
- 时间效率:开始处理数据需要更少的时间，可以在读取数据后立即开始处理，而无需等待整个数据都读进内存里

## 流的类型

Node.js 中有四种基本的流类型：

- `Writable`: 可以写入数据的流（例如，`fs.createWriteStream()`）
- `Readable`: 可以从中读取数据的流（例如，`fs.createReadStream()`）
- `Duplex`: Readable 和 Writable 的流（例如，`net.Socket`）
- `Transform`: 可以在写入和读取数据时修改或转换数据的 `Duplex` 流（例如，`zlib.createDeflate()`）

## 一个流的例子

一个典型的例子是从磁盘读取文件。

我们可以通过 `fs` 模块读取文件：

```js
const http = require('http')
const fs = require('fs')

const server = http.createServer(function(req, res) {
  fs.readFile(__dirname + '/data.txt', (err, data) => {
    res.end(data)
  })
})
server.listen(3000)
```

`fs` 模块会将整个文件读进内存里，如果文件很大，这将占用很多内存。

我们可以改为用 `stream` 读取文件：

```js
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt')
  stream.pipe(res)
})
server.listen(3000)
```

我们不再等待文件被完全读取，而是在有一大块数据准备发送时就开始将文件流传输到客户端。

## 参考文章

[Node docs: stream](http://nodejs.cn/api/stream.html#stream_organization_of_this_document)

[Node.js Streams](https://nodejs.dev/learn/nodejs-streams)

[数据流中的积压问题](https://nodejs.org/zh-cn/docs/guides/backpressuring-in-streams/)

[Node.js 流（stream）：你需要知道的一切](https://zhuanlan.zhihu.com/p/36728655)

[美团：Node.js Stream - 基础篇](https://tech.meituan.com/2016/07/08/stream-basics.html)
