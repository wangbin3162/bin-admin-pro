export default [
  {
    path: 'baseDetail',
    name: 'BaseDetail',
    component: () => import(/* webpackChunkName: "BaseDetail" */ '../../views/demo/detail/base-detail'),
    meta: { title: '基础详情' }
  },
  {
    path: 'advancedDetail',
    name: 'AdvancedDetail',
    component: () => import(/* webpackChunkName: "AdvancedDetail" */ '../../views/demo/detail/advanced-detail'),
    meta: { title: '高级详情' }
  }
]
