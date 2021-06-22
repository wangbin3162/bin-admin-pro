<template>
  <header class="layout-header" :class="{'fixed-header':fixedHeader}" :style="fixedHeaderStyle">
    <div class="global-header" :style="{borderBottom:showTagsView?'1px solid #eee':'none'}">
      <div class="global-header-left">
        <header-trigger :icon="sidebar?'outdent':'indent'" @click="toggleSidebar" />
      </div>
      <div class="global-header-right">
        <user-avatar />
        <setting />
      </div>
    </div>
    <tags-view v-if="showTagsView" />
  </header>
</template>

<script>
import useSetting from '@/hooks/use-setting'
import HeaderTrigger from '@/layouts/header-trigger'
import UserAvatar from '@/layouts/user'
import TagsView from '@/layouts/tags-view'
import Setting from '@/layouts/setting'

export default {
  name: 'GlobalHeader',
  components: { Setting, TagsView, UserAvatar, HeaderTrigger },
  setup() {
    const { sidebar, showTagsView, fixedHeader, fixedHeaderStyle, toggleSidebar } = useSetting()
    return { sidebar, showTagsView, fixedHeader, fixedHeaderStyle, toggleSidebar }
  }
}
</script>
