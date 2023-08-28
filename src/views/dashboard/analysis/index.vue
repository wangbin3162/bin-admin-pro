<template>
  <div class="analysis-wrap">
    <div class="analysis-top">
      <b-row :gutter="16">
        <b-col span="6">
          <top-card header="注册用户数" :count="21189" :loading="loading">
            <template #right>
              <b-tag type="success">月</b-tag>
            </template>
            <b-charts height="70px" :options="topCharts1" />
            <template #bottom>
              <span>日注册数</span>
              <span>343个</span>
            </template>
          </top-card>
        </b-col>
        <b-col span="6">
          <top-card header="发布文章数" :count="2314" :loading="loading">
            <template #right>
              <b-tag type="primary">月</b-tag>
            </template>
            <b-charts height="70px" :options="topCharts2" />
            <template #bottom>
              <span>日户反馈数</span>
              <span>5</span>
            </template>
          </top-card>
        </b-col>
        <b-col span="6">
          <top-card header="用户反馈数" :count="322" :loading="loading">
            <template #right>
              <b-tag type="warning">日</b-tag>
            </template>
            <b-charts height="70px" :options="topCharts3" />
            <template #bottom>
              <span>日反馈</span>
              <span>34</span>
            </template>
          </top-card>
        </b-col>
        <b-col span="6">
          <top-card header="网站访问量" :count="532121" :loading="loading">
            <template #right>
              <b-tag type="danger">次</b-tag>
            </template>
            <b-charts height="70px" :options="topCharts4" />
            <template #bottom>
              <span>日访问量</span>
              <span>3242</span>
            </template>
          </top-card>
        </b-col>
      </b-row>
    </div>
    <div class="analysis-center">
      <b-card :bordered="false" shadow="never" :body-style="{ padding: '10px' }">
        <template #header>
          <iconfont icon="linechart" color="primary" bg round></iconfont>
          &nbsp;
          <span>最近一周访问情况</span>
        </template>
        <b-skeleton :loading="loading" animation>
          <template #template>
            <b-skeleton style="margin-bottom: 16px" />
            <b-skeleton />
          </template>
          <template #default>
            <b-charts height="350px" :options="centerChart" />
          </template>
        </b-skeleton>
      </b-card>
    </div>
    <div class="analysis-bottom">
      <b-row :gutter="16">
        <b-col span="8">
          <b-card :bordered="false" shadow="never" :body-style="{ padding: '10px' }">
            <template #header>
              <iconfont icon="smile" color="warning" bg round></iconfont>
              &nbsp;
              <span>服务类别</span>
            </template>
            <b-skeleton :loading="loading" animation>
              <template #template>
                <b-skeleton style="margin-bottom: 16px" />
                <b-skeleton />
              </template>
              <template #default>
                <b-charts height="300px" :options="radarOptions" />
              </template>
            </b-skeleton>
          </b-card>
        </b-col>
        <b-col span="8">
          <b-card :bordered="false" shadow="never" :body-style="{ padding: '10px' }">
            <template #header>
              <iconfont icon="layout" color="info" bg round></iconfont>
              &nbsp;
              <span>页面堆叠</span>
            </template>
            <b-skeleton :loading="loading" animation>
              <template #template>
                <b-skeleton style="margin-bottom: 16px" />
                <b-skeleton />
              </template>
              <template #default>
                <b-charts height="300px" :options="barOptions" />
              </template>
            </b-skeleton>
          </b-card>
        </b-col>
        <b-col span="8">
          <b-card :bordered="false" shadow="never" :body-style="{ padding: '10px' }">
            <template #header>
              <iconfont icon="flag" color="danger" bg round></iconfont>
              &nbsp;
              <span>访问占比</span>
            </template>
            <b-skeleton :loading="loading" animation>
              <template #template>
                <b-skeleton style="margin-bottom: 16px" />
                <b-skeleton />
              </template>
              <template #default>
                <b-charts height="300px" :options="roseOptions" />
              </template>
            </b-skeleton>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useChartsColor } from '@/hooks/useCharts'
import TopCard from '@/views/dashboard/analysis/top-card.vue'

