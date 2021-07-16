import axios from 'axios'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Utils } from 'bin-ui-next'

/**
 * 天气 hook
 * 天气数据来源于 https://www.tianqiapi.com
 *
 air: "17"
 city: "徐州"
 cityid: "101190801"
 tem: "24"
 tem_day: "28"
 tem_night: "23"
 update_time: "12:20"
 wea: "阵雨"
 wea_img: "lei" [xue、lei、shachen、wu、bingbao、yun、yu、yin、qing]
 win: "东南风"
 win_meter: "3km/h"
 win_speed: "1级"
 */
export default function useWeather() {
  const store = useStore()
  const weaImgMap = {
    xue: require('@/assets/images/weather/xue-1.png'),
    lei: require('@/assets/images/weather/lei-1.png'),
    shachen: require('@/assets/images/weather/shachen-1.png'),
    wu: require('@/assets/images/weather/wu-1.png'),
    bingbao: require('@/assets/images/weather/bingbao-1.png'),
    yun: require('@/assets/images/weather/yun-1.png'),
    yu: require('@/assets/images/weather/yu-1.png'),
    yin: require('@/assets/images/weather/yin-1.png'),
    qing: require('@/assets/images/weather/qing-1.png')
  }
  const weaImgMapColor = {
    xue: require('@/assets/images/weather/xue.png'),
    lei: require('@/assets/images/weather/lei.png'),
    shachen: require('@/assets/images/weather/shachen.png'),
    wu: require('@/assets/images/weather/wu.png'),
    bingbao: require('@/assets/images/weather/bingbao.png'),
    yun: require('@/assets/images/weather/yun.png'),
    yu: require('@/assets/images/weather/yu.png'),
    yin: require('@/assets/images/weather/yin.png'),
    qing: require('@/assets/images/weather/qing.png')
  }
  axios.get('https://www.tianqiapi.com/free/day?appid=78873955&appsecret=19VQ9LC5').then(res => {
    const data = res.data
    const weather = {
      city: data.city,
      icon: weaImgMap[data.wea_img],
      iconColor: weaImgMapColor[data.wea_img],
      wea: data.wea,
      current: `${data.tem}℃(实时)`,
      tem: `${data.tem_night}℃ ~ ${data.tem_day}℃`,
      wind: `${data.win} ${data.win_speed}`,
      air: data.air,
      airText: getAirObj(data.air).title,
      airColor: getAirObj(data.air).color
    }
    store.dispatch('app/setWeather', weather)
  })

  function getAirObj(num) {
    if (num <= 50) {
      return { color: '#52c41a', title: '优' }
    } else if (num <= 100) {
      return { color: '#97dc76', title: '良' }
    } else if (num <= 150) {
      return { color: '#fa8c16', title: '轻度污染' }
    } else if (num <= 200) {
      return { color: '#f74e57', title: '中度污染' }
    } else if (num <= 200) {
      return { color: '#dd1f29', title: '重度污染' }
    }
    return { color: '#93141b', title: '严重污染' }
  }

  const weather = computed(() => store.state.app.weather)
  return {
    weather,
    currentDate: Utils.util.parseTime(new Date(), '{y}-{m}-{d} 周{a}')
  }
}
