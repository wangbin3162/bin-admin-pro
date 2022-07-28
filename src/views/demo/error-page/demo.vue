<template>
  <page-container desc="通用异常处理，可以根据错误列表进行触发，也可以自定义错误跳转" bg>
    <b-space>
      <router-link :to="{ path: '403' }">
        <b-button background>触发403</b-button>
      </router-link>
      <router-link :to="{ path: '404' }">
        <b-button background>触发404</b-button>
      </router-link>
      <router-link :to="{ path: '500' }">
        <b-button background>触发500</b-button>
      </router-link>
      <router-link :to="{ path: '500', query: { message: '接口调用出错了！' } }">
        <b-button background>触发500 带消息</b-button>
      </router-link>
      <router-link :to="{ path: 'error', query: { message: '我是错误消息！' } }">
        <b-button background>通用错误页面</b-button>
      </router-link>
      <router-link :to="{ path: 'error', query: { status: '401', message: '调用失败，请检查请求接口！' } }">
        <b-button background>通用错误页面附加状态码</b-button>
      </router-link>
      <router-link :to="{ path: 'sss' }">
        <b-button background>随机不存在菜单路由</b-button>
      </router-link>
    </b-space>
  </page-container>
</template>

<script>
export default {
  name: 'ErrorDemo',
}
</script>
