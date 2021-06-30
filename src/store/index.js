import { createStore, createLogger } from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

const debug = process.env.NODE_ENV !== 'production'
const store = createStore({
  getters,
  modules: { app, user, permission, tagsView },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export function setupStore(app) {
  app.use(store)
}

export default store
