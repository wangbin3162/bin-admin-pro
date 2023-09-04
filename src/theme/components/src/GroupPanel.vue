<template>
  <div class="group-panel">
    <div class="title">{{ simple ? label : title }}</div>

    <template v-if="!simple">
      <div class="reset-default" :title="`重置默认：${defaultVal}`" @click="resetValue">
        <b-icon name="rollback"></b-icon>
      </div>
      <div class="copy-var" :title="`复制属性值：${realVar}`" @click="copyVar">
        <b-icon name="file-copy"></b-icon>
      </div>
    </template>

    <div class="content">
      <template v-if="!simple">
        <div class="content-inner" flex :class="type">
          <b-color-picker
            v-model="value"
            v-if="(type === 'mixed' || type === 'color') && isColor"
            :colors="colors"
            :showAlpha="showAlpha"
          />
          <!-- 替换颜色控制器 -->
          <b-color-picker
            v-model="notColorStr"
            v-if="(type === 'mixed' || type === 'color') && !isColor"
            :colors="colors"
            :showAlpha="showAlpha"
            @change="val => (value = val)"
          />
          <b-input
            v-model="value"
            v-if="type === 'mixed' || type === 'input'"
            :placeholder="defaultVal"
          />
        </div>

        <!-- 色板工具 -->
        <ul class="color-list" v-if="(type === 'mixed' || type === 'color') && isColor">
          <li
            v-for="(color, index) in colorList"
            :key="index"
            :style="{ backgroundColor: color }"
            :title="`点击设置颜色[ ${color} ]`"
            :class="{ active: color === value.toLowerCase() }"
            @click="setColor(color)"
          />
        </ul>
      </template>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { copyText } from '@/utils/util'
import { isColorValue } from '@/theme/utils/utils'
import { Utils } from 'bin-ui-next'

const { getPalette } = Utils.color

defineOptions({
  name: 'GroupPanel',
})
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: String,
  label: String,
  defaultVal: String,
  colors: {
    type: Array,
  },
  showAlpha: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    validate: val => ['input', 'color', 'mixed'].includes(val),
    default: 'mixed',
  },
  simple: Boolean,
})

const title = computed(() => props.label.substring(0, props.label.indexOf('[')))

const realVar = computed(() => {
  const match = props.label.match(/\[(.+)\]/)
  const str = match ? match[1] : ''
  const convertedString = `var(--${str.replace(/([A-Z])/g, '-$1').toLowerCase()})`
  return convertedString
})

const value = computed({
  get: () => props.modelValue,
  set: val => {
    emit('update:modelValue', val)
    emit('change', val)
  },
})

const notColorStr = ref('')

const isColor = computed(() => isColorValue(props.modelValue))

const colorList = computed(() => (isColor.value ? getPalette(props.modelValue) : []))

watch(
  () => props.modelValue,
  () => {
    if (!isColor.value) {
      notColorStr.value = '#ffffff'
    }
  },
)

function setColor(color) {
  value.value = color
}

function resetValue() {
  value.value = props.defaultVal
}

function copyVar() {
  copyText(realVar.value)
}
</script>

<style scoped>
.group-panel {
  position: relative;
  padding: 24px 16px;
  border-radius: 4px;
  border: 1px solid var(--v-g-border-color);
  margin-bottom: 20px;
  .title {
    position: absolute;
    height: 24px;
    line-height: 24px;
    background-color: var(--v-g-bg-color);
    top: -12px;
    left: 16px;
    padding: 0 8px;
    color: var(--v-g-text-color-dark);
    user-select: none;
  }
  .reset-default {
    position: absolute;
    height: 20px;
    line-height: 20px;
    bottom: 0;
    right: 2px;
    cursor: pointer;
    > i {
      font-size: 14px;
    }
    &:hover {
      > i {
        color: var(--bin-color-primary);
      }
    }
  }
  .copy-var {
    position: absolute;
    height: 20px;
    line-height: 20px;
    bottom: 0;
    right: 20px;
    cursor: pointer;
    > i {
      font-size: 14px;
    }
    &:hover {
      > i {
        color: var(--bin-color-primary);
      }
    }
  }

  .color-list {
    position: absolute;
    height: 20px;
    top: 58px;
    left: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 20px;
    padding: 2px;
    background-color: var(--v-g-fill-color-2);
    > li {
      position: relative;
      width: 16px;
      height: 16px;
      cursor: pointer;
      border-radius: var(--bin-border-radius-default);
      transition: transform 0.2s;
      + li {
        margin-left: 4px;
      }
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 16px rgba(0, 0, 0, 0.15);
      }
      &.active {
        &:hover {
          transform: scale(1);
        }
        &::after {
          content: '';
          position: absolute;
          left: -1px;
          top: -1px;
          width: 18px;
          height: 18px;
          box-shadow: 0 0 0 1px var(--bin-color-primary);
        }
      }
    }
  }
  .content {
    :deep(.bin-color-picker) {
      font-size: 0;
      width: 100%;
    }
    .content-inner {
      position: relative;
      width: 100%;
      font-size: 0;
      &.mixed {
        :deep(.bin-input-wrapper) {
          position: absolute;
          left: 0;
          width: calc(100% - 64px);
        }
      }
    }
  }
  &:hover {
    .reset-default,
    .copy-var {
      opacity: 1;
    }
  }
}
</style>
