<template>
  <div class="group-panel">
    <div class="title">{{ label }}</div>
    <div class="reset-default" :title="`重置默认：${defaultVal}`" @click="resetValue">
      <b-icon name="rollback"></b-icon>
    </div>
    <div class="copy-var" :title="`复制属性值：${realVar}`" @click="copyVar">
      <b-icon name="file-copy"></b-icon>
    </div>

    <div class="content">
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
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { copyText, isColorValue } from '@/utils/util'

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
})

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

const notColorStr = ref('#ffffff')

const isColor = computed(() => isColorValue(props.modelValue))

watch(
  () => props.modelValue,
  () => {
    if (!isColor.value) {
      notColorStr.value = '#ffffff'
    }
  },
)

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
  /* display: inline-flex; */
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
    opacity: 0;
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
    opacity: 0;
    > i {
      font-size: 14px;
    }
    &:hover {
      > i {
        color: var(--bin-color-primary);
      }
    }
  }
  .content {
    :deep(.bin-color-picker) {
      font-size: 0;
      width: 100%;
    }
    .content-inner {
      width: 100%;
      font-size: 0;
      &.mixed {
        :deep(.bin-input-wrapper) {
          width: calc(100% - 32px);
        }
        :deep(.bin-color-picker) {
          position: relative;
          width: 32px;
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
