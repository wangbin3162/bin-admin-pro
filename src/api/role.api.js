// 获取基础列表
import { fetchData } from '@/api/base'

export function getRoleList() {
  return fetchData({
    url: '/role/list',
    method: 'get'
  })
}
