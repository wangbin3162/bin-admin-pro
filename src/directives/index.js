import Focus from './focus'
import FlowDrag from './flow-drag'

const directives = [Focus, FlowDrag]

export function registerDirectives(app) {
  directives.forEach(plugin => {
    app.use(plugin)
  })
}
