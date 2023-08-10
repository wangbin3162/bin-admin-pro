export default [
  {
    path: 'funcColorVar',
    name: 'FuncColorVar',
    component: () => import('@/views/demo/functions/func-color-var.vue'),
    meta: { title: '主题颜色' },
  },
  {
    path: 'funcTitleBar',
    name: 'FuncTitleBar',
    component: () => import('@/views/demo/functions/func-title-bar.vue'),
    meta: { title: '数字动画' },
  },
  {
    path: 'funcBaseTree',
    name: 'FuncBaseTree',
    component: () => import('@/views/demo/functions/func-base-tree.vue'),
    meta: { title: '树结构' },
  },
  {
    path: 'funcDraggable',
    name: 'FuncDraggable',
    component: () => import('@/views/demo/functions/func-draggable.vue'),
    meta: { title: 'Draggable' },
  },
  {
    path: 'funcKeyValue',
    name: 'FuncKeyValue',
    component: () => import('@/views/demo/functions/func-key-value.vue'),
    meta: { title: '映射配置' },
  },
  {
    path: 'funcService',
    name: 'FuncService',
    component: () => import('@/views/demo/functions/func-service.vue'),
    meta: { title: '业务组件' },
  },
  {
    path: 'funcDynamicCode',
    name: 'FuncDynamicCode',
    component: () => import('@/views/demo/functions/func-dynamic-code.vue'),
    meta: { title: '动态编码' },
  },
  {
    path: 'funcTiptap',
    name: 'FuncTiptap',
    component: () => import('@/views/demo/functions/func-tiptap.vue'),
    meta: { title: '富文本编辑器' },
  },
  {
    path: 'dynamicEffect',
    name: 'DynamicEffect',
    component: () => import('@/views/demo/functions/dynamic-effect/index.vue'),
    meta: { title: '动效' },
  },
]
