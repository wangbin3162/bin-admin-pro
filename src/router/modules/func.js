export default [
  {
    name: 'Func',
    title: '功能',
    icon: 'codepen',
    children: [
      {
        name: 'FuncDraggable',
        title: '拖拽排序',
        component: () => import('@/views/demo/functions/func-draggable.vue'),
      },
      {
        name: 'FuncKeyValue',
        title: '映射配置',
        component: () => import('@/views/demo/functions/func-key-value.vue'),
      },
      {
        name: 'FuncVueRepl',
        title: '线上解释交互器',
        component: () => import('@/views/demo/functions/func-vue-repl.vue'),
      },
      {
        name: 'FuncTitleBar',
        title: '标题组件',
        component: () => import('@/views/demo/functions/func-title-bar.vue'),
      },
      {
        name: 'FuncBaseTree',
        title: '树结构',
        component: () => import('@/views/demo/functions/func-base-tree.vue'),
      },
      {
        name: 'FuncService',
        title: '业务组件',
        component: () => import('@/views/demo/functions/func-service.vue'),
      },
      {
        name: 'FuncDynamicCode',
        title: '动态编码',
        component: () => import('@/views/demo/functions/func-dynamic-code.vue'),
      },
      {
        name: 'DynamicEffect',
        title: '动效',
        component: () => import('@/views/demo/functions/dynamic-effect/index.vue'),
      },
    ],
  },
]
