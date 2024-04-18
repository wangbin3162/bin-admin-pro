<template>
  <div>
    <button type="button" class="chakra-button" :class="{ 'is-hide': !show }" @click="show = true">
      <svg viewBox="0 0 16 16" focusable="false" class="chakra-icon css-yubj9j" aria-hidden="true">
        <path
          d="M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
          fill-rule="evenodd"
          fill="currentColor"
        ></path>
      </svg>
    </button>
    <aside class="drag-panel" :class="{ 'is-hide': !show }">
      <div class="description" flex="main:justify cross:center">
        <div class="title">你可以拖拽这些节点到画布</div>
        <div class="back" @click="show = false">
          <svg
            class="chakra-icon css-cwl0hy"
            viewBox="0 0 1025 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="64.063"
            height="64"
            focusable="false"
            aria-hidden="true"
            style="width: 14px"
          >
            <path
              d="M533.353 682.285c0-.03.06-.06.06-.09-.24 0-.27.03-.06.09zM40.177 555.008l314.398 314.398c27.046 27.046 70.927 27.046 97.943 0 27.045-26.985 27.045-70.867 0-97.912L256.33 575.277h665.63c38.25 0 69.24-31.021 69.24-69.24 0-38.28-31.02-69.27-69.24-69.27h-665.6L452.548 240.58c27.045-27.016 27.045-70.927 0-97.943-13.523-13.523-31.262-20.3-49.002-20.3-17.709 0-35.448 6.777-48.94 20.3L40.175 457.065c-27.075 27.046-27.075 70.867 0 97.943z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="nodes">
        <div
          class="node"
          :draggable="true"
          v-for="(item, key) in NodeInfo"
          :key="key"
          @dragstart="onDragStart($event, NodeType[key])"
        >
          <b-icon
            class="chakra-image"
            :name="NodeInfo[key].icon"
            :color="NodeInfo[key].iconColor"
          />
          <div class="info">
            <div class="title">{{ NodeInfo[key].title }}</div>
            <div class="desc">{{ NodeInfo[key].desc }}</div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useDragDrop from './hooks/useDragDrop'
import { NodeType, NodeInfo } from './hooks/Job'

const { onDragStart } = useDragDrop()
const show = ref(false)
</script>

<style scoped>
.chakra-button {
  display: inline-flex;
  cursor: pointer;
  appearance: none;
  align-items: center;
  justify-content: center;
  user-select: none;
  white-space: nowrap;
  vertical-align: middle;
  outline: transparent solid 2px;
  outline-offset: 2px;
  line-height: 1.2;
  font-size: 16px;
  padding-inline: 0px;
  height: 36px;
  width: 36px;
  background: #3370ff;
  color: #fff;
  border: 0;
  padding: 0;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 20px;
  transform: rotate(90deg);
  transition: all 0.2s ease 0s;
  z-index: 1;
  box-shadow: rgb(133, 177, 255) 2px 2px 6px;
  > svg {
    width: 24px;
    height: 24px;
  }
  &.is-hide {
    transform: rotate(135deg);
  }
}
.drag-panel {
  display: flex;
  z-index: 3;
  flex-direction: column;
  position: absolute;
  top: 10px;
  left: 0px;
  width: 300px;
  padding: 20px 16px;
  height: calc(100% - 20px);
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 0px 20px;
  border-radius: 0px 10px 10px 0px;
  transition: all 0.2s ease 0s;
  user-select: none;
  opacity: 1;
  &.is-hide {
    transform: translateX(-100%);
    opacity: 0;
  }
  .description {
    margin-bottom: 16px;
    .title {
      background: #f0f1f6;
      padding: 5px 16px;
      box-shadow: 0px 0px 1px 0px rgba(19, 51, 107, 0.15), 0px 1px 2px 0px rgba(19, 51, 107, 0.1);
      color: var(--bin-color-primary);
    }
    .back {
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
      padding-inline: 14px;
      background: #f0f1f6;
      padding: 0px;
      width: 26px;
      height: 26px;
    }
  }
  .nodes {
    .node {
      display: flex;
      align-items: center;
      padding: 10px 8px;
      cursor: pointer;
      border-radius: 4px;
      margin-bottom: 16px;
      transition: 0.2s;
      &:hover {
        background-color: #f6f4f8;
      }
      .chakra-image {
        border-radius: 0px;
        width: 34px;
        height: 34px;
        padding: 1px;
        font-size: 26px;
      }
      .info {
        margin-left: 8px;
        .desc {
          color: #667085;
          font-size: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
