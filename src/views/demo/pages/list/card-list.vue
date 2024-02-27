<template>
  <page-wrapper desc="卡片类型的列表，这里仅做示例，实际开发需根据业务进行调整开发。">
    <div class="card-list-wrap">
      <div class="card-item">
        <b-button icon="plus" dashed style="height: 175px; width: 100%">新增项目</b-button>
      </div>
      <div v-for="item in list" :key="item.id" class="card-item">
        <app-item :styles="{ width: '100%', height: '175px', margin: '0' }" :item="item"></app-item>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import useTable from '@/hooks/service/useTable'
import { getProjectList } from '@/api/modules/list.api'

export default {
  name: 'CardList',
  setup() {
    const { getListData, list } = useTable(getProjectList)

    // 执行一次内容
    getListData()
    return {
      list,
    }
  },
}
</script>

<style scoped>
.card-list-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: -8px -8px 0;

  .card-item {
    width: 33.33%;
    padding: 8px;
  }
}
</style>
