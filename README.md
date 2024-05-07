# bin-admin-pro

默认分支已更换为 vite 搭建，cli 版本详见第二分支。

工程已全面升级为 vue3.2+版本，组件库插件等也会定期更新 vue 版本依赖。

[预览](https://wangbin3162.github.io/bin-admin-pro/)

全新的 admin-pro 基于 Vue3，配合使用最新支持 vue3 的组件库 [bin-ui-design](https://github.com/wangbin3162/bin-ui-design/)

组件库提供了全新的主题系统和配置参数，增加了系统的个性化功能，并提供了多个自定义组件用于日常开发，配合组件库以及示例，可以快速的
搭建自己的业务管理模块。

部分截图

![登录](/public/preview/login.png)

![预览1](/public/preview/1.png)

![预览2](/public/preview/2.png)

![预览3](/public/preview/3.png)

![预览4](/public/preview/4.png)

![预览5](/public/preview/5.png)

![预览6](/public/preview/6.png)

![预览7](/public/preview/7.png)

## 目录结构

整个项目的目录结构如下，具体包含内容后续会进行详细介绍和解释

    ├── docs                       // 文档目录
    ├── public                     // 公共资源，第三方,不打包资源
    ├── src                        // 源代码
    │   ├── api                    // 所有请求相关资源
    │   ├── assets                 // 静态资源，会打包的资源
    │   ├── components             // 全局公用组件
    │       ├── Common             // 基础通用组件，不含任何api交互，封装基本布局，控件配置等组件
    │       ├── Pages              // 业务pages组件，用于拆分views中实际pages业务菜单模块的组装组件。包含交互
    │       ├── Service            // 通用的业务封装组件，会在不同pages业务菜单模块中使用，包含api调用，如选择字典，通用上传
    │   ├── config                 // 通用配置信息
    │   ├── hooks                  // 通用的hooks模块
    │   ├── layouts                // 全局布局模块
    │   ├── mock                   // mock server 数据
    │   ├── plugins                // 自定义插件
    │   ├── router                 // 路由
    │   ├── store                  // 全局 store
    │   ├── utils                  // 工具函数模块
    │   ├── views                  // views 视图显示（system文件夹为系统默认必带的试图显示）
    │   ├── App.vue                // 入口页面
    │   └── main.js                // 入口文件 加载组件 初始化等
    ├── .eslintrc.js               // eslint 配置项
    ├── .gitignore                 // git 忽略项
    ├── babel.config.js            // babel 配置项
    ├── vite.config.js             // vite配置项
    └── package.json               // package.json

## 安装

```bash
# 克隆项目
git clone https://github.com/wangbin3162/bin-admin-pro.git

# 安装依赖
npm install or yarn install

# 本地开发 启动项目
npm run dev
```
