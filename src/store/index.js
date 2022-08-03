import { createPinia, storeToRefs } from 'pinia'
import piniaPlugin from './pinia-plugin'

import useApp from './modules/app'
import useUser from './modules/user'
import useMenu from './modules/menu'
import useLinks from './modules/links'
import useTags from './modules/tags'
import useTodoList from './modules/todolist'

// 注册store及插件信息
export function setupStore(app) {
  const store = createPinia()
  store.use(
    piniaPlugin({
      key: 'store',
      paths: ['links', 'todolist'],
    }),
  )
  app.use(store)
  useApp().loadApp()
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
