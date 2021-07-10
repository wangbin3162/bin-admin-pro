import { fetchData } from './base'

// 获取基础部门树
export function getDepartTree() {
  return fetchData({
    url: '/depart/tree',
    method: 'get'
  })
}
