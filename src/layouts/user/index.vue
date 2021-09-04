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

  <b-modal v-model="confirm" width="420px" :show-close="false" append-to-body>
    <div class="p8">
      <div class="f-s-18" flex="cross:center">
        <b-icon name="info-circle" size="24" color="#fa8c16"></b-icon>
        <span class="ml-8">提示</span>
      </div>
      <p style="padding: 8px 0 8px 32px;">确认注销登录吗？</p>
      <div class="t-right">
        <b-button @click="confirm = false">取消</b-button>
        <b-button type="primary" @click="handleLogout">确定</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { computed, ref } from 'vue'
import useStoreRouter from '@/hooks/store/useStoreRouter'

export default {
  name: 'UserAvatar',
  setup() {
    const { $store, $router, $route } = useStoreRouter()
    const userInfo = computed(() => $store.state.user.userInfo)
    const confirm = ref(false)

    function handleClick(name) {
      if (name === 'userCenter') {
        $router.push('/userCenter')
      }
      if (name === 'logout') {
        confirm.value = true
      }
    }

    function handleLogout() {
      confirm.value = false
      $store.dispatch('user/clearToken')
      $router.push(`/login?redirect=${$route.fullPath}`)
    }

    return { userInfo, confirm, handleClick, handleLogout }
  },
}
</script>
