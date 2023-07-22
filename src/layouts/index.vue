<template>
  <div class="layout layout-has-aside">
    <div
      v-show="!setting.contentFull"
      class="layout-aside"
      :class="[{ 'fixed-aside': setting.fixedAside }, `layout-aside-${setting.theme}`]"
      :style="asideStyle"
    >
      <div class="logo" flex="cross:center">
        <img class="icon" src="@/assets/images/logo/bin-ui-next-02.svg" alt="logo-small" />
        <transition name="zoom-in">
          <h1 v-show="setting.sidebar">BIN-ADMIN-PRO</h1>
        </transition>
      </div>
      <div class="layout-aside-children">
        <aside-menus />
      </div>
    </div>
    <div class="layout-main layout" :style="mainStyle">
      <!--占位顶部-->
      <header class="layout-header" :style="headerHeight" v-if="setting.fixedHeader"></header>
      <global-header />
      <div class="layout-content-wrap">
        <router-view v-slot="{ Component, route }">
          <b-move-transition>
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.path"></component>
            </keep-alive>
          </b-move-transition>
        </router-view>
        <!-- <global-footer></global-footer> -->
      </div>
    </div>
  </div>
  <b-back-top :visible-height="200" :right="40" :bottom="55">
    <i class="b-iconfont b-icon-vertical-align-top back-top"></i>
  </b-back-top>
</template>

<script>
import useApp from '@/hooks/store/useApp'
import AsideMenus from '@/layouts/menus/index.vue'
import GlobalHeader from '@/layouts/header/index.vue'
import GlobalFooter from '@/layouts/footer/index.vue'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { on, off } from '@/utils/util'
import { useStore } from '@/store'

export default {
  name: 'Layout',
  components: {
    GlobalHeader,
    GlobalFooter,
    AsideMenus,
  },
  setup() {
    const { setting, searchVisible, asideStyle, toggleSearch } = useApp()
    const { tagsStore, storeToRefs } = useStore()
    const { cachedViews } = storeToRefs(tagsStore)

    const mainStyle = computed(() => {
      const { contentFull, fixedAside, sidebarWidth, sidebar } = setting.value
      if (contentFull) {
        return { marginLeft: 0 }
      }
      let left = 0
      if (fixedAside) {
        left = sidebarWidth
      }
      if (!sidebar && fixedAside) {
        left = 64
      }
      return { marginLeft: `${left}px` }
    })

    const headerHeight = computed(() => {
      const { contentFull, tagsView } = setting.value
      return contentFull ? { height: '42px' } : { height: tagsView ? '90px' : '48px' }
    })

    // ctrl + f 全局呼出搜索面板
    const keydownEvent = e => {
      if (!setting.value.showSearch) return
      const { ctrlKey, code } = e
      // 面板打开
      if (searchVisible.value) {
        if (code === 'Escape') {
          e.preventDefault()
          toggleSearch()
        }
      } else {
        if (ctrlKey && code === 'KeyF') {
          e.preventDefault()
          toggleSearch()
        }
      }
    }

    onMounted(() => {
      on(document, 'keydown', keydownEvent)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', keydownEvent)
    })

    return {
      setting,
      asideStyle,
      cachedViews,
      headerHeight,
      mainStyle,
    }
  },
}
</script>
