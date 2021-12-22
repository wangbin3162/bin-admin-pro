// env 配置数据

export const IS_PROD = process.env.NODE_ENV === 'production'

export const IS_DEV = !IS_PROD

export const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH

// 拼接publicPath
export function getPublicPath(path) {
  return IS_PROD ? `${PUBLIC_PATH}${path}` : path
}

// 拼接cdnPath
export function getCDNPath(path) {
  return `${import.meta.env.VITE_APP_CDN}${path}`
}
