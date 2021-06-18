import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

// 通用获取store 和 router
export default function useStoreRouter() {
  const $store = useStore()
  const mapGetter = () => $store.getters
  const mapState = () => $store.state

  const $router = useRouter()
  const $route = useRoute()
  return {
    $store,
    $router,
    $route,
    mapGetter,
    mapState
  }
}
