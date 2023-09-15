export default [
  {
    name: 'Excel',
    title: '填报管理',
    icon: 'fileprotect',
    children: [
      {
        name: 'DataList',
        title: '数据填报',
        component: () => import('@/views/demo/excel/data-list/index.vue'),
      },
      {
        name: 'ExcelList',
        title: '填报列表',
        component: () => import('@/views/demo/excel/excel-list/index.vue'),
      },
    ],
  },
]
