export default [
  {
    name: 'Graph',
    title: '图形图表',
    icon: 'pointmap',
    children: [
      {
        name: 'GraphPivotDemo',
        title: '交叉表',
        component: () => import('@/views/demo/graph/pivot-demo/index.vue'),
      },
      {
        name: 'GraphSchemaDemo',
        title: '画布框选',
        component: () => import('@/views/demo/graph/schema-demo/schema-demo.vue'),
      },
      {
        name: 'GraphCanvasDemo',
        title: 'Canvas绘图',
        component: () => import('@/views/demo/graph/canvas-demo/index.vue'),
      },
    ],
  },
]
