export default [
  {
    path: 'colorVar',
    name: 'ColorVar',
    component: () => import(/* webpackChunkName: "ColorVar" */ '../../views/demo/comp/color-var'),
    meta: { title: '主题颜色' }
  },
  {
    path: 'basic',
    name: 'Basic',
    component: () => import(/* webpackChunkName: "Basic" */ '../../views/demo/comp/ui/basic'),
    meta: { title: '基础组件' }
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import(/* webpackChunkName: "NavComp" */ '../../views/demo/comp/ui/nav-comp'),
    meta: { title: '导航组件' }
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import(/* webpackChunkName: "NavComp" */ '../../views/demo/comp/ui/nav-comp'),
    meta: { title: '导航组件' }
  },
  {
    path: 'formComp',
    name: 'FormComp',
    component: () => import(/* webpackChunkName: "FormComp" */ '../../views/demo/comp/ui/form-comp'),
    meta: { title: '表单组件' }
  },
  {
    path: 'dataComp',
    name: 'DataComp',
    component: () => import(/* webpackChunkName: "DataComp" */ '../../views/demo/comp/ui/data-comp'),
    meta: { title: '数据组件' }
  },
  {
    path: 'otherComp',
    name: 'OtherComp',
    component: () => import(/* webpackChunkName: "OtherComp" */ '../../views/demo/comp/ui/other-comp'),
    meta: { title: '其他组件' }
  },
  {
    path: 'compCountTo',
    name: 'CompCountTo',
    component: () => import(/* webpackChunkName: "CompCountTo" */ '../../views/demo/comp/comp-count-to'),
    meta: { title: '数字动画' }
  },
  {
    path: 'compIconfont',
    name: 'CompIconfont',
    component: () => import(/* webpackChunkName: "CompIconfont" */ '../../views/demo/comp/comp-iconfont'),
    meta: { title: '图标字体' }
  },
  {
    path: 'compSvgLoading',
    name: 'CompSvgLoading',
    component: () => import(/* webpackChunkName: "CompSvgLoading" */ '../../views/demo/comp/comp-svg-loading'),
    meta: { title: 'Svg Loading' }
  },
  {
    path: 'compTitleBar',
    name: 'CompTitleBar',
    component: () => import(/* webpackChunkName: "CompTitleBar" */ '../../views/demo/comp/comp-title-bar'),
    meta: { title: '数字动画' }
  },
  {
    path: 'compBaseTree',
    name: 'CompBaseTree',
    component: () => import(/* webpackChunkName: "CompBaseTree" */ '../../views/demo/comp/comp-base-tree'),
    meta: { title: '树结构' }
  },
  {
    path: 'compKeyValue',
    name: 'CompKeyValue',
    component: () => import(/* webpackChunkName: "CompKeyValue" */ '../../views/demo/comp/comp-key-value'),
    meta: { title: '映射配置' }
  }
]
