# 主题系统迁移步骤和细节。

主题系统迁移文档说明，前提是已经进行了 pinia 全局状态的升级和重构，并完善了部分的主题设计样式。

## 一、迁移入口 layout

由于是整体破坏性更新，这里重新优先迁移新版本的 layouts 文件夹，目前新增一个 layout 文件夹用于前期迁移布局组件。

将所有新版本的 layouts 文件统一复制到 layout 文件夹，并修改 router 的入口文件来进行适配。这里先进行适配，后面再同步 switch、inline 组件。

```js
// router/routes.js
// - import layout from '@/layouts/switch.vue'
import layout from '@/layout/index.vue'
```

## 二、迁移新版主题皮肤组件，theme。

上一步进行引入之后，页面会报错，没有 ThemeConfig。这里需要将新版本的 theme 文件夹里的内容全部进行迁移。

迁移完成后，发现页面仍有报错和警告内容，查看报错后发现。错误来源于全局状态中没有 setTopNavActive。因此，我们需要再迁移以下新版的 pinia 状态。

## 三、迁移新版 pinia 状态。

新版本不进行主题色和菜单色的定制，专门配置了更多主题变量。所以这里打开 pinia 文件夹。同步迁移 setting 的配置。移除两个颜色配置，增加菜单类型配置，同时更新 getters 和 actions 保持新版 setting 配置一致

```js
// pinia/modules/setting.js

const useSetting = defineStore('setting', {
  state: () => ({
    // 基础配置项，可供缓存
    setting: {
      themeName: 'dark',
      // -menuTheme: '#001529',
      // -systemPrimary: '#1089ff',
      menuType: 'default', // default: 常规布局 mixed: 混合布局
    })
})

```

修改完 setting 之后，我们需要继续修改 menu 的状态配置。先增加 setting 的 useSettingStoreWithOut 引用。因为侧边栏菜单需要根据菜单类型来做相应处理。同时增加侧边栏的 getters，最后增加一个 actions

```js
// pinia/modules/menu.js
import { deepCopy } from '@/utils/util'
import { useSettingStoreWithOut } from './setting'
const useMenu = defineStore('menu', {
  state: () => ({
    routes: [],
    addRouters: [], // 左侧菜单栏的缓存路由
    menu: [], // 原始菜单
    menuItems: [], // 平铺菜单,
    topNavActive: '', // 如果是mixed混合模式菜单，则需要保存顶部缓存的菜单
  }),
  getters: {
    // 侧边菜单集合
    sideMenus() {
      const settingStore = useSettingStoreWithOut()

      //  常规布局
      if (settingStore.setting.menuType === 'default') {
        return deepCopy(this.menu)
      } else {
        // 混合布局
        const currentMenu = this.menu.find(i => i.name === this.topNavActive)
        if (!currentMenu) return []
        // 如果只有一个菜单，则返回自己即可
        if (currentMenu.parents[0] === this.topNavActive && !currentMenu.children) {
          return [currentMenu]
        } else {
          return deepCopy(currentMenu.children)
        }
      }
    },
    // ...
  },
  actions: {
    // 根据一个菜单名字，设置顶部开启nav的值
    setTopNavActive(name) {
      if (name.split('/')[0] === 'redirect') return
      const currentMenu = this.menuItems.find(i => i.name === name)
      if (!currentMenu) {
        console.warn('setTopNavActive: currentMenu is null [name is ' + name + ' ]')
        return
      }
      // 如果只是一个单独的组件，且父级0节点也是自身，标识这个菜单就是个孤独菜单，这时候设置为自己
      if (currentMenu.parents[0] === name) {
        this.topNavActive = name
      } else {
        if (currentMenu && currentMenu.parents[0]) {
          this.topNavActive = currentMenu.parents[0]
        }
      }
    },
  },
})
```

修改完毕之后发现还报错。这里需要再修改以下 hooks/store/useMenu 中的内容。

## 四、迁移新版样式

上面的步骤结束之后，发现不报错了，但是左侧菜单好像还是有些问题并没有显示。这主要是样式的问题。

我们将 assets/styles/中的样式进行全量覆盖。然后再查看结果。

