export default [
  {
    path: 'baseList',
    name: 'BaseList',
    component: () => import(/* webpackChunkName: "BaseList" */ '../../views/demo/list/base-list'),
    meta: { title: '基础列表' }
  },
  {
    path: 'cardList',
    name: 'CardList',
    component: () => import(/* webpackChunkName: "CardList" */ '../../views/demo/list/card-list'),
    meta: { title: '卡片列表' }
  },
  {
    path: 'userList',
    name: 'UserList',
    component: () => import(/* webpackChunkName: "UserList" */ '../../views/demo/list/user-list'),
    meta: { title: '用户列表' }
  },
  {
    path: 'searchList',
    name: 'SearchList',
    component: () => import(/* webpackChunkName: "SearchList" */ '../../views/demo/list/search-list'),
    meta: { title: '查询列表' }
  }
]
