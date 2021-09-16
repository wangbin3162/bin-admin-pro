export default [
  {
    path: 'pivotDemo',
    name: 'PivotDemo',
    component: () => import('@/views/demo/graph/pivot-demo/index.vue'),
    meta: { title: '交叉表' },
  },
  {
    path: 'linkNodeDemo',
    name: 'LinkNodeDemo',
    component: () => import('@/views/demo/graph/link-node-demo/index.vue'),
    meta: { title: '连接节点' },
  },
  {
    path: 'DatasetDemo',
    name: 'DatasetDemo',
    component: () => import('@/views/demo/graph/dataset-demo/index.vue'),
    meta: { title: '数据集' },
  },
]
