import { createStore, createLogger } from 'vuex'
import app from './modules/app'
import menu from './modules/menu'
import tagsView from './modules/tagsView'

const debug = false // process.env.NODE_ENV !== 'production'
const store = createStore({
  modules: { app, menu, tagsView },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export function setupStore(app) {
  app.use(store)
  store.dispatch('app/loadApp')
}

export default store
