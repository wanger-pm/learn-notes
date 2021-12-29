const cp = require('child_process')
const os = require('os')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const splitStr = (str) => {
  return str.split(os.EOL);
}

const mergeStr = (strList) => {
  return strList.join(os.EOL);
}

class Debug {
  // pdb 命令队列
  queue = [];

  // 当前正在执行的 pdb 命令
  currentCommand = undefined;

  constructor(options) {
    const { pythonPath, filePath } = options
    // 启动 python pdb 模式
    this.server = cp.spawn(pythonPath, ['-m', 'pdb', filePath])
    // 接受 pdb 模式吐出的数据
    this.server.stdout.on('data', (chunk) => {
      let data = chunk.toString();
      console.log(this.normalized(data));
      this._next();
    })
  }

  /**
   * 当前 pdb 命令执行完后，接着执行下一个命令
   */
  _next() {
    this.currentCommand = undefined;
    const command = this.queue.shift();
    if (command) {
      this.currentCommand = command;
      this._sendToPdb(command);
    }
  }

  /**
   * 发送命令给 pdb 进程
   * 
   * @param {*} command 
   */
  _sendToPdb(command) {
    this.server.stdin.write(command + os.EOL)
  }

  /**
   * 将要执行的命令推入到要执行的命令队列里
   * 
   * @param {*} command 
   */
  push(command) {
    if (this.queue.length === 0) {
      // 如果当前的队列里没有待执行的命令，则在下一个宏任务里触发执行
      setTimeout(() => {
        this._next();
      });
    }
    this.queue.push(command);
  }

  /**
   * 归一化 pdb 返回的输出流
   * 
   * @param {*} data 
   * @returns 
   */
  normalized(data) {
    const command = this.currentCommand;
    if (!command) return;

    if (command === 'l') {                    // 获取当前调试到哪一行
      const BreakFlag = '->';
      const logs = splitStr(data);
      const log = logs.find(i => i.includes(BreakFlag));
      if (log) {
        const currentLine = parseInt(log.split(BreakFlag)[0], 10);
        if (currentLine) {
          console.log('currentLine:', currentLine);
        }
      }
      return '';
    } else if (command === 'n') {             // 单步执行
      const logs = splitStr(data);
      const sliceLogs = logs.slice(0, logs.length - 3);
      return mergeStr(sliceLogs)
    } else if (command === 'c') {             // 恢复运行至下一个断点
      const logs = splitStr(data);
      const sliceLogs = logs.slice(0, logs.length - 3);
      return mergeStr(sliceLogs);
    } else if (command.startsWith('b ')) {    // 添加断点
      return '';
    } else if (command.startsWith('cl ')) {   // 删除断点
      return '';
    } else {
      console.warn('未知的调试命令：', command)
    }
  }

  destory() {
    this.server?.destory();
    this.server = null;
  }
}

const options = {
  pythonPath: 'python3',
  filePath: './demo.py'
}

const debug = new Debug(options);

// 这里放一些 pre command
// setTimeout(() => {
//   debug.push('b 3');  // 在第三行打断点
//   debug.push('b 10'); // 在第十行打断点
//   debug.push('c');    // 运行至下一个断点
//   debug.push('n');    // 单步执行
//   debug.push('l');    // 查看当前运行到第几行（连续两次执行这个命令似乎有些问题）
//   debug.push('c');    // 查看当前运行到第几行（连续两次执行这个命令似乎有些问题）
// }, 100)


// 交互式输入命令
readline.on('line', function (line) {
  debug.push(line)
})
