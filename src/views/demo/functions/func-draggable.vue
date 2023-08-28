<template>
  <page-wrapper desc="Draggable 拖拽组件模块，依赖vuedraggable。">
    <b-collapse-wrap title="Draggable 更通用的拖拽排序模块，无额外样式和默认值等配置" shadow="none">
      <div class="p16">
        <b-row :gutter="16">
          <b-col span="12">
            <draggable
              v-model="data"
              class="drag-area"
              item-key="element"
              v-bind="{ animation: 0, group: 'data', ghostClass: 'ghost' }"
              @start="start"
              @end="end"
            >
              <template #item="{ element }">
                <div class="item">{{ element }}</div>
              </template>
            </draggable>
          </b-col>
          <b-col span="12">
            <draggable
              v-model="data1"
              class="drag-area"
              item-key="element"
              v-bind="{
                animation: 200,
                group: 'data1',
                ghostClass: 'ghost',
                handle: '.drag-handle',
              }"
              @start="start"
              @end="end"
            >
              <template #item="{ element }">
                <div class="item">
                  <i class="b-iconfont b-icon-drag drag-handle"></i>
                  {{ element }}
                </div>
              </template>
            </draggable>
          </b-col>
        </b-row>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="Draggable group" shadow="none">
      <div class="p16">
        <b-row :gutter="16">
          <b-col span="12">
            <draggable
              v-model="data2"
              class="drag-area"
              item-key="element"
              v-bind="{ animation: 200, group: 'group', ghostClass: 'ghost' }"
            >
              <template #item="{ element }">
                <div class="item">{{ element }}</div>
              </template>
            </draggable>
          </b-col>
          <b-col span="12">
            <draggable
              v-model="data3"
              class="drag-area"
              item-key="element"
              v-bind="{ animation: 200, group: 'group', ghostClass: 'ghost' }"
            >
              <template #item="{ element }">
                <div class="item">{{ element }}</div>
              </template>
            </draggable>
          </b-col>
        </b-row>
        <p>data left:{{ data2 }}</p>
        <p>data right:{{ data3 }}</p>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'FuncDraggable',
  components: { draggable },
  data() {
    return {
      data: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
      data1: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
      data2: ['item a1', 'item a2', 'item a3', 'item a4', 'item a5', 'item a6'],
      data3: ['item b1', 'item b2', 'item b3', 'item b4', 'item b5', 'item b6'],
    }
  },
  methods: {
    start() {
      console.log('on-drag-start')
    },
    end() {
      console.log('on-drag-end')
    },
  },
}
</script>

<style scoped>
.drag-area {
  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 24px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    height: 46px;
    .drag-handle {
      font-size: 22px;
      margin-right: 4px;
      margin-left: -4px;
      cursor: move;
    }
  }
  .ghost {
    background: #fff !important;
    background-image: linear-gradient(
      var(--bin-color-primary-light5),
      var(--bin-color-primary-light3),
      var(--bin-color-primary-light5)
    ) !important;
  }
}
</style>
