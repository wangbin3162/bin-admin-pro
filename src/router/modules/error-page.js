export default [
  {
    path: 'error403',
    name: 'Error403',
    component: () => import('@/views/demo/error-page/error403.vue'),
    meta: { title: '403页面' }
  },
  {
    path: 'error404',
    name: 'Error404',
    component: () => import('@/views/demo/error-page/error404.vue'),
    meta: { title: '404页面' }
  },
  {
    path: 'error500',
    name: 'Error500',
    component: () => import('@/views/demo/error-page/error500.vue'),
    meta: { title: '500页面' }
  },
  {
    path: 'errorDemo',
    name: 'ErrorDemo',
    component: () => import('@/views/demo/error-page/demo.vue'),
    meta: { title: '异常触发页面' }
  }
]
