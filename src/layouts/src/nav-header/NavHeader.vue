<template>
  <div class="navbar-header">
    <div class="left-side">
      <div class="logo-wrap">
        <img class="icon" src="@/assets/images/logo/bin-ui-next-02.svg" alt="logo-small" />
        <h5>ADMIN-PRO</h5>
      </div>
    </div>
    <div class="center-side">
      <Breadcrumb />
    </div>
    <div class="right-side">
      <SearchTrigger v-if="setting.showSearch" />
      <MessageTrigger v-if="setting.showMessage" />
      <WeatherTrigger v-if="setting.showWeather" />
      <SettingTrigger />
      <UserTrigger />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { on, off } from '@/utils/util'
import Breadcrumb from './breadcrumb/Breadcrumb.vue'
import SearchTrigger from './search/Search.vue'
import WeatherTrigger from './weather/Weather.vue'
import MessageTrigger from './message/Message.vue'
import UserTrigger from './user/User.vue'
import SettingTrigger from './setting/Setting.vue'
import { useStore } from '@/store'

import { useTheme } from '@/hooks/theme'

const { appStore, storeToRefs } = useStore()
const { searchVisible } = storeToRefs(appStore)
const { setting } = useTheme()

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
      }
    }
  }
  .center-side {
    display: flex;
    align-items: center;
    flex: 1;
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
          background-color: var(--v-g-fill-color-2);
        }
      }
    }
  }
}
</style>
