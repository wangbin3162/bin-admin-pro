export default [
  {
    path: 'baseDetail',
    name: 'BaseDetail',
    component: () => import('../../views/detail/base-detail'),
    meta: { title: '基础详情' }
  },
  {
    path: 'advancedDetail',
    name: 'AdvancedDetail',
    component: () => import('../../views/detail/advanced-detail'),
    meta: { title: '高级详情' }
  }
]
