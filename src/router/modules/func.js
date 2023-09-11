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
        name: 'FuncTiptap',
        title: '富文本编辑器',
        component: () => import('@/views/demo/functions/func-tiptap.vue'),
      },
      {
        name: 'DynamicEffect',
        title: '动效',
        component: () => import('@/views/demo/functions/dynamic-effect/index.vue'),
      },
      {
        name: 'FuncLuckysheet',
        title: 'Excel编辑',
        component: () => import('@/views/demo/functions/luckysheet/index.vue'),
      },
    ],
  },
]
