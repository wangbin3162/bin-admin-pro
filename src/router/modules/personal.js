export default [
  {
    path: 'userCenter',
    name: 'UserCenter',
    component: () => import(/* webpackChunkName: "UserCenter" */ '../../views/demo/personal/user-center'),
    meta: { title: '个人中心' }
  },
  {
    path: 'userSetting',
    name: 'UserSetting',
    component: () => import(/* webpackChunkName: "UserSetting" */ '../../views/demo/personal/user-setting'),
    meta: { title: '个人设置' }
  }
]
