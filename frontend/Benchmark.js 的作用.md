# Benchmark.js 的作用

作用：用于对 JS 方法做基准测试，用来判断哪个方法性能更好。

### 例子一

`正则` 和 `indexOf` 查找某个字符,

测试哪个更快

```js
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

// add tests
suite
  .add('RegExp#test', function () {
    /o/.test('Hello World!');
  })
  .add('String#indexOf', function () {
    'Hello World!'.indexOf('o') > -1;
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });

// out:
// RegExp#test x 34,513,924 ops/sec ±0.65% (90 runs sampled)
// String#indexOf x 747,312,120 ops/sec ±1.76% (85 runs sampled)
// Fastest is String#indexOf
```

### 例子二

有一个字符串 var number = '100'，我们要将它转换成 Number 类型的 100。

目前有三个选项：+, parseInt, Number

测试哪个更快

```js
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var number = '100';

var int1 = function (str) {
  return +str;
};

var int2 = function (str) {
  return parseInt(str, 10);
};

var int3 = function (str) {
  return Number(str);
};

// 添加测试
suite
  .add('+', function () {
    int1(number);
  })
  .add('parseInt', function () {
    int2(number);
  })
  .add('Number', function () {
    int3(number);
  })
  // 每个测试跑完后，输出信息
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // 这里的 async 不是 mocha 测试那个 async 的意思，这个选项与它的时间计算有关，默认勾上就好了。
  .run({ 'async': true });

// out:
// + x 789,817,371 ops/sec ±1.14% (88 runs sampled)
// parseInt x 201,406,790 ops/sec ±0.77% (91 runs sampled)
// Number x 758,674,480 ops/sec ±1.57% (87 runs sampled)
// Fastest is +
```

## 参考链接

[Github Benchmark.js](https://github.com/bestiejs/benchmark.js/)