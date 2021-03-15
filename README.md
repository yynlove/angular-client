# AngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).




## proxyconfig.json
指定代理配置  跨域访问 并在angular.json 的serve 中proxyConfig配置中进行配置 ，相关资料：InjectionToken
## 使用Delon 认用户认证
安装 npm i @delon/auth


## 路由复用
1. 创建类SimpleReuseStrategy 实现 RouteReuseStrategy 接口，实现路由复用
2. 路由上添加data:{title:'标题',useCache:boolean} useCache=true 代表路由复用，title 作为路由的key  


## 删除node_modules
npm提供一个包 remove-node-modules 来帮助删除 node_modules
npm i -g remove-node-modules
删除  当前项目根目录下输入 remove-node-modules ，即可删除 node_modules 文件夹。
## 清楚缓存
npm cache clean --force
## 查看源
npm config get registry 
npm install -g cnpm --registry=https://registry.npm.taobao.org

###  状态管理  @ngrx/store
1. npm install @ngrx/store --save
2. npm install @ngrx/store-devtools --save  浏览器安装Redux DevTools 插件


### Md5 加密
1.  npm install ts-md5 --save

### 安装ngx-cookie-service
npm install ngx-cookie-service

### @delon/auth cookies 有些问题，CookieStorageStore使用
1. cnpm install ngx-utils-cookies-port --save
安装 ngx-utils-cookies-port
虽然 NG-ALAIN 提供 CookieStorageStore 但它并不支持服务端 SSR 访问 Cookie，因此需要手动构建针对 SSR 的 Token 持久化存储。
推荐使用 @ngx-utils/cookies 来处理 Cookies，它同时支持客户端与服务端。




## git切换分支
1) 切换到基础分支，如主干
  git checkout master

2）创建并切换到新分支
  git checkout -b a10
  git branch可以看到已经在panda分支上

3)更新分支代码并提交
  git add *
  git commit -m "init a10"
  git push origin a10
