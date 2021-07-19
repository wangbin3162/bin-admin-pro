export default [
  {
    path: 'success',
    name: 'Success',
    component: () => import(/* webpackChunkName: "Success" */ '../../views/demo/result/success'),
    meta: { title: '成功页' }
  },
  {
    path: 'fail',
    name: 'Fail',
    component: () => import(/* webpackChunkName: "Fail" */ '../../views/demo/result/fail'),
    meta: { title: '失败页' }
  }
]
