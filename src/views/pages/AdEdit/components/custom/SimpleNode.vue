<template>
  <div class="custom-node">
    <div class="custom-node-inner">
      <div class="top-box">
        <b-icon
          class="chakra-image"
          :name="NodeInfo.Simple.icon"
          :color="NodeInfo.Simple.iconColor"
        />
        <div class="title">{{ NodeInfo.Simple.title }}</div>
      </div>

      <div class="desc">{{ NodeInfo.Simple.desc }}</div>
      <!-- 悬停按钮 -->
      <div class="nodrag controller-menu">
        <div class="css-0">
          <button type="button" class="chakra-button delete" @click="deleteNode(node)">
            <b-icon name="delete"></b-icon>
            删除
          </button>
        </div>
      </div>

      <div class="nodrag trigger mt-8">
        <div class="trigger-handle">
          <Handle
            id="_SimpleA_target_"
            type="target"
            :position="Position.Left"
            :style="{
              width: '14px',
              height: '14px',
              borderWidth: '3.5px',
              backgroundColor: '#fff',
              borderColor: 'rgb(54, 173, 239)',
            }"
          />
        </div>
        <div class="trigger-name">触发器</div>

        <div class="trigger-handle-right">
          <Handle
            id="_SimpleA_source_"
            type="source"
            :position="Position.Right"
            :style="{
              width: '14px',
              height: '14px',
              borderWidth: '3.5px',
              backgroundColor: '#fff',
              borderColor: 'rgb(165, 88, 201)',
            }"
          />
        </div>
        <div class="trigger-name">执行任务结束</div>
      </div>
    </div>

    <div class="nowheel">
      <div class="middle-info">配置</div>
      <div class="edit-box nodrag">
        <b-form style="width: 200px">
          <b-form-item label="任务名称">
            <!-- <b-button type="primary" icon="select" style="border-radius: 8px; width: 180px">
            选择
          </b-button> -->
            <b-select v-model="nodeModel.data.jobId">
              <b-option label="任务1" value="job1" />
              <b-option label="任务2" value="job2" />
            </b-select>
          </b-form-item>
          <b-form-item label="错误处理">
            <b-select v-model="nodeModel.data.error">
              <b-option label="停止" value="stop" />
              <b-option label="继续" value="continue" />
            </b-select>
          </b-form-item>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { NodeInfo } from '../../hooks/Job'
import useNodes from '../../hooks/useNodes'

const emit = defineEmits(['update:node'])
const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
})

const { deleteNode } = useNodes()

const nodeModel = computed({
  get: () => props.node,
  set: val => emit('update:node', val),
})
</script>

<style scoped>
.custom-node {
  min-width: 350px;
  max-width: 600px;
  background: var(--chakra-colors-white);
  border: 1px solid var(--chakra-colors-borderColor-base);
  border-radius: var(--chakra-radii-md);
  box-shadow: var(--chakra-shadows-1);
  &:hover {
    box-shadow: var(--chakra-shadows-4);
    .controller-menu {
      display: flex;
    }
  }
}

.custom-node-inner {
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
    }
    .title {
      margin-left: 8px;
      font-size: 16px;
      line-height: 1;
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
    .trigger-handle {
      position: absolute;
      top: 50%;
      left: -18px;
      transform: translate(0px, -50%);
    }
    .trigger-handle-right {
      position: absolute;
      top: 50%;
      right: -18px;
      transform: translate(0px, -50%);
    }
  }
  &.divider {
    border-top: 2px solid var(--chakra-colors-borderColor-base);
  }
}

.middle-info {
  text-align: center;
  background: rgb(248, 248, 248);
  padding: 10px 0;
  border-top: 1px solid rgb(223, 226, 234);
  border-bottom: 1px solid rgb(223, 226, 234);
  font-size: 16px;
}

.edit-box {
  padding: 10px 14px;
  min-width: 350px;
  :deep(.bin-form-item) {
    margin-bottom: 8px;
  }
}
.controller-menu {
  display: none;
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
