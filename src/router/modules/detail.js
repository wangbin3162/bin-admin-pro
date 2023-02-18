export default [
  {
    path: 'baseDetail',
    name: 'BaseDetail',
    component: () => import('@/views/demo/pages/detail/base-detail.vue'),
    meta: { title: '基础详情' },
  },
  {
    path: 'advancedDetail',
    name: 'AdvancedDetail',
    component: () => import('@/views/demo/pages/detail/advanced-detail.vue'),
    meta: { title: '高级详情' },
  },
]
