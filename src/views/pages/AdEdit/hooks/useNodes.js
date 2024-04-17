import { useVueFlow } from '@vue-flow/core'
import { MessageBox } from 'bin-ui-design'
// nodes hooks
export default function useNodes() {
  const { removeNodes, getSelectedNodes } = useVueFlow()

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

  return { deleteNode, isNodeSelected }
}
