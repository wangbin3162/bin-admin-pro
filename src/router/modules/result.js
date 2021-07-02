export default [
  {
    path: 'success',
    name: 'Success',
    component: () => import('../../views/result/success'),
    meta: { title: '成功页' }
  },
  {
    path: 'fail',
    name: 'Fail',
    component: () => import('../../views/result/fail'),
    meta: { title: '失败页' }
  }
]