export default {
  name: 'Analysis',
  components: { TopCard },
  setup() {
    const color = useChartsColor()
    const loading = ref(true)
    const topCharts1 = ref({
      color,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        show: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          name: '用户注册数',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [22, 34, 11, 24, 22, 8, 12],
        },
      ],
    })
    const topCharts2 = ref({
      color: ['#5B8FF9', '#9661BC'],
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        show: false,
      },
      yAxis: { show: false },
      grid: {
        left: -20,
        right: 3,
        bottom: 0,
        top: 0,
        containLabel: true,
      },
      tooltip: { trigger: 'axis' },
      series: [
        {
          name: '发布',
          type: 'line',
          data: [40, 32, 16, 53, 70, 16, 96],
        },
        {
          name: '草稿',
          type: 'line',
          data: [25, 18, 99, 35, 66, 94, 24],
        },
      ],
    })
    const topCharts3 = ref({
      color,
      tooltip: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        height: 60,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        show: false,
        max: 22,
      },
      yAxis: { type: 'category', show: false },
      series: [
        {
          name: '反馈数量',
          type: 'bar',
          stack: '总量',
          data: [12],
        },
        {
          name: '回复数量',
          type: 'bar',
          stack: '总量',
          data: [10],
        },
      ],
    })
    const topCharts4 = ref({
      tooltip: {},
      grid: { left: '5%', right: '5%' },
      xAxis: {
        show: false,
        data: ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8', '7.9', '7.10'],
      },
      yAxis: { show: false },
      series: [
        {
          name: '访问数量',
          type: 'bar',
          data: [234, 634, 234, 764, 88, 235, 179, 152, 200, 334],
          itemStyle: { color: '#fa6b9b', borderRadius: 3 },
        },
      ],
    })
    const centerChart = ref({
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: { show: false },
      },
      grid: {
        left: 20,
        right: 30,
        bottom: 20,
        top: 50,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        padding: [5, 10],
      },
      yAxis: { axisTick: { show: false } },
      legend: { right: 0, data: ['浏览量', '实际访客'] },
      series: [
        {
          name: '浏览量',
          itemStyle: { color: '#FF005A' },
          smooth: true,
          type: 'line',
          data: [100, 120, 161, 134, 105, 160, 165],
        },
        {
          name: '实际访客',
          smooth: true,
          type: 'line',
          itemStyle: { color: '#3888fa' },
          areaStyle: { opacity: 0.1 },
          data: [120, 82, 91, 154, 162, 140, 145],
        },
      ],
    })
    const radarOptions = ref({
      color,
      tooltip: { trigger: 'axis' },
      radar: {
        radius: '66%',
        center: ['50%', '43%'],
        splitNumber: 8,
        splitArea: {
          areaStyle: {
            color: 'rgba(127,155,184,0.3)',
            opacity: 1,
            shadowBlur: 45,
            shadowColor: 'rgba(0,0,0,.5)',
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          { name: '行政' },
          { name: '管理' },
          { name: '科技' },
          { name: '服务' },
          { name: '开发' },
          { name: '市场' },
        ],
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['北京', '上海'],
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 13,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          data: [
            {
              value: [6000, 12000, 14000, 11000, 15000, 14000],
              name: '北京',
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: '上海',
            },
          ],
        },
      ],
    })
    const barOptions = ref({
      color,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: { show: false },
        },
      ],
      series: [
        {
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [179, 52, 200, 334, 390, 330, 220],
        },
        {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
        },
        {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [66, 52, 200, 334, 390, 330, 220],
        },
      ],
    })
    const roseOptions = ref({
      color,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['搜索引擎', '直接访问', '邮件营销', '联盟广告', '公众号'],
      },
      calculable: true,
      series: [
        {
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: '搜索引擎' },
            { value: 332, name: '直接访问' },
            { value: 211, name: '邮件营销' },
            { value: 176, name: '联盟广告' },
            { value: 66, name: '公众号' },
          ],
        },
      ],
    })
    onMounted(() => {
      setTimeout(() => {
        loading.value = false
      }, 600)
    })
    return {
      loading,
      topCharts1,
      topCharts2,
      topCharts3,
      topCharts4,
      centerChart,
      radarOptions,
      barOptions,
      roseOptions,
    }
  },
}
</script>

<style scoped>
.analysis-wrap {
  padding: 16px;
  :deep(.bin-card__header) {
    color: var(--v-g-text-color);
  }
}
.analysis-center {
  margin: 16px 0;
}
</style>
