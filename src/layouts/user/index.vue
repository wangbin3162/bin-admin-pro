<template>
  <b-dropdown @command="handleClick" append-to-body>
    <div class="dropdown-trigger">
      <b-icon name="user" size="20"></b-icon>&nbsp;
      <span v-if="userInfo">你好,{{ userInfo.realName }}</span>
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
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'UserAvatar',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userInfo = computed(() => store.getters.userInfo)

    function handleClick(name) {
      if (name === 'logout') {
        MessageBox.confirm({
          type: 'warning',
          title: '提示',
          message: '确认退出登录吗？'
        }).then(() => {
          store.dispatch('clearToken')
          router.push(`/login?redirect=${route.fullPath}`)
        }).catch(e => {
        })
      }
    }

    return { userInfo, handleClick }
  }
}
</script>

<style scoped lang="stylus">
.dropdown-trigger {
  display: flex;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  align-items: center;
  outline: none;
  transition: background-color .2s;
  .b-iconfont {
    font-size: 18px;
    color: rgba(0, 0, 0, .85);
  }
  &:hover {
    background-color: #f6f6f6;
  }
}
</style>
