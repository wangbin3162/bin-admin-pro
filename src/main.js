import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/pinia'
import { registerDirectives } from '@/directives'
import { registerUI } from '@/plugins/bin-ui-design'
import { registerCharts } from '@/plugins/bin-charts-next'
import { registerEditor } from '@/plugins/bin-editor-next'
import { registerCommonComps } from '@/components/Common/index'

import 'bin-ui-design/dist/styles/index.css'
import '@/assets/styles/index.css' // 项目样式

/**
 * mock 模块
 * 注意：线上版本需要首先移除mock模块再进行调试，切记切记！！！
 */
// if (process.env.NODE_ENV !== 'production') {
// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
import './mock'
// }

const app = createApp(App)
registerDirectives(app)
registerUI(app)
registerCharts(app)
registerEditor(app)
setupRouter(app)
setupStore(app)
registerCommonComps(app)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
