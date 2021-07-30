import { fetchData } from './request'

/*
 * 自定义枚举,主要提供不同的约定枚举值, 此处为示例，color和icon为可选
 * 前面为key值映射
 * 三个固定值
 *  MAPPING  中文映射
 *  COLOR: 颜色映射
 *  ICON: 对应图标映射
 */
export const STATUS = {
  ENABLE: 'Y',
  DISABLE: 'N',
  MAPPING: { Y: '启用', N: '禁用' },
  COLOR: { Y: 'primary', N: 'danger' },
  ICON: { Y: 'check', N: 'close' }
}

// 获取参数信息统一接口
export function getConfInfo(code) {
  return fetchData({
    url: '/management/conf/getConfInfo',
    method: 'post',
    data: { code }
  })
}
