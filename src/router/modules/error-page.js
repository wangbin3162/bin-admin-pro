export default [
  {
    path: 'error403',
    name: 'Error403',
    component: () => import(/* webpackChunkName: "Error403" */ '../../views/system/error/Error403'),
    meta: { title: '异常页403' }
  },
  {
    path: 'error404',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "Error404" */ '../../views/system/error/Error404'),
    meta: { title: '异常页404' }
  },
  {
    path: 'error500',
    name: 'Error500',
    component: () => import(/* webpackChunkName: "Error500" */ '../../views/system/error/Error500'),
    meta: { title: '异常页500' }
  }
]
