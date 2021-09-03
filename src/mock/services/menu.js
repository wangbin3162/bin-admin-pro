// 基础列表
import Mock from 'mockjs'
import { builder } from '@/mock/util'
import menus from '@/router/menus'

Mock.mock(/\/menu\/tree/, 'get', () => builder([{
  title: '系统菜单',
  path: 'root',
  expand: true,
  children: menus,
}]))
