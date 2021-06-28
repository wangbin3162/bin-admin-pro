export default [
  {
    path: 'colorVar',
    name: 'ColorVar',
    component: () => import('../../views/comp/color-var'),
    meta: { title: '主题颜色' }
  },
  {
    path: 'basic',
    name: 'Basic',
    component: () => import('../../views/comp/ui/basic'),
    meta: { title: '基础组件' }
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import('../../views/comp/ui/nav-comp'),
    meta: { title: '导航组件' }
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import('../../views/comp/ui/nav-comp'),
    meta: { title: '导航组件' }
  },
  {
    path: 'formComp',
    name: 'FormComp',
    component: () => import('../../views/comp/ui/form-comp'),
    meta: { title: '表单组件' }
  },
  {
    path: 'dataComp',
    name: 'DataComp',
    component: () => import('../../views/comp/ui/data-comp'),
    meta: { title: '数据组件' }
  },
  {
    path: 'otherComp',
    name: 'OtherComp',
    component: () => import('../../views/comp/ui/other-comp'),
    meta: { title: '其他组件' }
  }
]
