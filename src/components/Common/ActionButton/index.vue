<template>
  <b-popover v-model:visible="visible" :width="popperWidth" :disabled="!confirm">
    <b-button v-bind="btnProps" @click="handleClick" :title="tooltip">
      <slot></slot>
    </b-button>
    <template #content>
      <p style="line-height: 22px;margin-bottom: 8px;">
        <b-icon name="question-circle" size="16" color="#fa8c16"></b-icon>
        {{ message }}
      </p>
      <div style="text-align: right; margin: 0">
        <b-button size="mini" type="text" @click="handleCancel">取消</b-button>
        <b-button type="primary" size="mini" @click="handleOk">确认</b-button>
      </div>
    </template>
  </b-popover>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    buttonProps: {
      type: Object
    },
    popperWidth: {
      type: Number,
      default: 220
    },
    message: {
      type: String,
      default: '确定删除本条数据吗？'
    },
    disabled: Boolean,
    confirm: Boolean,
    tooltip: String,
    icon: String, // 按钮的icon
    type: String, // 按钮的样式
    color: String, // 图标按钮时的颜色
    isIcon: Boolean // 仅为图标按钮
  },
  data() {
    return {
      visible: false
    }
  },
  emits: ['cancel', 'click'],
  computed: {
    btnProps() {
      return {
        icon: this.icon,
        type: this.isIcon ? 'text' : this.type,
        textColor: this.color,
        disabled: this.disabled,
        iconStyle: this.isIcon ? { fontSize: '16px' } : {},
        ...this.buttonProps
      }
    }
  },
  methods: {
    handleCancel() {
      this.visible = false
      this.$emit('cancel')
    },
    handleOk() {
      this.visible = false
      this.$emit('click')
    },
    handleClick() {
      if (this.confirm) {
        return
      }
      this.$emit('click')
    }
  }
}
</script>
