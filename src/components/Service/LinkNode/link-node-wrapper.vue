<template>
  <div class="link-node-wrapper">
    <template v-if="!dataEmpty">
      <div
        v-for="(item, i) in renderList"
        :key="i"
        class="link-wrapper"
        :class="{'empty-highlight':item.isEmpty}"
        :data-level="item.level"
        :data-row="item.node.row"
      >
        <!--tip连接桩-->
        <node-tip
          v-if="item.show&&item.level>0"
          :data="item.node"
          :style="item.tipStyle"
        ></node-tip>
        <!--link-node节点-->
        <link-node
          v-if="item.show"
          :data="item.node"
          :style="item.style"
        >
        </link-node>
      </div>
      <div class="link-margin" :style="linkMargin[0]"></div>
      <div class="link-margin" :style="linkMargin[1]"></div>
    </template>
    <div v-else :class="{'empty-tips':true,dragging}">
      <b-empty style="margin: 16px 0">{{ emptyText }}</b-empty>
    </div>
  </div>
  <div flex="box:mean" class="mt-24 pb-24">
    <b-ace-editor :model-value="JSON.stringify({level,maxRow,stateTree},null,2)"></b-ace-editor>
    <b-ace-editor :model-value="JSON.stringify(renderList,null,2)"></b-ace-editor>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import { isEmpty } from '@/utils/util'
import LinkNode from '@/components/Service/LinkNode/node.vue'
import NodeTip from '@/components/Service/LinkNode/node-tip.vue'

// 节点高度
const NODE_HEIGHT = 30
// 节点宽度
const NODE_WIDTH = 180
// 节点tip宽度
const NODE_TIP_WIDTH = 90

export default {
  name: 'link-node-wrapper',
  components: { NodeTip, LinkNode },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultIcon: {
      type: String,
      default: 'table',
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    emptyNodeText: {
      type: String,
      default: '拖拽左侧表至此添加关联表',
    },
    dragging: {
      type: Boolean,
      default: true,
    },
    dev: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const states = reactive({
      stateTree: {},
      flatState: [],
      renderList: [],
      level: 0,
      maxRow: 0,
    })

    const dataEmpty = computed(() => isEmpty(states.stateTree))

    // link-margin
    const linkMargin = computed(() => {
      const devStyle = props.dev ? { background: 'red' } : {}
      const { level, maxRow } = states
      const left = NODE_WIDTH * (level + 2) + NODE_TIP_WIDTH * (level + 1)
      const top = (NODE_HEIGHT + 18) * (maxRow + 2)
      return [
        { top: 0, left: `${left + 20}px`, ...devStyle },
        { left: 0, top: `${top}px`, ...devStyle },
      ]
    })

    // 节点渲染列表，拼接属性，style等
    function rebuildRenderList() {
      const nodeList = []
      states.flatState.forEach(item => {
        const row = item.node.row
        const level = item.node.level
        const top = `${row === 0 ? 0 : row * NODE_HEIGHT}px`
        const left = `${(NODE_WIDTH + NODE_TIP_WIDTH) * level}px`
        // 拼接实际节点
        nodeList.push({
          ...item,
          show: true,
          style: `top:${top};left:${left};height:${NODE_HEIGHT}px;width:${NODE_WIDTH}px`,
          tipStyle: level === 0 ? null : `top:${top};left:${NODE_WIDTH * level}px;height:${NODE_HEIGHT}px;width:${NODE_TIP_WIDTH}px`,
        })
        // 每个节点拼接一个空节点
        if (level !== undefined) {
          const emptyRow = item.children && item.children.length ? (row + item.children.length) : row
          const emptyTop = `${emptyRow === 0 ? 0 : emptyRow * NODE_HEIGHT + 18}px`
          const emptyLevel = level + 1
          const emptyLeft = level === 0 ? NODE_WIDTH * emptyLevel : NODE_WIDTH * emptyLevel + NODE_TIP_WIDTH
          const emptyNode = {
            node: {
              title: props.emptyNodeText + emptyLevel,
              level: emptyLevel,
              row: emptyRow,
              isEmpty: true,
              isKnee: !isEmpty(item.children),
            },
            level: emptyLevel,
            isEmpty: true,
            show: props.dragging,
            style: `top:${emptyTop};left:${emptyLeft + NODE_TIP_WIDTH}px;height:${NODE_HEIGHT}px;width:${NODE_WIDTH}px`,
            tipStyle: `top:${emptyTop};left:${emptyLeft}px;height:${NODE_HEIGHT}px;width:${NODE_TIP_WIDTH}px`,
          }
          nodeList.push(emptyNode)
        }
      })
      return nodeList
    }

    function compileFlatState() {
      // 每个结点都有一个关系父结点/子结点
      let keyCounter = 0
      let keyRow = 0
      let childrenKey = 'children'
      const flatTree = []

      const flattenChildren = (node, parent, parentKeys, level = 0) => {
        node['nodeKey'] = keyCounter++
        node['level'] = level
        node['row'] = keyRow
        flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey, level }
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
          const _level = level + 1
          flatTree[node.nodeKey][childrenKey] = []
          node[childrenKey].forEach((child, index) => {
            if (index === 0) {
              child['row'] = keyRow
            } else {
              child['row'] = ++keyRow
            }
            flattenChildren(child, node, parents.join(','), _level)
          })
        }
      }

      flattenChildren(props.data)

      return flatTree
    }

    function rebuildLinks() {
      states.renderList = rebuildRenderList()
      states.level = Math.max.apply(Math, states.flatState.map(v => v.level))
      states.maxRow = Math.max.apply(Math, states.flatState.map(v => v.node.row))
    }

    function updateTreeState() {
      states.stateTree = props.data
      states.flatState = compileFlatState()
      rebuildLinks()
    }

    watch(() => props.data, () => {
      updateTreeState()
    }, { immediate: true })

    onMounted(() => {
    })
    return {
      ...toRefs(states),
      dataEmpty,
      linkMargin,
    }
  },
}
</script>

<style scoped lang="stylus">
.link-node-wrapper {
  position: relative;
  height: 100%;
  .link-wrapper {
    &.empty-highlight {
      opacity: 0.6;
    }
  }
  .link-margin {
    position: absolute;
    width: 100px;
    height: 1px;
  }
  .empty-tips {
    text-align: center;
    line-height: 2;
    height: 100%;
    padding-top: 30px;
    border: 1px solid transparent;
    color: rgba(0, 0, 0, .65);
    &.dragging {
      border: 1px dashed #c6c6c6;
    }
  }
}
</style>
