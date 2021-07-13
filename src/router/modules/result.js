export default [
  {
    path: 'success',
    name: 'Success',
    component: () => import(/* webpackChunkName: "Success" */ '../../views/result/success'),
    meta: { title: '成功页' }
  },
  {
    path: 'fail',
    name: 'Fail',
    component: () => import(/* webpackChunkName: "Fail" */ '../../views/result/fail'),
    meta: { title: '失败页' }
  }
]
