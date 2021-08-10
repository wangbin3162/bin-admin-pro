<template>
  <div class="styles-editor-wrap">
    <div flex="main:justify">
      <div class="editor-box">
        <b-ace-editor
          v-model="styleValue"
          theme="sqlserver"
          @blur="emitValue"
          height="200px"
          :font-size="14"
        ></b-ace-editor>
      </div>
      <div class="action-box">
        <div class="mb-5" flex="main:justify cross:center">
          <div>样式显示</div>
          <b-space>
            <b-tooltip content="左侧输入的内容需符合绑定styles对象">
              <b-icon name="question-circle" :size="18"></b-icon>
            </b-tooltip>
            <b-tooltip content="重置样式">
              <b-icon name="sync" :size="18" type="button" @click="resetStyle"></b-icon>
            </b-tooltip>
          </b-space>
        </div>
        <div class="mb-5" flex="cross:center">
          <b-radio-group v-model="display" type="button" size="mini">
            <b-radio label="inline-block">行内</b-radio>
            <b-radio label="block">块级</b-radio>
          </b-radio-group>
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
        <div class="mb-5">
          <div>左右间隔</div>
        </div>
        <div class="mb-5" flex="cross:center">
          <b-radio-group v-model="padding" type="button" size="mini">
            <b-radio label="8px">8</b-radio>
            <b-radio label="16px">16</b-radio>
            <b-radio label="24px">24</b-radio>
          </b-radio-group>
          <span class="ml-5">px</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue'
import defaultStyle from './defaultStyle'

/**
 * 样式配置面板，给字段配置样式，受业务影响
 */
export default {
  name: 'styles-editor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    defaultStyle: {
      type: Object,
      default() {
        return defaultStyle
      }
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const styleValue = ref('') // 显示内容
    const display = ref(props.defaultStyle.display)
    const width = ref(props.defaultStyle.width)
    const padding = ref(props.defaultStyle.paddingRight)

    function emitValue() {
      // 更新数据，判断是否是正确的内容
      const formatObj = getFormatDisplay(styleValue.value)
      if (formatObj) {
        const value = JSON.stringify(formatObj)
        emit('update:modelValue', value)
        emit('change', value)
      }
    }

    function resetStyle() {
      styleValue.value = JSON.stringify(props.defaultStyle, null, 2)
      display.value = props.defaultStyle.display
      width.value = props.defaultStyle.width
      padding.value = props.defaultStyle.paddingRight
      emitValue()
    }

    // 获取标准json
    function getFormatDisplay(val) {
      if (val === '') return false
      try {
        return JSON.parse(val)
      } catch (e) {
        return false
      }
    }

    // 初始value监听watch
    watch(() => props.modelValue, val => {
      if (val === '') {
        resetStyle()
        return
      }
      const formatObj = getFormatDisplay(val)
      if (formatObj) {
        styleValue.value = JSON.stringify(formatObj, null, 2)
      }
    }, { immediate: true })

    // 监听宽度
    watch(() => width.value, val => {
      const formatObj = getFormatDisplay(styleValue.value)
      if (formatObj) {
        formatObj.width = val
        styleValue.value = JSON.stringify(formatObj, null, 2)
        emitValue()
      }
    })

    // 监听padding
    watch(() => padding.value, padding => {
      const formatObj = getFormatDisplay(styleValue.value)
      if (formatObj) {
        formatObj.paddingRight = padding
        styleValue.value = JSON.stringify(formatObj, null, 2)
        emitValue()
      }
    })
    // 监听block
    watch(() => display.value, val => {
      const formatObj = getFormatDisplay(styleValue.value)
      if (formatObj) {
        formatObj.display = val
        styleValue.value = JSON.stringify(formatObj, null, 2)
        emitValue()
      }
    })
    return {
      display,
      width,
      padding,
      styleValue,
      emitValue,
      resetStyle
    }
  }
}
</script>

<style scoped lang="stylus">
.styles-editor-wrap {
  .editor-box {
    width: calc(100% - 200px);
  }
  .action-box {
    width: 200px;
    padding: 6px 8px;
    border: 1px solid #eee;
    border-left: none;
  }
}
</style>
