export default [
  {
    path: 'baseForm',
    name: 'BaseForm',
    component: () => import('../../views/form/base-form'),
    meta: { title: '基础表单' }
  },
  {
    path: 'stepForm',
    name: 'StepForm',
    component: () => import('../../views/form/step-form'),
    meta: { title: '分步表单' }
  },
  {
    path: 'advancedForm',
    name: 'AdvancedForm',
    component: () => import('../../views/form/advanced-form'),
    meta: { title: '高级表单' }
  }
]