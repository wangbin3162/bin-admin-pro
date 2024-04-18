import { useVueFlow } from '@vue-flow/core'
import { MessageBox } from 'bin-ui-design'
import { computed } from 'vue'
// nodes hooks
export default function useNodes() {
  const { removeNodes, getSelectedNodes, nodesDraggable, nodesConnectable } = useVueFlow()

  function deleteNode(node) {
    MessageBox.confirm({
      type: 'error',
      title: '删除提示',
      message: '确认删除该节点？',
    })
      .then(() => {
        removeNodes(node.id, true)
      })
      .catch(() => {})
  }

  // 判断当前节点是否选中
  function isNodeSelected(node) {
    return getSelectedNodes.value.findIndex(i => i.id === node.id) > -1
  }
  // 是否不可交互
  const isNotInteractive = computed(() => !nodesDraggable.value && !nodesConnectable.value)

  return { deleteNode, isNodeSelected, isNotInteractive }
}
