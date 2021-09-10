export default [
  {
    path: 'pivotDemo',
    name: 'PivotDemo',
    component: () => import('@/views/demo/graph/pivot-demo/pivot-demo.vue'),
    meta: { title: '交叉表' },
  },
  {
    path: 'LinkNodeDemo',
    name: 'LinkNodeDemo',
    component: () => import('@/views/demo/graph/link-node-demo/link-node-demo.vue'),
    meta: { title: '连接节点' },
  },
]
