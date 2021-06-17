export default [
  {
    path: 'error401',
    name: 'Error401',
    component: () => import('../../views/system/error/Error401'),
    meta: { title: '异常页401' }
  },
  {
    path: 'error403',
    name: 'Error403',
    component: () => import('../../views/system/error/Error403'),
    meta: { title: '异常页403' }
  },
  {
    path: 'error404',
    name: 'Error404',
    component: () => import('../../views/system/error/Error404'),
    meta: { title: '异常页404' }
  },
  {
    path: 'error500',
    name: 'Error500',
    component: () => import('../../views/system/error/Error500'),
    meta: { title: '异常页500' }
  }
]
