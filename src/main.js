import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { registerUI } from '@/plugins/bin-ui'
import { registerEditor } from '@/plugins/bin-ace-editor'
import { registerCharts } from '@/plugins/bin-charts'
import { registerGlobComp } from '@/components/registerGlobComp'
import './mock' // mock
import 'bin-ui-next/lib/styles/normalize.css' // 初始化样式
import 'bin-ui-next/lib/styles/index.css' // 组件库样式
import './assets/stylus/index.styl' // 项目样式

const app = createApp(App)
registerUI(app)
registerEditor(app)
registerCharts(app)
registerGlobComp(app)
setupRouter(app)
setupStore(app)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
