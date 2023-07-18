<template>
  <div class="setting-wrap">
    <b-empty v-if="!config">请选择一个区域</b-empty>
    <template v-else>
      <b-divider align="left">基础信息</b-divider>
      <g-field label="组件标识" tooltip="英文标识">
        <g-input v-model="data.name" :disabled="readonly" />
      </g-field>
      <g-field label="组件名称" tooltip="中文别名">
        <g-input v-model="data.alias" :disabled="readonly" />
      </g-field>
      <b-divider align="left">位置信息</b-divider>
      <g-field label="x 轴坐标">
        <g-input-number v-model="data.attr.x" inline suffix="px" :disabled="readonly" />
      </g-field>
      <g-field label="y 轴坐标">
        <g-input-number v-model="data.attr.y" inline suffix="px" :disabled="readonly" />
      </g-field>
      <g-field label="组件宽度">
        <g-input-number
          v-model="data.attr.w"
          :min="10"
          :max="4000"
          inline
          suffix="px"
          :disabled="readonly"
        />
      </g-field>
      <g-field label="组件高度">
        <g-input-number
          v-model="data.attr.h"
          :min="10"
          :max="4000"
          inline
          suffix="px"
          :disabled="readonly"
        />
      </g-field>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import GField from './ui/g-field/index.vue'
import GInput from './ui/g-input/index.vue'
import GInputNumber from './ui/g-input-number/index.vue'

const props = defineProps({
  config: {
    type: Object,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})
// config 配置项
const data = computed(() => props.config)
</script>

<style lang="stylus" scoped>
.setting-wrap {
  width: 100%;
  height: calc(100% - 45px);
  overflow-y: auto;
  color: rgba(0, 0, 0, .65);
}
</style>
