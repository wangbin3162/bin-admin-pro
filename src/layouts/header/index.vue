<template>
  <header class="layout-header" :class="{ 'fixed-header': setting.fixedHeader }" :style="fixedHeaderStyle">
    <div v-show="!setting.contentFull" class="global-header" :class="{ 'has-border': setting.tagsView }">
      <div class="global-header-left">
        <header-trigger
          v-if="setting.showCollapse"
          :icon="setting.sidebar ? 'outdent' : 'indent'"
          size="18px"
          @click="setting.sidebar = !setting.sidebar"
        />
        <header-breadcrumb />
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

<script>
import useApp from '@/hooks/store/useApp'
import HeaderTrigger from '@/layouts/header-trigger/index.vue'
import UserAvatar from '@/layouts/user/index.vue'
import TagsView from '@/layouts/tags-view/index.vue'
import Setting from '@/layouts/setting/index.vue'
import HeaderBreadcrumb from '@/layouts/header-breadcrumb/index.vue'
import Search from '@/layouts/search/index.vue'
import Message from '@/layouts/message/index.vue'
import Weather from '@/components/Common/Weather/index.vue'

export default {
  name: 'GlobalHeader',
  components: {
    Weather,
    Message,
    Search,
    HeaderBreadcrumb,
    Setting,
    TagsView,
    UserAvatar,
    HeaderTrigger,
  },
  setup() {
    const { setting, fixedHeaderStyle } = useApp()
    return { setting, fixedHeaderStyle }
  },
}
</script>
