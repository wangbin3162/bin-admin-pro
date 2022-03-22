const files = import.meta.globEager('./*.js')

const modules = []

Object.keys(files).forEach(key => {
  modules.push(...files[key].default)
})

const routes = [...modules]

export default routes
