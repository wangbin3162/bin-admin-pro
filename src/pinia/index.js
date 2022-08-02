import { createPinia, storeToRefs } from 'pinia'
import useApp from './app'
import useUser from './user'
import useMenu from './menu'
import useLinks from './links'
import useTags from './tags'
import useTodoList from './todolist'
import piniaPlugin from './pinia-plugin'

// 注册store及插件信息
export function setupStore1(app) {
  const store = createPinia()
  store.use(
    piniaPlugin({
      paths: ['links', 'todolist'],
    }),
  )
  app.use(store)
}

// 统一的store获取
export function useStore() {
  return {
    storeToRefs,
    appStore: useApp(),
    userStore: useUser(),
    menuStore: useMenu(),
    tagsStore: useTags(),
    linksStore: useLinks(),
    todolistStore: useTodoList(),
  }
}
