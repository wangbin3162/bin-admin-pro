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
        name: 'GraphChartsMap',
        title: '关系图',
        component: () => import('@/views/demo/graph/charts-map/index.vue'),
      },
      {
        name: 'RelationChart',
        title: '资产地图',
        component: () => import('@/views/demo/graph/relation-chart/index.vue'),
      },
      {
        name: 'GraphCanvasDemo',
        title: 'Canvas绘图',
        component: () => import('@/views/demo/graph/canvas-demo/index.vue'),
      },
      {
        name: 'GraphSvgDemo',
        title: 'Svg基础',
        component: () => import('@/views/demo/graph/svg-demo/index.vue'),
      },
    ],
  },
]
