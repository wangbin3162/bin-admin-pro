<template>
  <b-button dashed type="primary" style="width: 100%;" :size="buttonSize" @click="handleOpen">
    <i class="b-iconfont b-icon-bg-colors"></i>
    <slot>{{ title }}</slot>
  </b-button>
  <b-modal v-model="visible" :title="title||$slots.default" width="660px" draggable append-to-body>
    <styles-editor v-model="styleText"></styles-editor>
    <template #footer>
      <b-button @click="visible = false">取 消</b-button>
      <b-button type="primary" @click="handleOK">确 定</b-button>
    </template>
  </b-modal>
</template>

<script>
import { ref } from 'vue'
import StylesEditor from '@/components/Service/StylesEditor/index'

export default {
  name: 'styles-editor-modal',
  components: { StylesEditor },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '配置样式属性'
    },
    buttonSize: String
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const visible = ref(false)
    const styleText = ref('')

    // 打开配置页面
    function handleOpen() {
      styleText.value = props.modelValue
      visible.value = true
    }

    function handleOK() {
      emit('update:modelValue', styleText.value)
      emit('change', styleText.value)
      visible.value = false
    }

    return {
      visible,
      styleText,
      handleOpen,
      handleOK
    }
  }
}
</script>
