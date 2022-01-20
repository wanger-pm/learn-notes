# explore

## 2022

### 01-08

#### Chromium Embedded Framework

Chromium Embedded Framework (CEF) 是一个 Chromium 嵌入式框架。使用 python 的 cefpython 库可以很方便的调起它：

```bash
pip install cefpython3==66.0
git clone https://github.com/cztomczak/cefpython.git
cd cefpython/examples/
python hello_world.py
```

```python
# Hello world example. Doesn't depend on any third party GUI framework.
# Tested with CEF Python v57.0+.
#
# ==== High DPI support on Windows ====
# To enable DPI awareness on Windows you have to either embed DPI aware manifest
# in your executable created with pyinstaller or change python.exe properties manually:
# Compatibility > High DPI scaling override > Application.
# Setting DPI awareness programmatically via a call to cef.DpiAware.EnableHighDpiSupport
# is problematic in Python, may not work and can cause display glitches.

from cefpython3 import cefpython as cef
import platform
import sys

def main():
    check_versions()
    sys.excepthook = cef.ExceptHook  # To shutdown all CEF processes on error
    cef.Initialize()
    cef.CreateBrowserSync(url="https://www.baidu.com/",
                          window_title="Hello World!")
    cef.MessageLoop()
    cef.Shutdown()


def check_versions():
    ver = cef.GetVersion()
    print("[hello_world.py] CEF Python {ver}".format(ver=ver["version"]))
    print("[hello_world.py] Chromium {ver}".format(ver=ver["chrome_version"]))
    print("[hello_world.py] CEF {ver}".format(ver=ver["cef_version"]))
    print("[hello_world.py] Python {ver} {arch}".format(
           ver=platform.python_version(),
           arch=platform.architecture()[0]))
    assert cef.__version__ >= "57.0", "CEF Python v57.0+ required to run this"


if __name__ == '__main__':
    main()
```

参考链接：

- [github cef](https://github.com/chromiumembedded/cef)
- [vefpython example](https://github.com/cztomczak/cefpython#examples)

#### Mac 电脑查看温度

使用 iStats

```bash
# 安装
sudo gem install iStats

# 查看温度
istats
```

### 01-11

#### 设计模式六大原则

六大设计原则主要是指：

- 单一职责原则（Single Responsibility Principle）；
- 开闭原则（Open Closed Principle）；
- 里氏替换原则（Liskov Substitution Principle）；
- 迪米特法则（Law of Demeter），又叫“最少知道法则”；
- 接口隔离原则（Interface Segregation Principle）；
- 依赖倒置原则（Dependence Inversion Principle）。

参考链接：

- [设计模式六大原则](https://tianweili.github.io/page/2/)
- [设计模式6大原则](https://juejin.cn/post/6844903545561432077)
- [快速理解-设计模式六大原则](https://www.jianshu.com/p/807bc228dbc2)
- [六大设计原则超详细介绍（再不理解你打我）](https://zhuanlan.zhihu.com/p/110130347)

### 01-12

#### manim

一个超级牛的 python 可视化库，youtube 3blue1brown 的作者写的。

参考链接：

- [github 源码](https://github.com/3b1b/manim/tree/master/manimlib/utils)
- [演示demo](https://3b1b.github.io/manim/getting_started/example_scenes.html)
- [文档](https://3b1b.github.io/manim/getting_started/installation.html)
- [文档](https://docs.manim.community/en/stable/)

### 01-20

#### fuite

一个测试网页是否有内存泄漏的工具。

使用：

```bash
npx fuite https://wangyulue.com/
```

参考链接：

- [github 仓库](https://github.com/nolanlawson/fuite)

#### 图表库

- [echarts](https://github.com/apache/echarts)
- [Chart.js](https://github.com/chartjs/Chart.js)