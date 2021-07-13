export default [
  {
    path: 'colorVar',
    name: 'ColorVar',
    component: () => import(/* webpackChunkName: "ColorVar" */ '../../views/comp/color-var'),
    meta: { title: '主题颜色' }
  },
  {
    path: 'basic',
    name: 'Basic',
    component: () => import(/* webpackChunkName: "Basic" */ '../../views/comp/ui/basic'),
    meta: { title: '基础组件' }
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import(/* webpackChunkName: "NavComp" */ '../../views/comp/ui/nav-comp'),
    meta: { title: '导航组件' }
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import(/* webpackChunkName: "NavComp" */ '../../views/comp/ui/nav-comp'),
    meta: { title: '导航组件' }
  },
  {
    path: 'formComp',
    name: 'FormComp',
    component: () => import(/* webpackChunkName: "FormComp" */ '../../views/comp/ui/form-comp'),
    meta: { title: '表单组件' }
  },
  {
    path: 'dataComp',
    name: 'DataComp',
    component: () => import(/* webpackChunkName: "DataComp" */ '../../views/comp/ui/data-comp'),
    meta: { title: '数据组件' }
  },
  {
    path: 'otherComp',
    name: 'OtherComp',
    component: () => import(/* webpackChunkName: "OtherComp" */ '../../views/comp/ui/other-comp'),
    meta: { title: '其他组件' }
  },
  {
    path: 'compCountTo',
    name: 'CompCountTo',
    component: () => import(/* webpackChunkName: "CompCountTo" */ '../../views/comp/comp-count-to'),
    meta: { title: '数字动画' }
  },
  {
    path: 'compIconfont',
    name: 'CompIconfont',
    component: () => import(/* webpackChunkName: "CompIconfont" */ '../../views/comp/comp-iconfont'),
    meta: { title: '图标字体' }
  },
  {
    path: 'compTitleBar',
    name: 'CompTitleBar',
    component: () => import(/* webpackChunkName: "CompTitleBar" */ '../../views/comp/comp-title-bar'),
    meta: { title: '数字动画' }
  },
  {
    path: 'compBaseTree',
    name: 'CompBaseTree',
    component: () => import(/* webpackChunkName: "CompBaseTree" */ '../../views/comp/comp-base-tree'),
    meta: { title: '树结构' }
  }
]
