# chrome 开发者工具中好用的方法

## getEventListeners

可以获得原生监听事件的句柄

- [参考链接](https://stackoverflow.com/questions/446892/how-to-find-event-listeners-on-a-dom-node-in-javascript-or-in-debugging)

## queryObjects

queryObjects() 可以遍历出 V8 堆上以某对象为原型的对象们，而且执行前会先做一次垃圾回收。
