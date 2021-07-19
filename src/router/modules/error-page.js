export default [
  {
    path: 'error403',
    name: 'Error403',
    component: () => import(/* webpackChunkName: "Error403" */ '../../views/demo/error-page/error403'),
    meta: { title: '403页面' }
  },
  {
    path: 'error404',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "Error404" */ '../../views/demo/error-page/error404'),
    meta: { title: '404页面' }
  },
  {
    path: 'error500',
    name: 'Error500',
    component: () => import(/* webpackChunkName: "Error500" */ '../../views/demo/error-page/error500'),
    meta: { title: '500页面' }
  },
  {
    path: 'errorDemo',
    name: 'ErrorDemo',
    component: () => import(/* webpackChunkName: "ErrorDemo" */ '../../views/demo/error-page/demo'),
    meta: { title: '异常触发页面' }
  }
]
