import BinUI, { Utils } from 'bin-ui-next'
import { BConfigProvider } from './Config-provider'
import config from '../../../package.json'

export function registerUI(app) {
  app.use(BinUI, { disabledDoc: true }) // ,{ disabledDoc: true }
  app.component(BConfigProvider.name, BConfigProvider)
  Utils.log.printVersion(config.name, config.version, `【${config.description}】`)
}
