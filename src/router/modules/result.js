export default [
  {
    path: 'success',
    name: 'Success',
    component: () => import('@/views/demo/pages/result/success.vue'),
    meta: { title: '成功页' },
  },
  {
    path: 'fail',
    name: 'Fail',
    component: () => import('@/views/demo/pages/result/fail.vue'),
    meta: { title: '失败页' },
  },
]
