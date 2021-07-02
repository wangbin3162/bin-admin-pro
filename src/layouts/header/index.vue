<template>
  <header class="layout-header" :class="{'fixed-header':fixedHeader}" :style="fixedHeaderStyle">
    <div class="global-header" :class="{'has-border':showTagsView}">
      <div class="global-header-left">
        <header-trigger :icon="sidebar?'outdent':'indent'" size="18px" @click="toggleSidebar" />
        <header-breadcrumb />
      </div>
      <div class="global-header-right">
        <search />
        <message />
        <user-avatar />
        <setting />
      </div>
    </div>
    <tags-view v-if="showTagsView" />
  </header>
</template>

<script>
import useSetting from '@/hooks/useSetting'
import HeaderTrigger from '@/layouts/header-trigger'
import UserAvatar from '@/layouts/user'
import TagsView from '@/layouts/tags-view'
import Setting from '@/layouts/setting'
import HeaderBreadcrumb from '@/layouts/header-breadcrumb'
import Search from '@/layouts/search'
import Message from '@/layouts/message'

export default {
  name: 'GlobalHeader',
  components: { Message, Search, HeaderBreadcrumb, Setting, TagsView, UserAvatar, HeaderTrigger },
  setup() {
    const { sidebar, showTagsView, fixedHeader, fixedHeaderStyle, toggleSidebar } = useSetting()
    return { sidebar, showTagsView, fixedHeader, fixedHeaderStyle, toggleSidebar }
  }
}
</script>
