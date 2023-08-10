export function getImageUrl(name) {
  return new URL(`../../../../assets/images/effects/${name}`, import.meta.url).href
}
