export default [
  {
    path: 'baseList',
    name: 'BaseList',
    component: () => import('@/views/demo/pages/list/base-list.vue'),
    meta: { title: '基础列表' },
  },
  {
    path: 'cardList',
    name: 'CardList',
    component: () => import('@/views/demo/pages/list/card-list.vue'),
    meta: { title: '卡片列表' },
  },
  {
    path: 'userList',
    name: 'UserList',
    component: () => import('@/views/demo/pages/list/user-list.vue'),
    meta: { title: '用户列表' },
  },
  {
    path: 'searchList',
    name: 'SearchList',
    component: () => import('@/views/demo/pages/list/search-list.vue'),
    meta: { title: '查询列表' },
  },
]
