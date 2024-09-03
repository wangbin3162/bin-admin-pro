import testData from './relation.json'
import RelationChart from './RelationChart'

import { onMounted } from 'vue'

export function useDemo() {
  onMounted(() => {
    const container = document.getElementById('3d-graph')

    const graph = new RelationChart(container, testData)

    graph.render()
  })
}
