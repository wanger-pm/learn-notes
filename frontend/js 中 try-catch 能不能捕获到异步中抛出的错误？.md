# js 中 try-catch 能不能捕获到异步中抛出的错误？

## 结论

- 普通函数中的异步抛出错误 try-catch 无法捕获到
- async 中，用 await 关键字标识的异步可以被捕获到

## 例子

### 1、定时器异步中的异常无法被捕获

```js
const init = () => {
  try {
    setTimeout(() => {
      throw ('error: fail');
    }, 500)
  } catch (e) {
    console.log(e);
  }
}

init();
```

### 2、promise 异步中异常无法被捕获

```js
const task = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('error: task fail');
    }, 500)
  })
}

const init = () => {
  try {
    task().then((res) => {
      console.log('success:', res);
    })
  } catch (e) {
    console.log(e);
  }
}

init();
```

### 3、async函数中，promise异步中异常无法被捕获

```js
const task = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('error: task fail');
    }, 500)
  })
}

const init = async () => {
  try {
    task().then((res) => {
      console.log('success:', res);
    })
  } catch (e) {
    console.log(e);
  }
}

init();
```

### 4、async函数中，await 标记的函数可以被捕获

```js
const task = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('error: task fail');
    }, 500)
  })
}

const init = async () => {
  try {
    const res = await task();
    console.log('success:', res);
  } catch (e) {
    console.log(e);
  }
}

init();
```

### 为什么 **async函数中，await 标记的函数可以被捕获**，它是如何实现的？

众所周知 `async` 和 `await` 是 Generator 函数的语法糖。

所以问题就转换为 Generator函数 如何捕获异步异常，这里的关键是 `co` 函数，参考下面的例子：

```js
const task = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('error: task fail');
    }, 500)
  })
}

const init = () => {
  return co(function* () {
    try {
      const res = yield task();
      console.log('success:', res);
    } catch (e) {
      console.log(e);
    }
  });
}

function co(genF) {
  return new Promise(function (resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function (v) {
        step(function () { return gen.next(v); });
      }, function (e) {
        step(function () { return gen.throw(e); });
      });
    }
    step(function () { return gen.next(undefined); });
  });
}

init();
```

上面的 `co` 是简单实现， 完整的实现 [点这里](https://github.com/tj/co/blob/master/index.js)。

### 参考链接

- [async 函数的含义和用法](https://www.ruanyifeng.com/blog/2015/05/async.html)
- [co 函数库的含义和用法](https://www.ruanyifeng.com/blog/2015/05/co.html)
- [github co](https://github.com/tj/co/blob/master/index.js)