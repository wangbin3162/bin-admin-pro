export default [
  {
    path: 'baseDetail',
    name: 'BaseDetail',
    component: () => import(/* webpackChunkName: "BaseDetail" */ '../../views/detail/base-detail'),
    meta: { title: '基础详情' }
  },
  {
    path: 'advancedDetail',
    name: 'AdvancedDetail',
    component: () => import(/* webpackChunkName: "AdvancedDetail" */ '../../views/detail/advanced-detail'),
    meta: { title: '高级详情' }
  }
]
