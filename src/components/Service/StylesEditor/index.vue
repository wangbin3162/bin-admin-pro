<template>
  <div class="styles-editor-wrap">
    <div flex="main:justify">
      <div class="editor-box">
        <b-ace-editor
          v-model="styleValue"
          lang="stylus"
          :height="height"
          :font-size="14"
          @blur="emitValue"
        ></b-ace-editor>
      </div>
      <div class="action-box" v-if="showAction">
        <div class="mb-5" flex="main:justify cross:center">
          <div>样式显示</div>
          <b-space>
            <b-tooltip content="输入样式表，默认控件宽度皆为25%">
              <b-icon name="question-circle" :size="18"></b-icon>
            </b-tooltip>
            <b-tooltip content="重置样式">
              <b-icon name="sync" :size="18" type="button" @click="resetStyle"></b-icon>
            </b-tooltip>
          </b-space>
        </div>
        <div class="mb-5">
          <div>宽度设置</div>
        </div>
        <div class="mb-5" flex="cross:center">
          <b-radio-group v-model="width" type="button" size="mini">
            <b-radio label="25%">1</b-radio>
            <b-radio label="50%">2</b-radio>
            <b-radio label="75%">3</b-radio>
            <b-radio label="100%">4</b-radio>
          </b-radio-group>
          <span class="ml-5">/&nbsp;4</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue'

/**
 * 样式配置面板，给字段配置样式，受业务影响
 */
export default {
  name: 'styles-editor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: '100px',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const styleValue = ref('') // 显示内容
    const width = ref('25%')

    function emitValue() {
      emit('update:modelValue', styleValue.value)
      emit('change', styleValue.value)
    }

    function resetStyle() {
      styleValue.value = 'width: 25%;'
      emitValue()
    }

    // 初始value监听watch
    watch(() => props.modelValue, val => {
      if (val === '') {
        resetStyle()
        return
      }
      styleValue.value = val
    }, { immediate: true })

    // 监听宽度
    watch(() => width.value, val => {
      styleValue.value = `width: ${val};`
      emitValue()
    })

    return {
      width,
      styleValue,
      emitValue,
      resetStyle,
    }
  },
}
</script>

<style scoped lang="stylus">
.styles-editor-wrap {
  .editor-box {
    flex: 1;
  }
  .action-box {
    width: 200px;
    padding: 6px 8px;
    border: 1px solid #eee;
    border-left: none;
  }
}
</style>
