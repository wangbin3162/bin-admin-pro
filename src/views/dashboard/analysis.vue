<template>
  <div>
    <b-button type="primary" @click="refresh">运行</b-button>
    <div style="width: 100%;height: 358px;border:1px solid #ddd;margin: 20px 0;">
      <b-split :default-percent="50">
        <template #left>
          <div class="left-container">
            <div id="chart1" style="width: 100%;height: 100%;padding-top:15px;position: relative;">
              <b-charts height="340px" ref="chart" :options="lineChartOption" />
            </div>
          </div>
        </template>
        <template #right>
          <div class="right-container">
            配置项:
            <b-ace-editor v-model="dataSource" @change="dataSourceChange" height="335" />
          </div>
        </template>
      </b-split>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Analysis',
  data() {
    return {
      lineChartOption: {
        tooltip: { trigger: 'axis' },
        title: { text: '默认折线图' },
        grid: { top: 80, right: 30 },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: { type: 'value' },
        series: [{
          type: 'line',
          name: '数量',
          data: [220, 315, 213, 432, 566, 143, 567, 356, 1200, 332, 900, 1010]
        }]
      },
      dataSource: ''
    }
  },
  created() {
    this.dataSource = JSON.stringify(this.lineChartOption, null, 2)
  },
  methods: {
    dataSourceChange(val) {
      try {
        this.lineChartOption = JSON.parse(val)
      } catch (e) {

      }
    },
    refresh() {
      if (this.$refs.chart) {
        this.$refs.chart.refresh()
      }
    }
  }
}
</script>

<style scoped>

</style>
