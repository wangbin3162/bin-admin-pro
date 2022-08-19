export default [
  {
    path: 'basic',
    name: 'Basic',
    component: () => import('@/views/demo/comp/ui/basic.vue'),
    meta: { title: '基础组件' },
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import('@/views/demo/comp/ui/nav-comp.vue'),
    meta: { title: '导航组件' },
  },
  {
    path: 'navComp',
    name: 'NavComp',
    component: () => import('@/views/demo/comp/ui/nav-comp.vue'),
    meta: { title: '导航组件' },
  },
  {
    path: 'formComp',
    name: 'FormComp',
    component: () => import('@/views/demo/comp/ui/form-comp.vue'),
    meta: { title: '表单组件' },
  },
  {
    path: 'dataComp',
    name: 'DataComp',
    component: () => import('@/views/demo/comp/ui/data-comp.vue'),
    meta: { title: '数据组件' },
  },
  {
    path: 'otherComp',
    name: 'OtherComp',
    component: () => import('@/views/demo/comp/ui/other-comp.vue'),
    meta: { title: '其他组件' },
  },
  {
    path: 'compCountTo',
    name: 'CompCountTo',
    component: () => import('@/views/demo/comp/comp-count-to.vue'),
    meta: { title: '数字动画' },
  },
  {
    path: 'compIconfont',
    name: 'CompIconfont',
    component: () => import('@/views/demo/comp/comp-iconfont.vue'),
    meta: { title: '图标字体' },
  },
  {
    path: 'compAutoInput',
    name: 'CompAutoInput',
    component: () => import('@/views/demo/comp/comp-auto-input.vue'),
    meta: { title: '输入建议' },
  },
  {
    path: 'compSvgLoading',
    name: 'CompSvgLoading',
    component: () => import('@/views/demo/comp/comp-svg-loading.vue'),
    meta: { title: 'Svg Loading' },
  },
]
