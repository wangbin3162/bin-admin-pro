<template>
  <b-dropdown @command="handleClick" append-to-body>
    <div class="header-trigger">
      <img src="@/assets/images/avatar.jpeg" class="trigger" alt="avatar" />
    </div>
    <template #dropdown>
      <b-dropdown-menu style="width: 120px">
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

<script setup>
import { MessageBox } from 'bin-ui-design'
import { useStore } from '@/pinia'
import { useRouter, useRoute } from 'vue-router'

const { userStore } = useStore()
const router = useRouter()
const route = useRoute()

function handleClick(name) {
  if (name === 'userCenter') {
    router.push('/userCenter')
  }
  if (name === 'logout') {
    MessageBox.confirm({
      type: 'warning',
      title: '提示',
      message: '确认退出登录吗？',
    })
      .then(() => {
        userStore.clearToken()
        router.push(`/login?redirect=${route.fullPath}`)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
