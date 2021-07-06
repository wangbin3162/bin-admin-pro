<template>
  <b-dropdown @command="handleClick" append-to-body>
    <div class="global-header-avatar-trigger">
      <img src="@/assets/images/avatar/avatar05.jpeg" class="avatar" alt="avatar">
      <span v-if="userInfo">{{ userInfo.realName }}</span>
    </div>
    <template #dropdown>
      <b-dropdown-menu>
        <b-dropdown-item name="logout">
          <b-icon name="logout" size="16"></b-icon>&nbsp;
          <span style="vertical-align: middle;">注销登录</span></b-dropdown-item>
      </b-dropdown-menu>
    </template>
  </b-dropdown>
</template>

<script>
import { MessageBox } from 'bin-ui-next'
import { computed } from 'vue'
import useStoreRouter from '@/hooks/store/useStoreRouter'

export default {
  name: 'UserAvatar',
  setup() {
    const { $store, $router, $route } = useStoreRouter()
    const userInfo = computed(() => $store.state.user.userInfo)

    function handleClick(name) {
      if (name === 'logout') {
        MessageBox.confirm({
          type: 'warning',
          title: '提示',
          message: '确认退出登录吗？'
        }).then(() => {
          $store.dispatch('user/clearToken')
          $router.push(`/login?redirect=${$route.fullPath}`)
        }).catch(e => {
        })
      }
    }

    return { userInfo, handleClick }
  }
}
</script>
