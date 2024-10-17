import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/pinia'
import { registerUI } from '@/plugins/bin-ui-design'
import { registerEditor } from '@/plugins/bin-editor-next'

import 'bin-ui-design/dist/styles/index.css'
import '@/assets/styles/index.css'

const app = createApp(App)

registerUI(app)
registerEditor(app)
setupRouter(app)
setupStore(app)

// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
