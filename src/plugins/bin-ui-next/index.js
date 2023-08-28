import BinUI, { Utils } from 'bin-ui-next'
import { BConfigProvider } from './config-provider'
import { BLayout } from './layout'
import config from '../../../package.json'

export function registerUI(app) {
  app.use(BinUI, { disabledDoc: true }) // ,{ disabledDoc: true }
  app.component(BConfigProvider.name, BConfigProvider)
  app.component(BLayout.name, BLayout)
  Utils.log.printVersion(config.name, config.version, `【${config.description}】`)
}
