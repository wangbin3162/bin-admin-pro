# 主题系统迁移步骤和细节。

主题系统文件，编写与根目录 theme 文件夹，同时，需要编写新的主题系统变量，vars.css 这部分文件包含与原有 assets 目录。

整理本文档用于记录修改过程和修改内容。

# 一、更新依赖，迁移使用 pinia 来进行版本管理。

## 1、使用依赖。

全局样式系统重构，使用 postcss 进行编写。同时依赖 bin-ui-next 2.0.0+版本，因此需要优先安装相关依赖。

同时，新的工程推荐使用 pinia 来进行全局状态管理，因此，也需要迁移原有 vuex 内容至 pinia

```sh
pnpm update

pnpm add postcss-color-mix postcss-each postcss-each-variables postcss-import postcss-nested -D

pnpm add bin-ui-next pinia
```

## 2、移除部分内容。

原有的 assets/stylus 目录以及 layouts 目录需要安全的进行迁移，这部分后续等替换完成后再删除。

可以安全删除的模块。

1. assets/fonts 这部分是天气控件内容，实际产品中不需要。且新版本放置到 layout 中，因此可以直接移除
2. components/Common/Weather 这部分也是天气内容，同上，也可以直接移除，移除后会报错，这里将报错位置也进行移除。
3. 移除所有 views/demo 文件夹，以及 dashboard 中的 analysis 文件夹

移除后进行一次提交，这一步主要是为了移除无用文件。

## 2、安全拷贝内容

1. 将根目录`postcss.config.cjs` 拷贝至迁移工程
2. 将`src/assets/styles`文件目录拷贝至迁移工程

## 3、修改样式兼容模式。

assets/styles 文件目录，在 main.js 中进行追加引入样式

```js

```
