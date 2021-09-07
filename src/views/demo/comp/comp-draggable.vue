<template>
  <page-wrapper desc="Draggable 拖拽组件模块，封装拖拽模块内容。">
    <b-collapse-wrap title="Draggable 更通用的拖拽排序模块，无额外样式和默认值等配置" shadow="none">
      <div class="p16">
        <b-row :gutter="16">
          <b-col span="12">
            <draggable
              v-model="data"
              class="drag-area"
              ghost-class="ghost"
              @start="start"
              @end="end"
            >
              <div v-for="item in data" :key="item" class="item">{{ item }}</div>
            </draggable>
          </b-col>
          <b-col span="12">
            <draggable
              v-model="data1"
              class="drag-area"
              ghost-class="ghost"
              handle=".drag-handle"
              :animation="150"
              @start="start"
              @end="end"
            >
              <div v-for="item in data1" :key="item" class="item">
                <i class="b-iconfont b-icon-drag drag-handle"></i>
                {{ item }}
              </div>
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
              ghost-class="ghost"
              group="test"
              :animation="150"
            >
              <div v-for="item in data2" :key="item" class="item" style="color:#f5222d;">{{ item }}</div>
            </draggable>
          </b-col>
          <b-col span="12">
            <draggable
              v-model="data3"
              class="drag-area"
              ghost-class="ghost"
              group="test"
              :animation="150"
            >
              <div v-for="item in data3" :key="item" class="item" style="color:#1089ff;">{{ item }}</div>
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
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import Draggable from '@/components/Common/Draggable/index.vue'

export default {
  name: 'CompDraggable',
  components: { Draggable, PageWrapper },
  data() {
    return {
      data: [
        'item1',
        'item2',
        'item3',
        'item4',
        'item5',
        'item6',
      ],
      data1: [
        'item1',
        'item2',
        'item3',
        'item4',
        'item5',
        'item6',
      ],
      data2: [
        'item a1',
        'item a2',
        'item a3',
        'item a4',
        'item a5',
        'item a6',
      ],
      data3: [
        'item b1',
        'item b2',
        'item b3',
        'item b4',
        'item b5',
        'item b6',
      ],
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

<style lang="stylus" scoped>
@import "../../../assets/stylus/base/mixins.styl"
.drag-area {
  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 24px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
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
    background-image: linear-gradient(getLighten5(), getLighten3(), getLighten5()) !important;
  }
}
</style>
