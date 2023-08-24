<template>
  <header
    class="layout-header"
    :class="{ 'fixed-header': setting.fixedHeader }"
    :style="fixedHeaderStyle"
  >
    <div
      v-show="!setting.contentFull"
      class="global-header"
      :class="{ 'has-border': setting.tagsView }"
    >
      <div class="global-header-left">
        <header-trigger
          v-if="setting.showCollapse"
          :icon="setting.sidebar ? 'outdent' : 'indent'"
          size="18px"
          @click="setting.sidebar = !setting.sidebar"
        />
        <div class="mixed-menu" v-if="setting.menuType === 'mixed'">
          <b-tabs
            v-model="topNavActive"
            :data="tabs"
            ref="tabsRef"
            @change="topNavMenuChange"
          ></b-tabs>
        </div>
        <header-breadcrumb v-else />
      </div>
      <div class="global-header-right">
        <search v-if="setting.showSearch" />
        <message v-if="setting.showMessage" />
        <weather v-if="setting.showWeather" />
        <user-avatar />
        <setting />
      </div>
    </div>
    <tags-view v-if="setting.tagsView" />
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import useApp from '@/hooks/store/useApp'
import useMenu from '@/hooks/store/useMenu'
import HeaderTrigger from '@/layouts/header-trigger/index.vue'
import UserAvatar from '@/layouts/user/index.vue'
import TagsView from '@/layouts/tags-view/index.vue'
import Setting from '@/layouts/setting/index.vue'
import HeaderBreadcrumb from '@/layouts/header-breadcrumb/index.vue'
import Search from '@/layouts/search/index.vue'
import Message from '@/layouts/message/index.vue'
import Weather from '@/components/Common/Weather/index.vue'

import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'GlobalHeader',
})
const route = useRoute()
const router = useRouter()

const { setting, fixedHeaderStyle } = useApp()
const { topMenuTabs, topNavActive, setTopNavActive, sideMenus } = useMenu()

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
      setTopNavActive(route.name)
      // 调用移动至目标标签
      tabsRef.value?.moveToCurrentTab()
    },
    { immediate: true, flush: true },
  )
})

function topNavMenuChange(navMenu) {
  const one = sideMenus.value[0]
  if (sideMenus.value && one) {
    //  有子项
    if (one.children?.length) {
      if (!one.children.externalLink) {
        router.push({ name: one.children[0].name })
      }
    } else {
      if (!one.externalLink) {
        router.push({ name: one.name })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.mixed-menu {
  padding: 0 24px;
  width: 720px;
  // border: 1px solid red;
  :deep(.bin-tabs-wrapper.default:after){
    content: unset;
  }
}
</style>
