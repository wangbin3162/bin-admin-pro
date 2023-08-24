import { createPinia, storeToRefs } from 'pinia'
import piniaPlugin from './pinia-plugin'

import useSetting from './modules/setting'
import useGlobal from './modules/global'
import useUser from './modules/user'
import useMenu from './modules/menu'
import useLinks from './modules/links'
import useTags from './modules/tags'
import useTodoList from './modules/todolist'

const store = createPinia()
// 注册store及插件信息
export function setupStore(app) {
  store.use(
    piniaPlugin({
      key: 'store',
      paths: ['links', 'todolist', 'setting'],
    }),
  )
  app.use(store)
}

// 统一的store获取
export function useStore() {
  return {
    storeToRefs,
    settingStore: useSetting(),
    userStore: useUser(),
    menuStore: useMenu(),
    tagsStore: useTags(),
    linksStore: useLinks(),
    todolistStore: useTodoList(),
    globalStore: useGlobal(),
  }
}

export { store }
