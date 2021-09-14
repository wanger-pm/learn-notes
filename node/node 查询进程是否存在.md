# node 查询进程是否存在

## 根据进程名称，查询 进程是否存在

```ts
/**
 * 根据进程名称，查询 进程是否存在
 * 
 * @param serverName 
 */
const checkProcessIsExistByName = (serverName: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    if (!isWin()) {
      rej('checkProcessIsExistByName 方法目前只能在 window 系统上使用');
    }
    exec('tasklist /fo csv', {
      maxBuffer: 1024 * 1024 * 1024
    }, function (err, stdout) {
      if (err) {
        rej(`error occur, cause: ${err.message}`);
        return;
      }
      try {
        stdout.split('\n').forEach((line: string) => {
          if (line) {
            // let [name, pid] = line.trim().split(',');
            let [name] = line.trim().split(',');
            name = JSON.parse(name);
            // pid = JSON.parse(pid);
            // console.log({ name, pid });
            if (name === serverName) {
              res(true);
            }
          }
        });
        res(false);
      } catch (e) {
        rej(`checkProcessIsExistByName deal stdout error, cause: ${String(e)}`);
      }
    });
  });
};
```

注意点：

1. 上面方法目前只限于 window 系统，linux 系统思路差不多，可以用 `ps aux`；
1. 上面原本用的是 window 的 `tasklist`，但是用 `tasklist` 进程名显示不全，所以这里用`tasklist /fo csv`；
1. 上面的方法写的不太优雅，`forEach` 命中后就应用不再循环，也不必跑最后的 `rej`，这里可以优化

## 根据 pid 获取进程

可以用 `ps-node` 库；

```js
var ps = require('ps-node');
 
// A simple pid lookup
ps.lookup({ pid: 12345 }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }
 
    var process = resultList[ 0 ];
 
    if( process ){
 
        console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
    }
    else {
        console.log( 'No such process found!' );
    }
});

```

## 根据 command 获取进程

```js
var ps = require('ps-node');
 
// A simple pid lookup
ps.lookup({
    command: 'node',
    }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }
 
    resultList.forEach(function( process ){
        if( process ){
 
            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
    });
});
```
