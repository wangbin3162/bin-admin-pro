import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupStore } from './store'
import BinUI from 'bin-ui-next'
// 样式
import 'bin-ui-next/lib/styles/index.css'
import './assets/stylus/index.styl'
// 全局组件
import { registerGlobComp } from './components/registerGlobComp'
// mock
import './mock'

const app = createApp(App)
app.use(BinUI)
registerGlobComp(app)
setupRouter(app)
setupStore(app)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
