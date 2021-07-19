export default [
  {
    path: 'baseForm',
    name: 'BaseForm',
    component: () => import(/* webpackChunkName: "BaseForm" */ '../../views/demo/form/base-form'),
    meta: { title: '基础表单' }
  },
  {
    path: 'stepForm',
    name: 'StepForm',
    component: () => import(/* webpackChunkName: "StepForm" */ '../../views/demo/form/step-form'),
    meta: { title: '分步表单' }
  },
  {
    path: 'advancedForm',
    name: 'AdvancedForm',
    component: () => import(/* webpackChunkName: "AdvancedForm" */ '../../views/demo/form/advanced-form'),
    meta: { title: '高级表单', noCache: true }
  }
]
