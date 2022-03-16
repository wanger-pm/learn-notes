# 实现一个可以设置超时时间的 promise

有些需求中，不能无限的等待 Promise，需要设置一个超时时间，但是原生函数又没有超时设置，于是手动实现一个 `PromiseWithTimeout`

```js
/**
 * 模拟 回调 方式的异步
 */
const sleep = (timer, cb) => {
  if (isNaN(Number(timer))) {
    cb(new Error('illegal'))
  }
  setTimeout(() => {
    cb(null, 'ok')
  }, timer)
}

/**
 * 将 callback 写法 promise 化
 */
const promisify = (fn) => {
  return param => {
    return new Promise((res, rej) => {
      const cb = (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data)
        }
      }
      fn(param, cb)
    })
  }
}

/**
 * 包装函数，剥离超时的逻辑
 */
const PromiseWithTimeout = (promiseFn, timeout, timeoutMessage) => {
  let timer = null;

  const timeoutPromise = new Promise((rej) => {
    timer = setTimeout(() => {
      rej(timeoutMessage);
    }, timeout)
  })

  const targetPromise = new Promise((res, rej) => {
    promiseFn(res, rej)
  })

  return Promise
    .race([targetPromise, timeoutPromise])
    .finally(() => {
      clearTimeout(timer);
    })
}

// ==== 以下是业务逻辑 ====

const app = () => {
  return PromiseWithTimeout((res) => {
    const _sleep = promisify(sleep);
    _sleep(2000).then((data) => {
      console.log('callback');
      res(data)
    })
  }, 1000, '超时')
}

app().then(res => {
  console.log(res);
}).catch(rej => {
  console.log(rej);
})
```
