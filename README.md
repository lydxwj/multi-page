# 微前端-多页应用项目

### 简介

多页应用初级实现方案，技术栈包括elementUI、vue、vuex、axios。。。

### 解决问题

- 项目布局共用问题
  - 使用iframe嵌套子页面的方式，只会更新页面部分区域
- 跳转子页面只更新部分区域
  - 使用iframe嵌套子页面的方式
- 子页面提示不置顶
  - 受到iframe限制，封装方法采用调用主页面vue实例提示
- 子页面控制跳转到主页面路由
  - 采用调用主页面vue实例跳转（主页面实例挂载在window上）
- 直接进入子页面自动跳转主页面中对应路由
  - 封装方法判断是否被嵌入iframe，根据页面路径组合跳转主页面中对应路由
- 父子页面之间实时通信
  - 增加vuex插件，实时同步状态
- 自动识别有多少页面，开发时自动代理页面路由
  - 自动读取src/pages下的文件夹作为打包入口，构建出多页应用

### 发布注意

Nginx配置

```nginx
http {
...
  server {
    listen 80;
	  root   /usr/share/nginx/html/;
	
    location / {
      try_files $uri $uri/ @router;
      index  index.html index.htm;
    }
    
    location /pageTwo {
      try_files $uri $uri/ /pageTwo.html; # 一定要在前面加/
      index  pageTwo.html pageTwo.htm;
    }
    location /pageOne {
      try_files $uri $uri/ /pageOne.html;
      index  pageOne.html pageOne.htm;
    }
    location @router {
      rewrite ^.*$ /index.html last;
    }
  }
}
```

#### [项目地址](https://github.com/lydxwj/multi-page)

