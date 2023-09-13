export default [
  {
    name: 'Excel',
    title: '填报管理',
    icon: 'fileprotect',
    children: [
      {
        name: 'ExcelList',
        title: '填报列表',
        component: () => import('@/views/demo/excel/excel-list/index.vue'),
      },
    ],
  },
]
