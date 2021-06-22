<template>
  <div class="layout layout-has-aside">
    <div class="layout-aside" :class="{'fixed-aside':fixedAside}" :style="asideStyle">
      <div class="logo" flex="cross:center">
        <img class="icon" src="@/assets/images/logo-icon-b.png" alt="logo-small" />
        <transition name="zoom-in">
          <h1 v-show="sidebar">Bin Admin Pro</h1>
        </transition>
      </div>
      <div class="layout-aside-children">
        <aside-menus />
      </div>
    </div>
    <div class="layout-main layout" :style="mainStyle">
      <global-header />
      <div class="layout-content-wrap" :style="contentStyle">
        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transverse" @before-leave="beforeLeave" @afterLeave="afterLeave">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.fullPath"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
      <global-footer></global-footer>
    </div>
  </div>
  <b-back-top :height="200" :right="10"></b-back-top>
</template>

<script>
import useSetting from '@/hooks/use-setting'
import AsideMenus from '@/layouts/menus'
import GlobalHeader from '@/layouts/header'
import GlobalFooter from '@/layouts/footer'
import { computed } from 'vue'

export default {
  name: 'Layout',
  components: { GlobalHeader, GlobalFooter, AsideMenus },
  setup() {
    const {
      sidebar,
      showTagsView,
      sidebarWidth,
      fixedAside,
      asideStyle,
      cachedViews,
      fixedHeaderStyle,
      fixedHeader
    } = useSetting()

    const mainStyle = computed(() => {
      let left = 0
      if (fixedAside.value) {
        left = sidebarWidth.value
      }
      if (!sidebar.value) {
        left = 64
      }
      return {
        paddingLeft: `${left}px`
      }
    })

    const contentStyle = computed(() => {
      let top = 0
      if (fixedHeader.value) {
        top += 48
      }
      if (showTagsView.value) {
        top += 36
      }
      return {
        paddingTop: `${top}px`
      }
    })

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
      mainStyle,
      contentStyle,
      beforeLeave,
      afterLeave
    }
  }
}
</script>
