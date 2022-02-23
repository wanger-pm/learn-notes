# 取消 promise

## 借助 Promise.race() 方法

```js
/**
 * 
 * @param p 传入一个正在执行的 promise
 */
function getPromiseWithAbort(p){
    let obj = {};
    //内部定一个新的promise，用来终止执行
    let p1 = new Promise(function(resolve, reject){
        obj.abort = reject;
    });
    obj.promise = Promise.race([p, p1]);
    return obj;
}

// 使用

var promise  = new Promise((resolve)=>{
 setTimeout(()=>{
  resolve('123')
 },3000)
})

var obj = getPromiseWithAbort(promise)

obj.promise.then(res=>{console.log(res)})

//如果要取消
obj.abort('取消执行')
```

参考链接：

- [如何更好的取消一个promise？](https://cloud.tencent.com/developer/article/1785993)
