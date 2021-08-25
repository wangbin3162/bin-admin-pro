<template>
  <header class="layout-header" :class="{'fixed-header':fixedHeader}" :style="fixedHeaderStyle">
    <div v-show="!contentFull" class="global-header" :class="{'has-border':showTagsView}">
      <div class="global-header-left">
        <header-trigger :icon="sidebar?'outdent':'indent'" size="18px" @click="toggleSidebar" />
        <header-breadcrumb />
      </div>
      <div class="global-header-right">
        <search v-if="showSearch" />
        <message v-if="showMessage" />
        <weather v-if="showWeather" />
        <user-avatar />
        <setting />
      </div>
    </div>
    <tags-view v-if="showTagsView" />
  </header>
</template>

<script>
import useSetting from '@/hooks/store/useSetting'
import HeaderTrigger from '@/layouts/header-trigger'
import UserAvatar from '@/layouts/user'
import TagsView from '@/layouts/tags-view'
import Setting from '@/layouts/setting'
import HeaderBreadcrumb from '@/layouts/header-breadcrumb'
import Search from '@/layouts/search'
import Message from '@/layouts/message'
import Weather from '@/layouts/weather'

export default {
  name: 'GlobalHeader',
  components: { Weather, Message, Search, HeaderBreadcrumb, Setting, TagsView, UserAvatar, HeaderTrigger },
  setup() {
    const {
      sidebar,
      showTagsView,
      contentFull,
      fixedHeader,
      fixedHeaderStyle,
      toggleSidebar,
      showSearch,
      showMessage,
      showWeather
    } = useSetting()
    return {
      sidebar,
      showTagsView,
      fixedHeader,
      fixedHeaderStyle,
      toggleSidebar,
      showSearch,
      showMessage,
      showWeather,
      contentFull
    }
  }
}
</script>
