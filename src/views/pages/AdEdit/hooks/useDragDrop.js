import { generateId } from '@/utils/util'
import { ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'

const state = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(null),
  isDragging: ref(false),
}
/**
 * 拖拽放置hooks
 */
export default function useDragDrop() {
  const { draggedType, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  // 如果正在拖拽，则禁用全部的鼠标选中
  watch(isDragging, dragging => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event, type) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  function onDragEnd() {
    isDragging.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  function onDragOver(event) {
    event.preventDefault()

    if (draggedType.value) {
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDrop(event) {
    // 降一个位置投射到viewport视窗中去
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })
    const nodeId = `flownode_${generateId()}`

    const newNode = {
      id: nodeId,
      type: draggedType.value,
      position,
      label: `[${nodeId}]`,
    }

    /**
     * 在放置后对齐节点位置，使其位于鼠标的中心
     *
     * 我们甚至可以在回调中钩入事件，并且可以在调用事件侦听器后删除它。
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, node => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2,
        },
      }))

      off()
    })

    addNodes(newNode)
  }

  return {
    draggedType,
    isDragging,
    onDragStart,
    onDragOver,
    onDrop,
  }
}
