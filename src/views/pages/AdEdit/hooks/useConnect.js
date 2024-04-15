import { useVueFlow, MarkerType } from '@vue-flow/core'
// 连线hooks
export default function useConnect() {
  const { addEdges } = useVueFlow()

  function onConnect(params) {
    console.log('on connect', params)
    addEdges({
      ...params,
      animated: true,
      style: { stroke: '#b1b1b7', strokeWidth: 2 },
      markerEnd: MarkerType.Arrow,
      type: 'button',
    })
  }

  return {
    onConnect,
  }
}
