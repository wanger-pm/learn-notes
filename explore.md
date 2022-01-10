# explore

## 2022

## 01-08

### Chromium Embedded Framework

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

### Mac 电脑查看温度

使用 iStats

```bash
# 安装
sudo gem install iStats

# 查看温度
istats
```