修改完毕后，发现左侧菜单已经可以正常显示了。但部 tag 标签页好像还有点问题。这里我们需要移除原有的 stylus 全局样式。

## 五、移除旧版本 stylus 样式影响。

这里已基本完成新版本样式更新，但旧版本样式仍然有影响，我们需要移除这些副作用，修改这部分之前，我们提交一次，已排除修改内容的干扰。

首先移除 main.js 中的引用

```js
// - import '@/assets/stylus/index.styl' // 项目样式
```

这时候发现样式已经正确，但是修改主题配置后并没有实时生效。因此我们还需要修改一下入口文件。app.vue 中的引用。

修改完毕后发现基本可以正常显示

```vue
<template>
  <b-config-provider abstract :themeName="themeName" :theme="themeConfigRef">
    <router-view />
  </b-config-provider>
</template>

<script setup>
import { useThemeInit, themeConfigRef } from '@/theme'

const { themeName } = useThemeInit()
</script>
```

更新后发现，部分样式存在错误，如带有树表的内容，这里修改一下 baseTree 和 useTree 这两个文件后，需要调整兼容样式。

我们需要把 assets/stylus/theme/theme-base.styl 中的这部分代码拷贝到 layout/index.css 文件中去。

```stylus
 .table-wrap {
      display: flex;

      .table-right {
        width: calc(100% - 280px);
        padding-left: 16px;
      }
    }
```

```css
.app-layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--v-content-bg);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  overflow-x: hidden;
  padding-left: var(--v-sider-width);
  padding-top: var(--v-header-height);
  .app-layout-content-inner {
    position: relative;
    flex: 1;
    overflow-x: hidden;
    /* +++ */
    .table-wrap {
      display: flex;

      .table-right {
        width: calc(100% - 280px);
        padding-left: 16px;
      }
    }
  }
}
```

至此已基本完成了主题的更新。还有些细节问题，我们先提交一次后再进行修改。

## 六、最后修复。（重要）

修复一：iconfont 组件修改。

iconfont 组件，默认取色是从状态管理中取值，这里需要更换为 css 变量取值

修复二：头部标题和兼容组件更新。

头部组件需要根据项目情况进行取值。这里参考原有的布局，将内容进行修改。注意要点有以下几点

1. layout/src/nav-header/NavHeader.vue 修改 logo 和 title 文字显示内容。
2. 复制 inline.vue 至新版 layout，并且修改路由动画位置
3. 复制 switch.vue 至新版 layout。并且修改路由引入目录

修复三：baseTree、baseTable 更新。

修复四：全局 stylus 的移除。这里需要全局搜索 var.styl 和 mixin.styl 的引用,并将部分变量更换为 css 变量,如 var(--bin-color-primary)

4.1 全局替换部分变量

var.styl 需要全局搜索和替换

```
$color-text-primary -> var(--bin-color-text-primary)
$color-text-default -> var(--bin-color-text-default)
$color-text-secondary -> var(--bin-color-text-secondary)
$border-base -> 1px solid var(--v-g-border-color)
$cube-base-border -> 1px solid var(--v-g-border-color)
$cube-base-border-light -> 1px solid var(--v-g-border-color)
```

4.2 全局移除 var.styl 的引用

全局搜索 'assets/stylus/base/var.styl'然后逐个移除

4.3 全局替换 mixin.styl 的变量

```
getColor() -> var(--bin-color-primary)
getHover() -> var(--bin-color-primary-light1)
getLighten3() -> var(--bin-color-primary-light3)
getLighten5() -> var(--bin-color-primary-light5)
```

4.4 全局移除 mixins.styl

全局搜索 'assets/stylus/base/mixins.styl'然后逐个移除

## 七、（可选）更新 layout 树表布局样式。

这部分按实际需求进行修改，如果时间允许，需要一个个业务组件进行优化。这里给出一个示例

搜索 `<div class="table-right">` 标签，查看有哪些部分使用了这种兼容样式。例如，模型规范，这里需要更新 baseTable 组件，直接全部替换即可

替换完成后即可按照新样式进行展示

至此,基本可以完成整体主题的切换迁移工作.
