import BinUI from 'bin-ui-next'
import TitleBar from './VTitleBar'

const compList = [TitleBar]

/**
 * 注册全局组件，外部引入的第三方组件也在此引入
 * @param app
 */
export function registerGlobComp (app) {
  app.use(BinUI)
  compList.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
