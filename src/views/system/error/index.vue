<template>
  <div class="system-error-page">
    <div class="bin-result">
      <div class="bin-result-icon bin-result-image" v-if="isErrorPage">
        <component :is="`error${status}`"></component>
      </div>
      <div v-else class="bin-result-icon bin-result-icon-error">
        <Error404 v-if="$route.path!=='/error'"></Error404>
        <b-icon v-else name="close-circle-fill"></b-icon>
      </div>
      <div class="bin-result-title">{{ status }}</div>
      <div class="bin-result-subtitle">{{ errorMessage }}</div>
      <div class="bin-result-extra">
        <b-space>
          <b-button background @click="$router.back()">返回上级</b-button>
          <router-link :to="{path:HOME_PATH}">
            <b-button type="primary">返回首页</b-button>
          </router-link>
        </b-space>
      </div>
    </div>
  </div>
</template>

<script>
import Error403 from './Error403'
import Error404 from './Error404'
import Error500 from './Error500'
import useStoreRouter from '@/hooks/store/useStoreRouter'
import { computed, onMounted, ref } from 'vue'
import { ERROR_PATH_LIST, HOME_PATH } from '@/router/menus'

/**
 * 通用异常页面，可根据 ERROR_PATH_LIST 默认异常页面列表配置信息，
 * path：路由的默认path即为状态码信息，如非404之类的错误信息，直接push到对应的path（如401）即可
 * message：默认会从query中取message的错误消息，如没有则去查找默认，再没有即为空
 */
export default {
  name: 'ErrorPage',
  components: { Error403, Error404, Error500 },
  setup() {
    // 此代码根据ERROR_PATH_LIST错误路由列表映射而来，如后缀了message，query，则默认先显示对应错误
    const errorNormalMsg = {
      403: '抱歉，您无权访问此页面！',
      404: '抱歉，你访问的页面不存在！',
      500: '抱歉，服务器出错了！'
    }
    const { $route } = useStoreRouter()

    const status = ref('')
    const errorMessage = ref('')

    const isErrorPage = computed(() => ERROR_PATH_LIST.includes($route.path.slice(1)))

    function init() {
      const path = $route.path.slice(1)
      const message = $route.query.message
      // 如果是预定义的错误页面
      if (isErrorPage.value) {
        status.value = path.toUpperCase()
        errorMessage.value = message || errorNormalMsg[path]
      } else if (path === 'error') { // 通用的错误页面
        status.value = path
        errorMessage.value = message
      } else { // 非通用页面的其他错误页面
        status.value = '404'
        errorMessage.value = '抱歉，你访问的页面不存在！'
      }
    }

    init()
    return {
      status,
      errorMessage,
      isErrorPage,
      HOME_PATH
    }
  }
}
</script>

<style lang="stylus">
.system-error-page {
  .bin-result {
    padding: 48px 32px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .bin-result-icon {
    margin-bottom: 24px;
    text-align: center;
  }
  .bin-result-icon.bin-result-icon-error {
    display: inline-block;
    border-radius: 50%;
    margin-bottom: 24px;
    i {
      font-size: 82px;
      color: #f5222d;
    }
  }

  .bin-result-image {
    width: 250px;
    height: 295px;
  }
  .bin-result-title {
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 500;
    font-size: 28px;
    line-height: 32px;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  .bin-result-subtitle {
    margin-bottom: 24px;
    color: #808695;
    font-size: 16px;
    line-height: 22px;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.1s;
    animation-fill-mode: forwards;
  }
  .bin-result-extra {
    margin-top: 26px;
    text-align: center;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
  }

}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
