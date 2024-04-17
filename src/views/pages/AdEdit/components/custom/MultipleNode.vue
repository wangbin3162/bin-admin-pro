<template>
  <div class="custom-node">
    <div class="custom-node-inner">
      <div class="top-box">
        <b-icon
          class="chakra-image"
          :name="NodeInfo.Multiple.icon"
          :color="NodeInfo.Multiple.iconColor"
        />
        <div class="title">{{ NodeInfo.Multiple.title }}</div>
      </div>

      <div class="desc">{{ NodeInfo.Multiple.desc }}</div>
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
            id="_MultipleA_target_"
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
            id="_MultipleA_source_"
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
        <b-form>
          <b-row gutter="16">
            <b-col span="12">
              <b-form-item label="并行数量">
                <b-input-number v-model="nodeModel.data.errorPairing" :step="1" :precision="0" />
              </b-form-item>
            </b-col>
            <b-col span="12">
              <b-form-item label="是否并行">
                <b-switch v-model="nodeModel.data.poly" />
              </b-form-item>
            </b-col>
          </b-row>
          <div style="line-height: 30px">并行任务</div>
          <div class="job-item" v-for="(item, index) in nodeModel.data.parallel" :key="index">
            <div class="job-item-title">
              <i
                class="b-iconfont b-icon-minus-circle-fill"
                :class="{ disabled: nodeModel.data.parallel.length === 1 }"
                title="删除"
                @click="removeJob(index)"
              ></i>
              任务&nbsp;{{ index + 1 }}
            </div>
            <div class="job-item-input">
              <b-input v-model="item.jobName"></b-input>
            </div>
          </div>
          <b-form-item style="margin-top: 16px">
            <b-button
              type="primary"
              icon="plus-circle"
              style="border-radius: 8px; width: 150px"
              @click="addJob"
            >
              添加一个任务
            </b-button>
          </b-form-item>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { CreateNewJob, NodeInfo } from '../../hooks/Job'
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

// 增加一个任务
function addJob() {
  nodeModel.value.data.parallel.push(CreateNewJob())
}

// 移除一个节点
function removeJob(index) {
  if (nodeModel.value.data.parallel.length === 1) return
  nodeModel.value.data.parallel.splice(index, 1)
}
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
  cursor: default;
  :deep(.bin-form-item) {
    margin-bottom: 8px;
  }
  .job-item {
    margin-top: 8px;
    .job-item-title {
      display: flex;
      align-items: center;
      height: 24px;
      margin-bottom: 8px;
      line-height: 1;
      .b-iconfont {
        margin-right: 8px;
        cursor: pointer;
        font-size: 16px;
        color: #485264;
        &:hover {
          color: var(--bin-color-danger);
        }
        &.disabled {
          cursor: not-allowed;
          color: #bcbdc1;
        }
      }
    }
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
