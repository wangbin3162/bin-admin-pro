<template>
  <div class="navbar-header">
    <div class="left-side">
      <div class="logo-wrap">
        <img class="icon" src="@/assets/images/logo/bin-ui-next-02.svg" alt="logo-small" />
        <h5>ADMIN-PRO</h5>
      </div>
    </div>
    <div class="center-side">
      <div class="mixed-menu" v-if="setting.menuType === 'mixed'">
        <b-tabs
          v-model="topNavActive"
          :data="tabs"
          ref="tabsRef"
          @change="topNavMenuChange"
        ></b-tabs>
      </div>
      <Breadcrumb v-if="setting.showHeaderBreadcrumb && setting.menuType === 'default'" />
    </div>
    <div class="right-side">
      <SearchTrigger v-if="setting.showSearch" />
      <MessageTrigger v-if="setting.showMessage" />
      <WeatherTrigger v-if="setting.showWeather" />
      <SettingTrigger />
      <ThemeTrigger />
      <UserTrigger />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed, ref, watch } from 'vue'
import { on, off } from '@/utils/util'
import Breadcrumb from './breadcrumb/Breadcrumb.vue'
import SearchTrigger from './search/Search.vue'
import WeatherTrigger from './weather/Weather.vue'
import MessageTrigger from './message/Message.vue'
import SettingTrigger from './setting/Setting.vue'
import ThemeTrigger from './theme/Theme.vue'
import UserTrigger from './user/User.vue'
import { useStore } from '@/pinia'
import useMenu from '@/hooks/store/useMenu'
import { useRoute } from 'vue-router'
const route = useRoute()

const { appStore, storeToRefs, settingStore } = useStore()
const { searchVisible } = storeToRefs(appStore)
const { setting } = storeToRefs(settingStore)

const { topMenuTabs, topNavActive, setTopNavActive, sideMenus, handleMenuSelect } = useMenu()

const tabs = computed(() =>
  topMenuTabs.value.map(menu => ({
    icon: menu.icon,
    key: menu.name,
    title: menu.title,
  })),
)

const tabsRef = ref(null)

onMounted(() => {
  watch(
    () => route.fullPath,
    () => {
      setTopNavActive(route.path.substring(1))
      // 调用移动至目标标签
      tabsRef.value?.moveToCurrentTab()
    },
    { immediate: true, flush: true },
  )
})

function topNavMenuChange() {
  const one = sideMenus.value[0]
  if (sideMenus.value && one) {
    //  有子项
    if (one.children?.length) {
      if (!one.children.externalLink) {
        handleMenuSelect(one.children[0].name)
      }
    } else {
      if (!one.externalLink) {
        handleMenuSelect(one.name)
      }
    }
  }
}

function toggleSearch() {
  searchVisible.value = !searchVisible.value
}

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
</script>

<style>
.navbar-header {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--v-header-bg);
  border-bottom: 1px solid var(--v-header-border-color);
  color: var(--v-header-text-color);
  .left-side {
    min-width: var(--v-sider-width);
    .logo-wrap {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
      > img {
        width: 36px;
        margin-right: 8px;
      }
      h5 {
        font-size: 18px;
        line-height: 1.4;
        margin: 0;
        font-weight: 500;
        color: var(--v-header-text-color);
      }
    }
  }
  .center-side {
    display: flex;
    align-items: center;
    flex: 1;
    .mixed-menu {
      padding: 0 24px;
      width: 720px;
      .bin-tabs-wrapper {
        .nav-wrapper {
          .tab-item {
            color: var(--v-header-text-color);
            .b-iconfont:not(.b-icon-close) {
              color: var(--v-header-text-color);
            }
            &:hover,
            &.active {
              color: var(--bin-color-primary);
              .b-iconfont:not(.b-icon-close) {
                color: var(--bin-color-primary);
              }
            }
          }
        }
        &.default:after {
          content: unset;
        }
      }
    }
  }
  .right-side {
    display: flex;
    align-items: center;
    padding-right: 20px;

    .header-trigger {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      outline: none;
      transition: background-color 0.2s;
      .trigger {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--v-header-trigger-size);
        height: var(--v-header-trigger-size);
        border-radius: var(--v-header-trigger-radius);
        border: 1px solid var(--v-header-trigger-border-color);
        &:hover {
          background-color: var(--v-header-trigger-hover-bg-color);
        }
      }
    }
  }
}
</style>
