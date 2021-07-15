export default [
  {
    path: 'errorDemo',
    name: 'ErrorDemo',
    component: () => import(/* webpackChunkName: "ErrorDemo" */ '../../views/system/error/demo'),
    meta: { title: '异常触发页面' }
  }
]
