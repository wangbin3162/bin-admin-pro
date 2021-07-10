import Mock from 'mockjs'
import { builder } from '@/mock/util'
import roles from '@/mock/list/roles'

Mock.mock(/\/role\/enum/, 'get', () => builder({
  admin: '管理员',
  user: '普通用户',
  op: '实施人员'
}))
Mock.mock(/\/role\/list/, 'get', () => builder(roles))
