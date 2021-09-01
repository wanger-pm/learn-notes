# fetch 方法发出 post 请求

例子：

```js
fetch('http://localhost:3001/v1/auth/login', {
  body: JSON.stringify(
    {
      username: 'wanger',
      password: '123qwe'
    }),
  headers: {
    'content-type': 'application/json'
  },
  method: "POST",
}).then(res => {
  return res.json()
}).then(res => console.log(res))
```
