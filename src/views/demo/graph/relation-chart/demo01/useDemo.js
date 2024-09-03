import testData from './miserables.json'
import ForceGraph3D from '3d-force-graph'
import { onMounted } from 'vue'

export function useDemo() {
  let Graph = null
  console.log(testData)

  onMounted(() => {
    const container = document.getElementById('3d-graph')
    const height = container.clientHeight
    const width = container.clientWidth
    Graph = ForceGraph3D()(document.getElementById('3d-graph'))
      .width(width)
      .height(height)
      .backgroundColor('rgba(0,0,0,1)')
      .showNavInfo(false) //禁用页脚

    Graph.graphData(testData).nodeLabel('id').nodeAutoColorBy('group')
  })
}
