import { createStore, createLogger } from 'vuex'
import app from './modules/app'
import menu from './modules/menu'

const debug = false // process.env.NODE_ENV !== 'production'
const store = createStore({
  modules: { app, menu },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export function setupStore(app) {
  app.use(store)
  store.dispatch('app/loadApp')
}

export default store
