<template>
  <div class="data-node">
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'DataNode',
  inject: ['getNode'],
  data() {
    return {
      label: 'label',
    }
  },
  mounted() {
    const node = this.getNode()
    this.label = node?.data?.label ?? node.id
  },
}
</script>

<style>
.data-node {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5f95ff;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  .label {
    display: inline-block;
    flex-shrink: 0;
    width: 80px;
    margin-left: 8px;
    color: #666;
    font-size: 12px;
  }
}
.x6-node-selected .data-node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}
</style>
