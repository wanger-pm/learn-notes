## 用途

可以测试机器的 上行带宽 和 下行带宽

## 安装

linux:

```bash
pip install speedtest-cli
```

mac:

```bash
brew install speedtest-cli
```

## 如何使用

### 最直接的用法

```bash
speedtest
#or
speedtest-cli
```

输出类似如下：

```log
Retrieving speedtest.net configuration...
Testing from Choopa, LLC (45.77.180.237)...
Retrieving speedtest.net server list...
Selecting best server based on ping...
Hosted by OPEN Project (via 20G SINET) (Tokyo) [13.54 km]: 63.554 ms
Testing download speed................................................................................
Download: 14.29 Mbit/s
Testing upload speed................................................................................................
Upload: 15.64 Mbit/s
```

可以看到下行带宽为 12Mb， 上行带宽为 15Mb。

### 指定测试服务器测试

第一步，列出服务器列表：

```bash
# 下面列出所有中国的测试服务器
speedtest --list | grep China

34988) China Telecom LiaoNing 5G (Shenyang, China) [1536.16 km]
37235) Unicom (Shenyang, China) [1536.16 km]
 9484) China Unicom (Changchun, China) [1538.00 km]
26656) ChinaMobile-HeiLongjiang (Harbin, China) [1578.82 km]
30293) Neimeng CMCC 5G (Tongliao, China) [1743.46 km]
24447) China Unicom 5G (ShangHai, China) [1761.44 km]
 3633) China Telecom (Shanghai, China) [1761.44 km]
25637) Chinamobile-5G (Shanghai, China) [1761.44 km]
30852) Duke Kunshan University (Kunshan, China) [1800.42 km]
 5396) China Telecom JiangSu 5G (Suzhou, China) [1838.99 km]
40131) China Mobile Suzhou 5G (Suzhou, China) [1841.72 km]
26850) China Mobile 5G (Wuxi, China) [1854.45 km]
32291) China Mobile 5G (ChangZhou, China) [1874.92 km]
17320) China Mobile JiangSu 5G (ZhenJiang, China) [1908.80 km]
36663) China Telecom JiangSu 5G (Zhenjiang, China) [1908.80 km]
 7509) China Telecom ZheJiang Branch (Hangzhou, China) [1919.24 km]
13704) China Unicom (Nanjing, China) [1972.30 km]
27249) China Mobile jiangsu 5G (Nanjing, China) [1972.30 km]
26352) China Telecom JiangSu 5G (Nanjing, China) [1975.35 km]
35722) China Telecom TianJin (TianJin, China) [2025.29 km]
34115) China Telecom TianJin-5G (TianJin, China) [2025.30 km]
```

第二步，指定服务器编号：

```bash
speedtest --server=34988
```

## 其他

speedtest 还可以生成图片报告：

```bash
speedtest --share
```
