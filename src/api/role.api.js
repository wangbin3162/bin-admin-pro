// 获取基础列表
import { fetchData } from '@/api/base'

export function getRoleEnum() {
  return fetchData({
    url: '/role/enum',
    method: 'get'
  })
}
