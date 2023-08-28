export default [
  {
    path: 'GraphPivotDemo',
    name: 'GraphPivotDemo',
    component: () => import('@/views/demo/graph/pivot-demo/index.vue'),
    meta: { title: '交叉表' },
  },
  {
    path: 'GraphEasyFlow',
    name: 'GraphEasyFlow',
    component: () => import('@/views/demo/graph/easy-flow/index.vue'),
    meta: { title: 'easy-flow' },
  },
  {
    path: 'GraphCanvasDemo',
    name: 'GraphCanvasDemo',
    component: () => import('@/views/demo/graph/canvas-demo/index.vue'),
    meta: { title: 'canvas绘图' },
  },
  {
    path: 'GraphSvgDemo',
    name: 'GraphSvgDemo',
    component: () => import('@/views/demo/graph/svg-demo/index.vue'),
    meta: { title: 'Svg基础' },
  },
  {
    path: 'GraphSchemaDemo',
    name: 'GraphSchemaDemo',
    component: () => import('@/views/demo/graph/schema-demo/schema-demo.vue'),
    meta: { title: '画布框选' },
  },
  {
    path: 'GraphChartsMap',
    name: 'GraphChartsMap',
    component: () => import('@/views/demo/graph/charts-map/index.vue'),
    meta: { title: '关系图' },
  },
]
