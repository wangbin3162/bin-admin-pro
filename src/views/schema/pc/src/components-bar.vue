<template>
  <div class="components-bar-container">
    <div class="components-panel">
      <div class="components-charts">
        <div
          v-for="(item,index) in componentList"
          :key="index"
          :data-index="index"
          class="components-item"
          draggable="true"
        >
          <b-tooltip :content="item.label">
            <div class="item-icon" :style="item.icon"></div>
          </b-tooltip>
        </div>
      </div>
      <div class="page-config-entry">
        <b-icon name="setting"></b-icon>
        页面设置
      </div>
    </div>
  </div>
</template>

<script>
import { getComponents } from './custom-component/comonents.cfg'
import { ref } from 'vue'

export default {
  name: 'components-bar',
  setup(props) {
    const componentList = ref(getComponents('common'))
    console.log(componentList.value)
    return {
      componentList,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/mixins.styl"
.components-bar-container {
  position: relative;
  display: flex;
  align-items: center;
  background: #2b3551;
  padding: 5px 0 5px 50px;
  height: 45px;
  border-right: 1px solid hsla(0, 0%, 100%, .1);
  .components-panel {
    .components-charts {
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, .15)
      .components-item {
        position: relative;
        margin: 0 2px;
        width: 35px;
        height: 35px;
        .item-icon {
          width: 70px;
          height: 70px;
          display: block;
          position: relative;
          left: 0;
          top: 0;
          background-image: url('@/assets/images/schema/schema.png');
          background-repeat: no-repeat;
          transform: scale(.5);
          transform-origin: left top;
          cursor: pointer;
          background-position: -304px -1035px;
        }
        &:hover {
          background-color: #0b1532;
        }
      }
    }
    .page-config-entry {
      position: absolute;
      top: 15px;
      right: 15px;
      color: hsla(0, 0%, 100%, .65);
      cursor: pointer;
    }
  }
}
</style>

