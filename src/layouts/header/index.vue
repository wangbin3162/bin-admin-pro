<template>
  <header class="layout-header" :class="{'fixed-header':fixedHeader}" :style="fixedHeaderStyle">
    <div class="global-header">
      <div class="global-header-left">
        <header-trigger :icon="sidebar?'outdent':'indent'" @click="toggleSidebar" />
      </div>
      <div class="global-header-right">
        <user-avatar />
      </div>
    </div>
  </header>
</template>

<script>
import useSetting from '@/layouts/use-setting'
import HeaderTrigger from '@/layouts/header-trigger'
import UserAvatar from '@/layouts/user'

export default {
  name: 'GlobalHeader',
  components: { UserAvatar, HeaderTrigger },
  setup() {
    const { sidebar, fixedHeader, fixedHeaderStyle, toggleSidebar } = useSetting()
    return { sidebar, fixedHeader, fixedHeaderStyle, toggleSidebar }
  }
}
</script>

<style scoped lang="stylus">
.layout-header {
  transition: width .2s;
  flex: 0 0 auto;
  .global-header {
    display: flex;
    height: 48px;
    padding: 0;
    line-height: 48px;
    color: #fff;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
