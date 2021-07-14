<template>
  <div class="layout layout-has-aside">
    <div class="layout-aside"
         :class="[{'fixed-aside':fixedAside},`layout-aside-${theme}`]"
         :style="asideStyle"
    >
      <div class="logo" flex="cross:center">
        <img class="icon" src="@/assets/images/logo/bin-ui-next-02.svg" alt="logo-small" />
        <transition name="zoom-in">
          <h1 v-show="sidebar">BIN-ADMIN-PRO</h1>
        </transition>
      </div>
      <div class="layout-aside-children">
        <aside-menus />
      </div>
    </div>
    <div class="layout-main layout" :style="mainStyle">
      <!--占位顶部-->
      <header class="layout-header" :style="headerHeight" v-if="fixedHeader"></header>
      <global-header />
      <div class="layout-content-wrap">
        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transverse" @before-leave="beforeLeave" @after-leave="afterLeave">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.fullPath"></component>
            </keep-alive>
          </transition>
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
import { computed } from 'vue'
import useTagsView from '@/hooks/store/useTagsView'

export default {
  name: 'Layout',
  components: {
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
      fixedHeader
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
      theme,
      sidebar,
      fixedAside,
      asideStyle,
      cachedViews,
      headerHeight,
      fixedHeader,
      mainStyle,
      beforeLeave,
      afterLeave
    }
  }
}
</script>
