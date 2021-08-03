<template>
  <div class="layout layout-has-aside">
    <div class="layout-aside"
         :class="[{'fixed-aside':fixedAside},`layout-aside-${theme}`]"
         :style="asideStyle"
    >
      <div class="logo" flex="cross:center">
        <img class="icon" src="@/assets/images/logo/bin-ui-next-02.svg" alt="logo-small"/>
        <transition name="zoom-in">
          <h1 v-show="sidebar">BIN-ADMIN-PRO</h1>
        </transition>
      </div>
      <div class="layout-aside-children">
        <aside-menus/>
      </div>
    </div>
    <div class="layout-main layout" :style="mainStyle">
      <!--占位顶部-->
      <header class="layout-header" :style="headerHeight" v-if="fixedHeader"></header>
      <global-header/>
      <div class="layout-content-wrap">
        <router-view v-slot="{ Component, route }">
          <move-transition>
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.path"></component>
            </keep-alive>
          </move-transition>
        </router-view>
      </div>
      <global-footer></global-footer>
    </div>
  </div>
  <b-back-top :height="200" :right="24" :bottom="60"></b-back-top>
</template>

<script>
import useSetting from '@/hooks/store/useSetting'
import AsideMenus from '@/layouts/menus'
import GlobalHeader from '@/layouts/header'
import GlobalFooter from '@/layouts/footer'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import useTagsView from '@/hooks/store/useTagsView'
import { on, off } from '@/utils/util'
import MoveTransition from '@/components/Common/MoveTransition'

export default {
  name: 'Layout',
  components: {
    MoveTransition,
    GlobalHeader,
    GlobalFooter,
    AsideMenus
  },
  setup() {
    const {
      theme,
      sidebar,
      showTagsView,
      sidebarWidth,
      fixedAside,
      asideStyle,
      fixedHeader,
      showSearch,
      searchVisible,
      toggleSearch
    } = useSetting()
    const { cachedViews } = useTagsView()

    const mainStyle = computed(() => {
      let left = 0
      if (fixedAside.value) {
        left = sidebarWidth.value
      }
      if (!sidebar.value && fixedAside.value) {
        left = 64
      }
      return {
        paddingLeft: `${left}px`
      }
    })

    const headerHeight = computed(() => ({ height: showTagsView.value ? '80px' : '48px' }))

    // ctrl + f 全局呼出搜索面板
    const keydownEvent = (e) => {
      if (!showSearch.value) return
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
      theme,
      sidebar,
      fixedAside,
      asideStyle,
      cachedViews,
      headerHeight,
      fixedHeader,
      mainStyle
    }
  }
}
</script>
