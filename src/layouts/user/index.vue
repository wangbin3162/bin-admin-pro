<template>
  <b-dropdown @command="handleClick" append-to-body>
    <div class="global-header-avatar-trigger">
      <img src="@/assets/images/avatar/avatar05.jpeg" class="avatar" alt="avatar">
      <span v-if="userInfo">{{ userInfo.realName }}</span>
    </div>
    <template #dropdown>
      <b-dropdown-menu style="width: 120px;">
        <b-dropdown-item name="userCenter">
          <div flex="cross:center">
            <b-icon name="user" size="16"></b-icon>
            <span class="ml-5">用户中心</span>
          </div>
        </b-dropdown-item>
        <b-dropdown-item name="logout">
          <div flex="cross:center">
            <b-icon name="logout" size="16"></b-icon>
            <span class="ml-5">注销登录</span>
          </div>
        </b-dropdown-item>
      </b-dropdown-menu>
    </template>
  </b-dropdown>
</template>

<script>
import { MessageBox, Message } from 'bin-ui-next'
import { computed } from 'vue'
import useStoreRouter from '@/hooks/store/useStoreRouter'

export default {
  name: 'UserAvatar',
  setup() {
    const { $store } = useStoreRouter()
    const userInfo = computed(() => $store.state.user.userInfo)

    return { userInfo }
  },
  methods: {
    handleClick(name) {
      if (name === 'userCenter') {
        this.$router.push('/userCenter')
      }
      if (name === 'logout') {
        this.$confirm({
          type: 'warning',
          title: '提示',
          message: '确认退出登录吗？',
        }).then(() => {
          this.$store.dispatch('user/clearToken')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }).catch(e => {
        })
      }
    },
  },
}
</script>
