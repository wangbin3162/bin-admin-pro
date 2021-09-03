/**
 * 获取动态图片路径, 默认为assets/images
 * @param url 需要以/开头标识路径
 */
export function getImageUrl(url) {
  return new URL(`../assets/images${url}`, import.meta.url).href
}
