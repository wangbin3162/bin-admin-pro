export default [
  {
    path: 'baseForm',
    name: 'BaseForm',
    component: () => import('@/views/demo/pages/form/base-form.vue'),
    meta: { title: '基础表单' },
  },
  {
    path: 'stepForm',
    name: 'StepForm',
    component: () => import('@/views/demo/pages/form/step-form.vue'),
    meta: { title: '分步表单' },
  },
  {
    path: 'advancedForm',
    name: 'AdvancedForm',
    component: () => import('@/views/demo/pages/form/advanced-form.vue'),
    meta: { title: '高级表单', noCache: true },
  },
]
