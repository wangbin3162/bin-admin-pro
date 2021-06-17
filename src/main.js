import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { registerUI } from '@/plugins/bin-ui'
import { registerGlobComp } from '@/components/registerGlobComp' // 全局组件
import './mock' // mock
import './assets/stylus/index.styl'

const app = createApp(App)
registerUI(app)
registerGlobComp(app)
setupRouter(app)
setupStore(app)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
