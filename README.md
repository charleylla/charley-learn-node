# Nginx 的反向代理和负载均衡
## 正向代理和反向代理
我们经常正向代理和反向代理这两个名词，那么什么是正向代理，什么是反向代理呢？这里我举两个通俗的例子帮助我们理解这两个概念：
### 正向代理
假如我们要访问一个网站A，但是由于各种原因无法直接访问到，我们可以借助一个可以访问到网站A的第三方的服务器B，
通过服务器B访问网站A，我们通过服务器B访问网站A的这个过程就是正向代理。
### 反向代理
同样举访问网站A的例子，这个网站A是一个大型网站，我们知道大型网站都是有服务器集群的，我们在访问网站A的时候，怎么找到某个具体的服务器呢？这就需要使用反向代理服务器，通过反向代理服务器可以帮助我们找到A网站服务器集群中的某一台服务器，这个过程就是反向代理。
## 负载均衡
还是以上面的访问网站A为例，我们在访问网站A的时候，反向代理服务器怎么知道帮我们的请求装发到集群中的哪一台服务器呢？同时，为了合理的优化资源，不应该将所有的请求都转发到同一台服务器上，需要根据集群中服务器的运行情况，比如通过CPU占用、带宽等因素决定将请求转发到一个较优的服务器。这个合理分配请求资源的过程就叫做负载均衡。

有很多方案可以实现反向代理和负载均衡，如 Nginx、LVS以及通过硬件手段等。
## Nginx
对于中小网站，常用 Nginx 实现反向代理和负载均衡。关于 Nginx 本身又是一个庞大的领域了，本人对具体的细节也不明白，毕竟术业有专攻。因此本文只介绍一般前端工程师常用的一些操作和配置，若想深入 Nginx，还需要您再通过其他的资料加以学习。
### 安装 Nginx
在 Ubuntu 上，可以通过 ```apt-get``` 的方式进行安装：
```
sudo apt-get install nginx
```
执行安装后，Nginx 的可执行程序被安装到 ```/usr/sbin```，路径为 ```/usr/sbin/nginx```，Nginx 的相关配置配置文件在 ```/etc/nginx``` 目录中。

注：以上为 Ubuntu 中的文件结果，不同的 Linux 发行版可能会有差异。
### Nginx 的几个常用命令
Nginx 有以下几个常用的命令：
```
// 启动 Nginx
sudo nginx

// 停止 Nginx
sudo nginx -s stop

// 重载 Nginx 配置文件
sudo nginx -s reload

// 重启 Nginx
sudo nginx -s restart

// 自定义 Nginx 配置文件
nginx -c xxx.conf
```
## 配置 Nginx 负载均衡



## Nginx
## HTTP Upstream 模块

 sudo apt-get install nginx
 sudo nginx
 sudo nginx -s stop
 sudo nginx -s reload
 sudo nginx -s start

 nginx -t：测试配置文件是否OK
 nginx -c xxx.conf：自行指定配置文件
 一般我们在指定配置文件前，需要进行备份
 cp nginx.conf nginx.conf.bak
 怎么找到 nginx 所指向的根目录

 设置 ip_hash，保证每次刷新都落到同一台服务
 权重：根据权重选择落在哪一台服务器

 1.用户（谁能使用）
 2.工作线程数目（auto），一般不超过 CPU 核心的两倍

## Node 上线部署
