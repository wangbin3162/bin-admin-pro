import { deepCopy } from '@/utils/util'

const responseBody = {
  message: '',
  timestamp: 0,
  data: null,
  code: '0'
}

// 返回装配器，data为结果data，message为返回消息
export const builder = (data, message, code = '0', headers = {}) => {
  const body = deepCopy(responseBody)
  body.data = data
  if (message !== undefined && message !== null) {
    body.message = message
  }
  if (code !== '0') {
    body.code = code
    body._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    body._headers = headers
  }
  body.timestamp = new Date().getTime()
  return body
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
