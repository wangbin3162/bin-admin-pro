<template>
  <div class="link-node-wrapper">
    <template v-if="!dataEmpty">
      <div
        class="link-wrapper"
        v-for="(item, i) in renderList"
        :key="i"
        :class="{'empty-highlight':item.node.isEmpty && item.nodeKey !== dragoverNodeKey}"
      >
        <!--tip连接桩-->
        <node-tip
          v-if="item.visible&&item.node.level>0"
          :data="item.node"
          :style="item.tipStyle"
        ></node-tip>
        <!--link-node节点-->
        <link-node
          v-if="item.visible"
          :data="item.node"
          :style="item.nodeStyle"
        >
        </link-node>
      </div>
      <div class="link-margin" :style="linkMargin[0]"></div>
      <div class="link-margin" :style="linkMargin[1]"></div>
    </template>
    <div v-else :class="{'empty-tips':true,dragging}">
      <b-empty style="margin: 16px 0">{{ emptyText }}</b-empty>
    </div>
    <!--dev-->
    <div v-if="dev" class="dev">
      <b-ace-editor :model-value="JSON.stringify({maxLevel,maxRow,flatState},null,2)" height="500"></b-ace-editor>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, provide, reactive, toRefs, watch } from 'vue'
import { isEmpty } from '@/utils/util'
import LinkNode from '@/components/Common/LinkNode/node.vue'
import NodeTip from '@/components/Common/LinkNode/node-tip.vue'
import { getLinkMarginStyle, getNodeStyle } from '@/components/Common/LinkNode/node-util'

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
      default: false,
    },
    dev: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['node-click', 'link-click', 'update-flatState', 'node-drop'],
  setup(props, { emit }) {
    const states = reactive({
      stateTree: {},
      flatState: [],
      renderList: [],
      maxLevel: 0,
      maxRow: 0,
      dragoverNodeKey: -1,
    })

    const dataEmpty = computed(() => isEmpty(states.stateTree))

    // link-margin
    const linkMargin = computed(() => {
      const devStyle = props.dev ? { background: 'red' } : {}
      const { maxLevel, maxRow } = states
      return getLinkMarginStyle(maxLevel, maxRow, devStyle)
    })

    // 1.树节点处理，追加和分配层级和行标识
    function updateStateTree() {// 每个结点都有一个关系父结点/子结点
      let keyCounter = 0
      let keyRow = 0
      let childrenKey = 'children'

      const flattenChildren = (node, level = 0) => {
        if (isEmpty(node)) return
        node['nodeKey'] = keyCounter++
        node['level'] = level
        node['row'] = keyRow
        node['isEmpty'] = false
        if (!isEmpty(node[childrenKey])) {
          const _level = level + 1
          node[childrenKey].forEach((child, index) => {
            if (index === 0) {
              child['row'] = keyRow
              child['isKnee'] = false
            } else {
              child['row'] = ++keyRow
              child['isKnee'] = true
            }
            flattenChildren(child, _level)
          })
          // 存在子节点，追加一个空节点
          node[childrenKey].push({
            title: props.dev ? `${node.title} - empty node` : props.emptyNodeText,
            level: level + 1,
            nodeKey: keyCounter++,
            row: ++keyRow,
            isEmpty: true, // 是否是空节点
            isKnee: true,// 是否是拐点
          })
        } else {
          // 不存在children拼接一个空节点
          node[childrenKey] = [{
            title: props.dev ? `${node.title} - empty node` : props.emptyNodeText,
            level: level + 1,
            row: keyRow,
            isEmpty: true, // 是否是空节点
            isKnee: false,// 是否是拐点
            nodeKey: keyCounter++,
          }]
        }
      }

      flattenChildren(props.data)
    }

    // 2.拉平节点，追加子父级关系
    function updateFlatState() {
      let childrenKey = 'children'
      const flatTree = []

      const flattenChildren = (node, parent, parentKeys) => {
        if (isEmpty(node)) return
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
          flatTree[node.nodeKey][childrenKey] = []
          node[childrenKey].forEach(child => flattenChildren(child, node, parents.join(',')))
        }
      }

      flattenChildren(states.stateTree)

      states.flatState = flatTree

      handleUpdateFlatState()
    }

    // 3.重新组建连接节点
    function rebuildLinks() {
      states.renderList = rebuildRenderList()
      states.maxLevel = Math.max.apply(Math, states.flatState.map(v => v.node.level))
      states.maxRow = Math.max.apply(Math, states.flatState.map(v => v.node.row))
    }

    // 节点渲染列表，拼接属性，style等
    function rebuildRenderList() {
      const nodeList = []
      states.flatState.forEach(item => {
        const { row, level } = item.node
        const { nodeStyle, tipStyle } = getNodeStyle(row, level)
        const visible = item.node.isEmpty ? props.dragging : true
        // 拼接实际节点
        nodeList.push({ ...item, visible, nodeStyle, tipStyle })
      })
      return nodeList
    }

    // 更新树节点数据
    function updateData() {
      states.stateTree = props.data
      updateStateTree()
      updateFlatState()
      rebuildLinks()
    }

    // flatState 更新事件
    function handleUpdateFlatState() {
      emit('update-flatState', states.flatState)
    }

    // 节点点击事件
    function handleNodeClick(nodeKey) {
      const node = states.flatState[nodeKey].node
      emit('node-click', node, states.flatState)
    }

    // 连接点击事件
    function handleLinkClick(nodeKey) {
      const stateNode = states.flatState[nodeKey]
      const node = stateNode.node
      const parentNode = states.flatState[stateNode.parent].node
      emit('link-click', node, parentNode, states.flatState)
    }

    // node-drag event
    function onNodeDragenter(nodeKey) {
      states.dragoverNodeKey = nodeKey
    }

    function onNodeDragleave() {
      states.dragoverNodeKey = -1
    }

    function onNodeDrop(nodeKey, tableId) {
      const stateNode = states.flatState[nodeKey]
      const node = stateNode.node
      const parentNode = states.flatState[stateNode.parent].node
      node.isEmpty = false
      node.title = '测试'
      updateFlatState()
      rebuildLinks()
      emit('node-drop', node, parentNode, tableId)
    }

    provide('LinkNodeInstance', {
      states,
      handleNodeClick,
      handleLinkClick,
      onNodeDragenter,
      onNodeDragleave,
      onNodeDrop,
    })

    watch(() => props.data, () => {
      updateData()
    }, { immediate: true })

    watch(() => props.dragging, () => {
      rebuildLinks()
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
  .dev {
    position: absolute;
    top: 0;
    right: 0;
    width: 460px;
  }
}
</style>
