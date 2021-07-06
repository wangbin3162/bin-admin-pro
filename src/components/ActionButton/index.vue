<template>
  <b-popover v-model:visible="visible" :width="200" :disabled="!confirm">
    <b-button v-bind="buttonProps" @click="handleClick" :title="tooltip">
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
      type: Object,
      default() {
        return {
          type: 'text'
        }
      }
    },
    message: {
      type: String,
      default: '确定删除本条数据吗？'
    },
    confirm: Boolean,
    tooltip: String
  },
  data() {
    return {
      visible: false
    }
  },
  emits: ['cancel', 'click'],
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

<style scoped>

</style>
