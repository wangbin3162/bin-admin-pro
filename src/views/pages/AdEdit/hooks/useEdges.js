import { useVueFlow, MarkerType } from '@vue-flow/core'
// 连线hooks
export default function useEdges() {
  const { addEdges, removeEdges } = useVueFlow()

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
    const { sourceHandle, targetHandle } = params
    // console.log('validConnect', sourceHandle, targetHandle)
    // 如果开始节点直接连到结束节点。
    if (sourceHandle === '_StartA_source_' && targetHandle === '_EndA_target_') return false
    // 判断目标节点的targetHandle，是否包含_target_字符标识，是目标handle，否则不允许增加连线
    return targetHandle.includes('_target_')
  }

  return {
    onConnect,
    removeEdges,
  }
}
