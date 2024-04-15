<template>
  <aside class="drag-panel">
    <div class="description">你可以拖拽这些节点到画布</div>

    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')">
        输入节点
      </div>

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
      >
        普通节点
      </div>

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'endnode')"
      >
        输出节点
      </div>
    </div>
  </aside>
</template>

<script setup>
import useDragDrop from '../hooks/useDragDrop'

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
  width: 220px;
  padding: 20px 16px;
  height: calc(100% - 20px);
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 0px 20px;
  border-radius: 0px 10px 10px 0px;
  transition: all 0.2s ease 0s;
  user-select: none;
  .description {
    margin-bottom: 10px;
    text-align: center;
  }
  .nodes > * {
    margin-bottom: 16px;
    cursor: grab;
    font-weight: 500;
    box-shadow: 5px 5px 10px 2px #00000040;
    width: 100%;
  }
}
</style>
