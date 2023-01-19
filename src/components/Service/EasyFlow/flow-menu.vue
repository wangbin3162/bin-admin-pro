<template>
  <div class="flow-menu" ref="tool">
    <ul class="ef-node-menu-ul">
      <li
        v-for="element in menuList"
        class="ef-node-menu-li"
        :key="element.id"
        :type="element.type"
        draggable="true"
        @dragstart="dragStart($event, element)"
      >
        <b-icon :name="element.ico"></b-icon>
        {{ element.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  menuList: {
    type: Array,
    default: () => [
      {
        id: '11',
        type: 'task',
        name: '数据接入',
        ico: 'Field-time',
        // 自定义覆盖样式
        style: {},
      },
      {
        id: '12',
        type: 'task',
        name: '接口调用',
        ico: 'index',
        // 自定义覆盖样式
        style: {},
      },
      {
        id: '21',
        type: 'task',
        name: '流程结束',
        ico: 'caret-right',
        // 自定义覆盖样式
        style: {},
      },
      {
        id: '22',
        type: 'task',
        name: '数据清理',
        ico: 'clear',
        // 自定义覆盖样式
        style: {},
      },
    ],
  },
})

function dragStart(evt, item) {
  evt.dataTransfer.setData('node', JSON.stringify(item))
}
</script>

<style scoped lang="stylus">
.ef-node-menu-li {
  color: #565758;
  width: 150px;
  border: 1px dashed #E0E3E7;
  margin-bottom: 8px;
  padding: 5px 8px;
  border-radius: 5px;
}

.ef-node-menu-li:hover {
  /* 设置移动样式*/
  cursor: move;
  background-color: #F0F7FF;
  border: 1px dashed #1879FF;
}

.ef-node-menu-ul {
  list-style: none;
  padding: 12px
}
</style>
