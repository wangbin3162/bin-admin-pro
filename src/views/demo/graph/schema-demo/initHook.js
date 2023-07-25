import img1 from '@/assets/images/word/temp_1.png'
import img2 from '@/assets/images/word/temp_2.png'
import img3 from '@/assets/images/word/temp_3.png'
import img4 from '@/assets/images/word/temp_4.png'
import img5 from '@/assets/images/word/temp_5.png'
import img6 from '@/assets/images/word/temp_6.png'
import img7 from '@/assets/images/word/temp_7.png'
import img8 from '@/assets/images/word/temp_8.png'

const images = [img1, img2, img3, img4, img5, img6, img7, img8]

function initData() {
  const list = []
  // 模拟测试数据
  for (let i = 1; i <= 8; i++) {
    list.push({
      id: Math.floor(Math.random() * 10000),
      name: `图片_${i}`,
      bgInfo: {
        url: images[i - 1],
        width: 2447,
        height: 3461,
      },
      comps: [],
    })
  }
  return list
}

export { initData }
