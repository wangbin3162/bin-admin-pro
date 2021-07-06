import PageWrapper from './Page/PageWrapper'
import PageFooter from './Page/PageFooter'
import TitleBar from './TitleBar'
import Iconfont from './Iconfont/iconfont'
import Result from './Result'
import ArticleItem from './List/article-item'
import ImgItem from './List/img-item'
import AppItem from './List/app-item'

const compList = [
  PageWrapper,
  PageFooter,
  TitleBar,
  Iconfont,
  Result,
  ArticleItem,
  ImgItem,
  AppItem
]

/**
 * 注册全局组件，外部引入的第三方组件也在此引入
 * @param app
 */
export function registerGlobComp(app) {
  compList.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
