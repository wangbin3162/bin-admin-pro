import img0 from '@/assets/images/db/000.png'
import img1 from '@/assets/images/db/001.png'
import img2 from '@/assets/images/db/002.png'
import img3 from '@/assets/images/db/003.png'
import img4 from '@/assets/images/db/004.png'
import { Utils } from 'bin-ui-next'

const { mixWhite } = Utils.color

// 图标
export const ICON_MAP = {
  QZ: img1,
  CS: img2,
  ZX: img3,
  OTHER: img4,
}

// 颜色
export const COLOR_MAP = {
  QZ: '#1089ff',
  CS: '#52c41a',
  ZX: '#fcba73',
  OTHER: '#8e58da',
}

export const LIBRAY_MAP = {
  QZ: '前置库',
  CS: '贴源库',
  ZX: '中心库',
  OTHER: '专题库',
}

export function getMockData(data) {
  // 前置库,贴源,中心,
  const commonLibray = ['QZ', 'CS', 'ZX']

  const relationMap = {
    QZ: [],
    CS: [],
    ZX: [],
    OTHER: [],
  }

  data.nodeList.forEach(item => {
    // 取第一个逗号前的内容,如有的话
    const index = item.groupCode.indexOf(',')
    const groupCode = index === -1 ? item.groupCode : item.groupCode.slice(0, index)

    // 如果当前节点是有关系连接的内容,那么取对应值的内容去进行填充
    const includedKey = commonLibray.includes(groupCode)
    // 判断是否是其他库
    const nodeType = includedKey ? groupCode : 'OTHER'
    const category = LIBRAY_MAP[nodeType]
    relationMap[nodeType]?.push({
      id: item.id,
      name: item.name,
      linkType: item.linkType,
      // icon: ICON_MAP[nodeType],
      color: mixWhite(COLOR_MAP[nodeType], 0.5),
      nodeType,
      category,
      isLeaf: true,
    })
  })

  // 扩展数据中台中间节点，和4个库的节点
  const mapData = {
    id: 'data-center',
    nodeType: 'root',
    name: '数据中台',
    img: img0,
    children: [
      {
        id: 'QZ',
        nodeType: 'group',
        name: LIBRAY_MAP.QZ,
        category: LIBRAY_MAP.QZ,
        color: COLOR_MAP.QZ,
        img: ICON_MAP.QZ,
        children: [...relationMap.QZ],
      },
      {
        id: 'CS',
        nodeType: 'group',
        name: LIBRAY_MAP.CS,
        category: LIBRAY_MAP.CS,
        color: COLOR_MAP.CS,
        img: ICON_MAP.CS,
        children: [...relationMap.CS],
      },
      {
        id: 'ZX',
        nodeType: 'group',
        name: LIBRAY_MAP.ZX,
        category: LIBRAY_MAP.ZX,
        color: COLOR_MAP.ZX,
        img: ICON_MAP.ZX,
        children: [...relationMap.ZX],
      },
      {
        id: 'OTHER',
        nodeType: 'group',
        name: LIBRAY_MAP.OTHER,
        category: LIBRAY_MAP.OTHER,
        color: COLOR_MAP.OTHER,
        img: ICON_MAP.OTHER,
        children: [...relationMap.OTHER],
      },
    ],
  }

  // 需要返回4个库,分别喂前置,贴源,中心,专题库
  // const all = [...relationMap.QZ, ...relationMap.CS, ...relationMap.ZX, ...relationMap.OTHER]

  // const mapData = {
  //   nodes: all,
  //   edges: data.lineList.map(i => ({ source: i.from, target: i.to })),
  // }

  console.log(mapData)

  return mapData
}
