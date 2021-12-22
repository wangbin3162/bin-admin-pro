<template>
  <b-popover
    placement="bottom"
    width="300px"
    popper-class="weather-box"
    trigger="hover"
  >
    <div class="global-header-trigger" flex="cross:center">
      <img v-if="weather.icon" :src="getSimpleIconColor(weather.icon)" alt="" width="26" height="26">
    </div>
    <template #content>
      <div class="weather-content">
        <div class="city mb-5" flex="main:justify"><span>徐州市</span><span>{{ currentDate }}</span></div>
        <div class="mb-5" flex="cross:center">
          <img v-if="weather.icon" :src="getIconColor(weather.icon)" class="mr-5" alt="" width="64" height="64">
          <div class=" weather-text">
            <div class="temp">{{ weather.temp }}°<span class="f-s-12">(实时)</span></div>
            <p class="weather-title">
              {{ weather.text }}
              <span></span>
              {{ weather.windDir }} {{ weather.windScale }}级
            </p>
          </div>
          <div class="air-tag" :style="{background:getAirColor(air.aqi)}">
            <span>{{ air.aqi }}</span>&nbsp;
            <span>{{ air.category }}</span>
          </div>
        </div>
        <div class="weather-desc mb-5">
          <p class="weather-title t-center f-s-12">
            相对湿度: {{ weather.humidity }}%
            <span></span>
            体感温度: {{ weather.feelsLike }}°
            <span></span>
            PM2.5: {{ air.pm2p5 }}
          </p>
        </div>
        <div class="weather-daily" v-if="daily.length>0">
          <div
            v-for="(day,index) in daily"
            :key="index"
            class="daily-item"
          >
            <div>{{ day.date }}</div>
            <img v-if="day.icon" :src="getIconColor(day.icon)" alt="" width="28" :title="day.text">
            <div>{{ day.temp }}</div>
            <div>{{ day.text }}</div>
          </div>
        </div>
      </div>
    </template>
  </b-popover>
</template>

<script>
import { Utils } from 'bin-ui-next'
import { getCDNPath } from '@/utils/env'
import axios from 'axios'
import { ref } from 'vue'

const KEY = '9ff1ccd697f149429674a860034faf66'
const LOCATION = '101190801'
const PARAMS = { location: LOCATION, key: KEY }

/**
 * 天气组件采用新的和风天气api，默认查询地址即为徐州市,
 * 徐州市城市location:101190801
 * 需要更换城市的自行查询，或调用地址动态查询，这里暂时固定为徐州市
 * 模糊查询地址：https://geoapi.qweather.com/v2/city/lookup?location=xuzhou&key=9ff1ccd697f149429674a860034faf66
 * 天气图标使用cdn地址，这里默认设置
 */
export default {
  name: 'Weather',
  setup() {
    const weather = ref({
      text: '', // 天气状况的文字描述，包括阴晴雨雪等天气状态的描述,
      icon: '', // 天气状况和图标的代码
      temp: '', // 温度
      feelsLike: '', // 体感温度
      windDir: '', // 风向
      windScale: '', // 风力等级
      humidity: '', // 相对湿度
    })
    const air = ref({
      aqi: '', // 空气质量指数
      level: '', // 空气质量指数
      category: '', // 空气质量指数级别
      primary: '', // 空气质量的主要污染物，空气质量为优时，返回值为NA
      pm2p5: '', // PM2.5,
    })
    const daily = ref([])  // 3天预报 tempMax,tempMin,iconDay,textDay

    // 初始化城市及天气信息
    async function initData() {
      await getCityWeather()
      await getCityAir()
      await get3DayWeather()
    }

    // 获取城市Weather
    async function getCityWeather() {
      try {
        const { data } = await axios.get('https://devapi.qweather.com/v7/weather/now', { params: PARAMS })
        const { now } = data
        weather.value = { ...now }
      } catch (e) {
        console.log(e)
      }
    }

    // 获取城市空气质量
    async function getCityAir() {
      try {
        const { data } = await axios.get('https://devapi.qweather.com/v7/air/now', { params: PARAMS })
        const { now } = data
        air.value = { ...now }
      } catch (e) {
        console.log(e)
      }
    }

    // 三天天气预报
    async function get3DayWeather() {
      try {
        const { data } = await axios.get('https://devapi.qweather.com/v7/weather/3d', { params: PARAMS })
        daily.value = data.daily.map(i => ({
          date: Utils.util.parseTime(i.fxDate, '{d}'),
          icon: i.iconDay,
          text: i.textDay,
          temp: `${i.tempMin}° ~ ${i.tempMax}°`,
        }))
        console.log(daily.value)
      } catch (e) {
        console.log(e)
      }
    }

    // 获取空气质量颜色
    function getAirColor(aqi) {
      const num = +aqi
      if (num <= 50) {
        return '#52c41a'
      } else if (num <= 100) {
        return '#ffff00'
      } else if (num <= 150) {
        return '#fa8c16'
      } else if (num <= 200) {
        return '#f5222d'
      } else if (num <= 300) {
        return '#722ed1'
      }
      return '#93141b'
    }

    // 带颜色的icon图标
    function getIconColor(icon) {
      return getCDNPath(`/weather/weather-icon-S2/64/${icon}.png`)
    }

    // 带颜色的icon图标
    function getSimpleIconColor(icon) {
      return getCDNPath(`/weather/weather-icon-S1/color-64/${icon}.png`)
    }

    initData()

    return {
      weather,
      air,
      daily,
      getIconColor,
      getSimpleIconColor,
      getAirColor,
      currentDate: Utils.util.parseTime(new Date(), '{y}-{m}-{d} 周{a}'),
    }
  },
}
</script>

<style lang="stylus">
.weather-content {
  .city {

  }
  .weather-desc {
    border-top: 1px solid rgba(0, 0, 0, .1);
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding: 5px 0;
  }
  .weather-text {
    flex: 1;
    .temp {
      font-size: 18px;
      line-height: 24px;
    }
  }
  .weather-title {
    height: 20px;
    span {
      position: relative;
      margin: 0 4px;
      display: inline-block;
      height: 1em;
      width: 1px;
      vertical-align: middle;
      background-color: #fa8c16;
      top: -1px;
    }
  }
  .air-tag {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 12px;
    width: 90px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .weather-daily {
    display: flex;
    padding: 8px 0;
    .daily-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-right: 1px solid rgba(0, 0, 0, .1);
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
