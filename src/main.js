import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { registerUI } from '@/plugins/bin-ui'
import './mock' // mock
import './assets/stylus/index.styl'
import { registerEditor } from '@/plugins/bin-ace-editor'

const app = createApp(App)
registerUI(app)
registerEditor(app)
setupRouter(app)
setupStore(app)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
