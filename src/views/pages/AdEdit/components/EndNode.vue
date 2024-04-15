<template>
  <div class="end-node">
    <div class="end-node-inner">
      <div class="top-box">
        <i class="b-iconfont b-icon-stop-fill chakra-image" />
        <div class="title">工具调用终止</div>
      </div>

      <div class="desc">该模块需配置工具调用使用。当该模块被执行时，本次工具调用将会强制结束。</div>
      <!-- 悬停按钮 -->
      <div class="nodrag controller-menu">
        <div class="css-0">
          <button type="button" class="chakra-button delete">
            <b-icon name="delete"></b-icon>
            删除
          </button>
        </div>
      </div>
      <div class="nodrag trigger">
        <div class="trigger-handle">
          <Handle
            type="target"
            :position="Position.Left"
            :style="{
              width: '14px',
              height: '14px',
              borderWidth: '3.5px',
              backgroundColor: '#fff',
              borderColor: 'rgb(156, 162, 168)',
            }"
          />
        </div>
        <div class="trigger-name">触发器</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  type: 'target',
})

const nodesData = useNodesData(() => connections.value[0]?.source)
</script>

<style scoped>
.end-node {
  min-width: 100px;
  max-width: 300px;
  background: var(--chakra-colors-white);
  border: 1px solid var(--chakra-colors-borderColor-base);
  border-radius: var(--chakra-radii-md);
  box-shadow: var(--chakra-shadows-1);
  &:hover {
    box-shadow: var(--chakra-shadows-4);
  }
}
.end-node-inner {
  position: relative;
  padding: 14px 18px;
  word-wrap: break-word;
  .top-box {
    display: flex;
    align-items: center;
    .chakra-image {
      border-radius: 0px;
      width: 30px;
      height: 30px;
      font-size: 26px;
      padding: 1px;
      color: #dd6a5e;
    }
    .title {
      margin-left: 8px;
      font-size: 16px;
    }
  }
  .desc {
    font-size: var(12px);
    color: #485264;
    flex: 1 0 0px;
    padding: 6px 0;
  }
  .trigger {
    display: flex;
    cursor: default;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-top: 8px;
    .trigger-handle {
      position: absolute;
      top: 50%;
      left: -18px;
      transform: translate(0px, -50%);
    }
  }
}

.controller-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -20px;
  right: 0px;
  transform: translateX(90%);
  padding: 20px 10px 20px 20px;
  .chakra-button {
    cursor: pointer;
    display: inline-flex;
    appearance: none;
    align-items: center;
    justify-content: center;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    outline: transparent solid 2px;
    outline-offset: 2px;
    line-height: 1.2;
    border-radius: 8px;
    font-weight: 400;
    height: 24px;
    min-width: 20px;
    font-size: 12px;
    padding-inline: 8px;
    padding-top: 0px;
    padding-bottom: 0px;
    color: #485264;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-color: #dfe2ea;
    background: #fff;
    transition: background 0.1s ease 0s;
    box-shadow: rgba(19, 51, 107, 0.08) 0px 0px 1px 0px, rgba(19, 51, 107, 0.05) 0px 1px 2px 0px;
    &.delete {
      &:hover {
        color: var(--bin-color-danger-light1);
        background: var(--bin-color-danger-light6);
        border-color: var(--bin-color-danger-light2);
      }
    }
  }
}
</style>
