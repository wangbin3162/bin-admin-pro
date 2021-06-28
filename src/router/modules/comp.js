export default [
  {
    path: 'basic',
    name: 'Basic',
    component: () => import('../../views/comp/basic'),
    meta: { title: '主题颜色' }
  },
  {
    path: 'colorVar',
    name: 'ColorVar',
    component: () => import('../../views/comp/color-var'),
    meta: { title: '基础颜色' }
  }
]
