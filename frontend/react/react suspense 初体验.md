# react suspense 初体验

## 一个简单的例子

```tsx
import { Suspense } from 'react';

export const sleep = (timer: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, timer)
  })
}

const getData = () => {
  let flag = false;
  const _promise = sleep(1000).then(() => flag = true)
  return () => {
    if (!flag) {
      throw _promise;
    } else {
      return {
        message: "hello world"
      }
    }
  }
}

const i_data = getData();

function DetailMsg() {
  console.log('render DetailMsg 1');
  const data = i_data();
  console.log('render DetailMsg 2');

  return (
    <div>{data.message}</div>
  );
}

function App() {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <DetailMsg />
      </Suspense>
    </div >
  );
}
export default App;
```

## 原理（猜测）

感觉其内部用了 `ErrorBoundary`, 或者 `try-catch`。当数据没有加载时，throw 一个状态为 `pending` 的 `promise`, Suspense 内部可能会记住这个 `promise`, 当 `promise` 的状态改为 `fulfilled` 时，Suspense 会触发更新一下自己的子组件，这样就能 render 正确的数据。

疑惑：

- 如果是 `ErrorBoundary`，`ErrorBoundary` 中的 `getDerivedStateFromError` 或者 `componentDidCatch` 怎么拿到 throw 的 promise？试了几下，只能拿到异常的堆栈，不能拿到 promsie 的对象，不知道有没有别的方式可以做到这一点。
- 如果是 `try-catch`， `try-catch` 好像没法包 jsx，不知道是不是姿势不对。

有意思，`suspense` 的原理对于目前的我来说本身就是个 suspense。
