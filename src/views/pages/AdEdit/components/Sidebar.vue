<template>
  <aside class="drag-panel">
    <div class="description">
      <b-alert>你可以拖拽这些节点到画布</b-alert>
    </div>
    <div class="nodes">
      <div
        class="node"
        :draggable="true"
        v-for="(item, key) in NodeInfo"
        :key="key"
        @dragstart="onDragStart($event, NodeType[key])"
      >
        <b-icon class="chakra-image" :name="NodeInfo[key].icon" :color="NodeInfo[key].iconColor" />
        <div class="info">
          <div class="title">{{ NodeInfo[key].title }}</div>
          <div class="desc">{{ NodeInfo[key].desc }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import useDragDrop from '../hooks/useDragDrop'
import { NodeType, NodeInfo } from '../hooks/Job'

const { onDragStart } = useDragDrop()
</script>

<style scoped>
.drag-panel {
  display: flex;
  z-index: 3;
  flex-direction: column;
  position: absolute;
  top: 10px;
  left: 0px;
  width: 240px;
  padding: 20px 16px;
  height: calc(100% - 20px);
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 0px 20px;
  border-radius: 0px 10px 10px 0px;
  transition: all 0.2s ease 0s;
  user-select: none;
  .description {
    text-align: center;
  }
  .nodes {
    .node {
      display: flex;
      align-items: center;
      padding: 10px 8px;
      cursor: pointer;
      border-radius: 4px;
      margin-bottom: 16px;
      transition: 0.2s;
      &:hover {
        background-color: #f6f4f8;
      }
      .chakra-image {
        border-radius: 0px;
        width: 34px;
        height: 34px;
        padding: 1px;
        font-size: 26px;
      }
      .info {
        margin-left: 8px;
        .desc {
          color: #667085;
          font-size: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
