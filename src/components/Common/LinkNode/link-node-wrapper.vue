<template>
  <div class="link-node-wrapper">
    <template v-if="!dataEmpty">
      <link-node
        v-for="(item, i) in stateTree"
        :key="i"
        :data="item"
      >
      </link-node>
    </template>
    <div v-else>
      <b-empty style="margin: 16px 0">{{ emptyText }}</b-empty>
    </div>
  </div>
</template>

<script>
import LinkNode from '@/components/Common/LinkNode/node.vue'
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import { isEmpty } from '@/utils/util'

export default {
  name: 'link-node-wrapper',
  components: { LinkNode },
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    defaultIcon: {
      type: String,
      default: 'table',
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
  },
  setup(props, { emit }) {
    const states = reactive({
      stateTree: [],
      flatState: [],
    })
    const dataEmpty = computed(() => isEmpty(states.stateTree))

    function compileFlatState() {
      // 每个结点都有一个关系父结点/子结点
      let keyCounter = 0
      let level = 0
      let childrenKey = 'children'
      const flatTree = []

      const flattenChildren = (node, parent, parentKeys, level = 0) => {
        node['nodeKey'] = keyCounter++
        // 追加level层级
        node['level'] = level
        flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey }
        if (typeof parent !== 'undefined') {
          flatTree[node.nodeKey].parent = parent.nodeKey
          flatTree[parent.nodeKey][childrenKey].push(node.nodeKey)
        }
        let parents = parentKeys ? parentKeys.split(',').map(i => +i) : []
        // 拼接parents
        if (typeof parentKeys !== 'undefined') {
          parents.push(parent.nodeKey)
          flatTree[node.nodeKey].parents = parents
        }

        if (node[childrenKey]) {
          level++
          flatTree[node.nodeKey][childrenKey] = []
          node[childrenKey].forEach((child) => flattenChildren(child, node, parents.join(','), level))
        }
      }

      props.data.forEach((rootNode) => {
        flattenChildren(rootNode)
      })
      return flatTree
    }

    function updateTreeState() {
      states.stateTree = props.data
      states.flatState = compileFlatState()
      // rebuildTree()
    }

    watch(() => props.data, () => {
      updateTreeState()
    }, { deep: true, immediate: true })

    onMounted(() => {
      console.log(states.stateTree)
      console.log(states.flatState)
    })
    return {
      ...toRefs(states),
      dataEmpty,
    }
  },
}
</script>

<style scoped lang="stylus">
.link-node-wrapper {
  position: relative;
  height: 100%;
}
</style>
