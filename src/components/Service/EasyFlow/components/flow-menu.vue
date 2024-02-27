<template>
  <div class="flow-menu" ref="tool">
    <div class="type-box">
      <div
        class="type-item"
        :class="{ active: activeType === COMMON }"
        title="通用节点"
        @click="activeType = COMMON"
      >
        <img src="../assets/node.svg" alt="node" style="width: 24px; height: 24px" />
      </div>
      <div
        class="type-item"
        :class="{ active: activeType === SWITCH }"
        title="条件节点"
        @click="activeType = SWITCH"
      >
        <img src="../assets/switch.svg" alt="switch" style="width: 20px; height: 20px" />
      </div>
    </div>

    <ul class="ef-node-menu-ul">
      <li
        v-for="element in list"
        class="ef-node-menu-li"
        :class="[element.type, { disabled: checkRepeat(element.id) }]"
        :key="element.id"
        :type="element.type"
        :draggable="!checkRepeat(element.id)"
        @dragstart="dragStart($event, element)"
      >
        <div class="ef-node-left-ico">
          <b-icon v-if="element.ico" :name="element.ico"></b-icon>
          <template v-else>
            <img
              v-if="element.type === 'common'"
              src="../assets/node.svg"
              alt="node"
              style="width: 24px; height: 24px"
            />
            <img
              v-if="element.type === 'switch'"
              src="../assets/switch.svg"
              alt="switch"
              style="width: 20px; height: 20px"
            />
          </template>
        </div>
        <span class="ef-node-text">{{ element.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const COMMON = 'common'
const SWITCH = 'switch'

const props = defineProps({
  // 是否可以重复拖入
  repeat: {
    type: Boolean,
    default: false,
  },
  // 原始数据
  data: {
    type: Object,
    default: () => ({}),
  },
  menuList: {
    type: Object,
    default: () => ({
      common: [
        {
          id: '11',
          type: 'common',
          name: '数据接入',
          ico: 'index',
          // 自定义覆盖样式
          style: {},
        },
        {
          id: '12',
          type: 'common',
          name: '接口调用',
          // 自定义覆盖样式
          style: {},
        },
      ],
      switch: [
        {
          id: '13',
          type: 'switch',
          name: '流程结束',
          // 自定义覆盖样式
          style: {},
        },
        {
          id: '14',
          type: 'switch',
          name: '数据清理',
          ico: 'clear',
          // 自定义覆盖样式
          style: {},
        },
      ],
    }),
  },
})

const activeType = ref(COMMON)
const list = computed(() => props.menuList[activeType.value])

// 判断画布中是否存在重复的节点，这里需要根据是否可以重复来判定
function checkRepeat(nodeId) {
  return props.data.nodeList.findIndex(item => item.id === nodeId) > -1
}

function dragStart(evt, item) {
  evt.dataTransfer.setData('node', JSON.stringify(item))
}
</script>

<style scoped>
.flow-menu {
  display: flex;
  height: 100%;
  overflow: hidden;
  .type-box {
    width: 31px;
    border-right: 1px solid #eee;
    padding: 8px 0;
    overflow: auto;
    .type-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      cursor: pointer;
      transition: .2s;
      &:hover {
        background-color: #E0E0E0;
      }
      &.active {
        background-color: #e7f3ff;
      }
    }
  }
  .ef-node-menu-ul {
    list-style: none;
    padding: 8px
    width: calc(100% - 32px);
    overflow: auto;
  }
}

.ef-node-menu-li {
  position: relative;
  user-select: none;
  color: #565758;
  width: 100%;
  border: 1px dashed #E0E3E7;
  margin-bottom: 8px;
  padding: 0 8px 0 4px;
  border-radius: 5px;
  height: 32px;
  display: flex;
  align-items: center;
  &:before {
    content: ''
    position: absolute;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #1089ff;
    border-radius: 4px 0 0 4px;
  }
  &.switch {
    &:before  {
      background-color: #fa8c16;
    }
    &:not(.view-only){
      &:hover {
        background-color: #fff9f3;
        border: 1px dashed #fa8c16;
      }
    }
  }

  .ef-node-text {
    font-size: 12px;
    line-height: 30px;
    flex: 1;
    padding: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    cursor: move;
    background-color: #F0F7FF;
    border: 1px dashed #1879FF;
  }

  .ef-node-left-ico {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    > i {
      font-size: 20px;
    }
  }
  &.disabled {
    cursor: not-allowed;
    background-color: #f9f9f9;

    &:before {
      background-color: #bfbfbf;
    }
    &:hover {
      cursor: not-allowed;
      border-color: #bfbfbf;
    }
    .ef-node-left-ico , .ef-node-text{
      opacity : 0.6;
    }
  }

}
</style>
