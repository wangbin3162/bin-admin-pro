export default [
  {
    name: 'Flow',
    title: '流程编排',
    icon: 'apartment',
    children: [
      {
        name: 'GraphEasyFlow',
        title: 'EasyFlow',
        component: () => import('@/views/demo/flow/easy-flow/index.vue'),
      },
      {
        name: 'VueFlowBasic',
        title: 'VueFlowBasic',
        component: () => import('@/views/demo/flow/vue-flow-basic/index.vue'),
      },
      {
        name: 'VueFlowAdvance',
        title: 'VueFlowAdvance',
        component: () => import('@/views/demo/flow/vue-flow-advance/index.vue'),
      },
    ],
  },
]
