<template>
  <page-wrapper title="Pivot Table" desc="交叉表，根据不同配置动态获取不同的表格显示。">
    <b-collapse-wrap title="Pivot (drag & drop UI + PivotTable)" shadow="none">
      <div class="p10">
        Pivot
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import data from './data'
import dataGdp from './data-gdp'

const dataGdpFlattened = []
dataGdp.forEach(item => {
  dataGdpFlattened.push({ country: item.country, year: item.year, type: 'count', count: item.count })
  dataGdpFlattened.push({ country: item.country, year: item.year, type: 'gdp', gdp: item.gdp })
})

export default {
  name: 'PivotDemo',
  components: { PageWrapper },
  data() {
    return {
      data,
      asyncData: [],
      dataGdpFlattened,
      availableFieldKeys: [],
      rowFieldKeys: ['country', 'gender'],
      colFieldKeys: ['year'],
      reducer: (acc, item) => acc + item.count,
      defaultShowSettings: true,
      isDataLoading: false,
    }
  },
}
</script>
