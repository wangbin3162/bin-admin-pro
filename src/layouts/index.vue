<template>
  <div class="basic-layout">
    <section class="layout layout-has-aside">
      <aside class="layout-aside" :class="{'fixed-aside':fixedAside}" :style="asideStyle">
        <div class="logo" flex="cross:center">
          <img class="icon" src="@/assets/images/logo-icon-b.png" alt="logo-small" />
          <transition name="zoom-in">
            <h1 v-show="sidebar">Bin Admin Pro</h1>
          </transition>
        </div>
        <div class="layout-aside-children">
          <aside-menus />
        </div>
      </aside>
      <main class="layout-main">
        <!--占位顶部-->
        <header class="layout-header" :style="fixedHeaderStyle" v-if="fixedHeader" />
        <global-header />
        <div class="layout-content-wrap">
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transverse" @before-leave="beforeLeave" @afterLeave="afterLeave">
              <keep-alive :include="cachedViews">
                <component :is="Component" :key="route.fullPath"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </main>
    </section>
    <b-back-top :height="200" :right="10"></b-back-top>
  </div>
</template>

<script>
import useSetting from '@/layouts/use-setting'
import AsideMenus from '@/layouts/menus'
import GlobalHeader from '@/layouts/header'

export default {
  name: 'Layout',
  components: { GlobalHeader, AsideMenus },
  setup() {
    const { sidebar, fixedAside, asideStyle, cachedViews, fixedHeaderStyle, fixedHeader } = useSetting()

    function beforeLeave(el) {
      el.style.position = 'absolute'
      el.style.top = '0'
      el.style.left = '0'
      el.style.width = '100%'
      el.style.height = '100%'
      el.style.overflow = 'hidden'
    }

    function afterLeave(el) {
      el.style = ''
    }

    return {
      sidebar,
      fixedAside,
      asideStyle,
      cachedViews,
      fixedHeaderStyle,
      fixedHeader,
      beforeLeave,
      afterLeave
    }
  }
}
</script>

<style lang="stylus" scoped>
.basic-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}

.layout {
  display: flex;
  min-height: 100vh;
  flex: auto;
  flex-direction: column;
  background: #f5f7f9;
  &-has-aside {
    flex-direction: row;
  }
  &-aside {
    background: #001529;
    transition: all .2s;
    position: relative;
    z-index: 10;
    min-height: 100%;
    overflow: hidden;
    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
    &.fixed-aside {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      overflow: hidden;
      box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);
    }
    .logo {
      position: relative;
      width: 100%;
      height: 48px;
      overflow: hidden;
      padding-left: 20px;
      border-bottom: 1px solid rgba(0, 21, 41, .05);
      .icon {
        height: 32px;
      }
      h1 {
        font-size: 20px;
        margin: 0 0 0 12px;
        white-space: nowrap
        color: #fff;
      }
    }
    &-children {
      height: calc(100% - 48px);
    }
  }
  &-main {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: auto;
    transition: all .2s;
    min-height: 0;
    overflow-x: hidden;
  }
  &-content-wrap {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
  }
}

</style>
