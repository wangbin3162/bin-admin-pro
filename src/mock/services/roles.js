import Mock from 'mockjs'
import { builder } from '@/mock/util'

Mock.mock(/\/role\/enum/, 'get', () => builder({
  admin: '管理员',
  user: '普通用户',
  op: '实施人员'
}))
