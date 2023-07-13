<template>
  <div class="layer-manager-wrap">
    <div
      v-for="com in comps"
      :key="com.id"
      class="layer-manager-item"
      :class="[
        {
          hovered: com.id === hoveredComId,
          selected: isSelected(com),
        },
      ]"
      @mouseenter="onEnter(com.id)"
      @mouseleave="onLeave"
      @click="selectCom(com)"
    >
      <span class="layer-item-span">
        <span class="layer-item-text" :title="com.alias">{{ com.alias }}</span>
      </span>

      <action-button
        type="text"
        icon="delete"
        tooltip="删除"
        confirm
        color="danger"
        message="确定删除当前组件吗？"
        @click="onDelete(com.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { comps, hoveredComId, selectedCom, hoverCom, selectCom, deleteCom } from '../store/useCom'

function isSelected(com) {
  return selectedCom.value && selectedCom.value.id === com.id
}

const onEnter = id => hoverCom(id)

const onLeave = () => hoverCom('')

const onDelete = id => deleteCom(id)
</script>

<style lang="stylus" scoped>
.layer-manager-wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100% - 45px);
  overflow-y: auto;
  line-height: 2;
  color: rgba(0, 0, 0, .65);
  list-style: none;
  user-select: none;
  flex: auto;
  flex-direction: column;
}
.layer-manager-item {
  position: relative;
  display: flex;

  width: 100%;
  height: 40px;
  padding: 0 10px;
  padding-left: 8px;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.2s;
  align-items: center;
  .layer-item-span {
    width: 124px;
    flex: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    .layer-item-text {
      flex: 0 1 auto;
      text-indent: 7px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 20px;
      line-height: 20px;
    }
  }
  &.hovered {
    color: #1089ff;
    background: rgba(14, 123, 230, 0.1);
  }
  &.selected {
    color: #fff;
    background: #1089ff;
  }
}
</style>
