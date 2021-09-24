export default [
  {
    path: 'pivotDemo',
    name: 'PivotDemo',
    component: () => import('@/views/demo/graph/pivot-demo/index.vue'),
    meta: { title: '交叉表' },
  },
  {
    path: 'datasetDemo',
    name: 'DatasetDemo',
    component: () => import('@/views/demo/graph/dataset-demo/index.vue'),
    meta: { title: '分析模型' },
  },
]
