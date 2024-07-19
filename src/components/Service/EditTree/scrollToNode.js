import { scrollTop } from '@/utils/util'

export function scrollToNode(node) {
  const scrollContainer = document.querySelector(`.edit-tree-container .edit-tree-content`)
  if (!scrollContainer) return
  if (node) {
    const targetNodeEl = document.querySelector(`.edit-tree-container .node_${node.parent}`)
    if (targetNodeEl) scrollTop(scrollContainer, scrollContainer.scrollTop, targetNodeEl.offsetTop)
  } else {
    scrollTop(scrollContainer, scrollContainer.scrollTop, scrollContainer.scrollHeight)
  }
}
