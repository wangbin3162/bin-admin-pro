import { useVueFlow, MarkerType } from '@vue-flow/core'
import { computed } from 'vue'
import { Message } from 'bin-ui-design'

// 连线hooks
export default function useEdges() {
  const { addEdges, removeEdges, nodesDraggable, nodesConnectable, toObject } = useVueFlow()

  // 连线连接
  function onConnect(params) {
    // console.log('on connect', params)
    const isTarget = validConnect(params)
    if (!isTarget) return
    addEdges({
      ...params,
      animated: true,
      style: { stroke: '#b1b1b7', strokeWidth: 2 },
      markerEnd: MarkerType.Arrow,
      type: 'button',
    })
  }

  // 判断是否可以进行连接
  function validConnect(params) {
    const { edges } = toObject()
    const { source, sourceHandle, target, targetHandle } = params
    // console.log(params, edges)
    // console.log(sourceHandle + '----' + targetHandle)
    // 如果开始节点直接连到结束节点。
    if (sourceHandle === '_StartA_source_' && targetHandle === '_EndA_target_') return false
    // 如果判断source或者target的连接点，已经在线中存在，则也需要跳过
    if (
      edges.findIndex(i => i.source === source && i.sourceHandle === sourceHandle) > -1 ||
      edges.findIndex(i => i.target === target && i.targetHandle === targetHandle) > -1
    ) {
      Message.error({ message: '已经存在连线，请勿重复设置!' })
      return false
    }
    // 判断目标节点的targetHandle，是否包含_target_字符标识，是目标handle，否则不允许增加连线
    return targetHandle.includes('_target_')
  }

  // 是否不可交互
  const isNotInteractive = computed(() => !nodesDraggable.value && !nodesConnectable.value)

  return {
    onConnect,
    removeEdges,
    isNotInteractive,
    nodesDraggable,
    nodesConnectable,
  }
}
