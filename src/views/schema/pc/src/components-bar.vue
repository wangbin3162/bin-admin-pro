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
import { getComponents } from '../config/comonents.cfg'
import { ref } from 'vue'

export default {
  name: 'components-bar',
  setup(props) {
    const componentList = ref(getComponents('common'))
    return {
      componentList,
    }
  },
}
</script>

