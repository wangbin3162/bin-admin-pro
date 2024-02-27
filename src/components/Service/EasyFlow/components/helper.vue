<template>
  <b-modal v-model="visible" title="帮助" width="680px" :body-styles="{ padding: 0 }">
    <div style="overflow: hidden" flex>
      <div style="width: 30%; border-right: 1px solid #f0f0f0">
        <b-menu :default-active="active" @select="index => (active = index)">
          <b-menu-item v-for="item in info" :key="item.id" :index="item.id">
            <b-icon :name="item.icon"></b-icon>
            <template #title>{{ item.title }}</template>
          </b-menu-item>
        </b-menu>
      </div>
      <div class="scroll-box">
        <template v-for="item in info" :key="item.id">
          <div class="scroll-page" :id="item.id" v-show="item.id === active">
            <div class="title">
              <b-divider align="left" style="margin: 0">{{ item.title }}</b-divider>
            </div>
            <p v-for="(m, index) in item.message" :key="index">{{ m }}</p>
          </div>
        </template>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const active = ref('add')

const info = [
  {
    id: 'add',
    icon: 'plus-circle',
    title: '如何新增',
    message: ['按住鼠标拖拽左侧组件到中间画布中松开鼠标即可'],
  },
  {
    id: 'delete',
    icon: 'delete',
    title: '如何删除',
    message: [
      '1、鼠标点中需要删除的节点或连线，点击左上角的删除图标',
      '2、鼠标右键需要删除的节点或连线，选择删除节点或删除线',
    ],
  },
  {
    id: 'move',
    icon: 'drag',
    title: '如何移动',
    message: ['鼠标移动到节点中，当鼠标变为可拖拽的图标时按下鼠标移动到新的位置松开鼠标'],
  },
  {
    id: 'line',
    icon: 'index',
    title: '如何连线',
    message: ['鼠标移动到节点中左侧的图标上，当鼠标变为 + 时按下鼠标移动到另一个节点中松开鼠标'],
  },
  {
    id: 'condition',
    icon: 'sisternode',
    title: '如何添加条件',
    message: ['点击画布中的连线，在页面右侧会出现一个表单，输入新的条件，点击【保存】'],
  },
]

const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

watch(
  () => visible.value,
  val => {
    if (val) active.value = 'add'
  },
)
</script>

<style scoped>
.scroll-box {
  position: relative;
  padding: 0 20px;
  width: 70%;
  height: 400px;
  overflow: auto;
  background-color: #fff;
  .scroll-page {
    .title {
      padding: 24px 0;
    }
    p {
      line-height: 32px;
    }
  }
}
</style>
