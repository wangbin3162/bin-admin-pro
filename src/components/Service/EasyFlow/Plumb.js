import { deepMerge, deepCopy } from '@/utils/util'
// import { jsPlumb } from 'jsplumb'
import './jsplumb'
import setting from './setting' // 默认设置集合

export default class Plumb {
  constructor(data) {
    // eslint-disable-next-line no-undef
    this.jsplumb = jsPlumb.getInstance()
    this.init(data)
  }

  init(flowData) {
    this.jsplumb.ready(() => {
      // 导入默认配置
      this.jsplumb.importDefaults(setting.jsplumbSetting)
      // 会使整个jsPlumb立即重绘。
      this.jsplumb.setSuspendDrawing(false, true)
      // 初始化节点
      this.loadEasyFlow(flowData)

      this.jsplumb.setContainer(document.querySelector('#efContainer'))
    })
  }

  // 初始化节点
  loadEasyFlow(flowData) {
    const { nodeList, lineList } = flowData

    const sourceOptions = deepMerge(deepCopy(setting.jsplumbSourceOptions), {})
    const targetOptions = deepMerge(deepCopy(setting.jsplumbTargetOptions), {})

    // 初始化节点
    for (let i = 0; i < nodeList.length; i++) {
      let node = nodeList[i]
      // 设置源点，可以拖出线连接其他节点
      this.jsplumb.makeSource(node.id, sourceOptions)
      // 设置目标点，其他源点拖出的线可以连接该节点
      this.jsplumb.makeTarget(node.id, targetOptions)
      if (!node.viewOnly) {
        this.jsplumb.draggable(node.id, {
          containment: 'parent',
          // stop: el => {
          //   // 拖拽节点结束后的对调
          //   console.log('拖拽结束: ', el)
          // },
        })
      }
    }

    // 初始化连线
    for (let i = 0; i < lineList.length; i++) {
      let line = lineList[i]
      let connParam = {
        source: line.from,
        target: line.to,
        label: line.label ? line.label : '',
        connector: line.connector ? line.connector : '',
        anchors: line.anchors ? line.anchors : undefined,
        paintStyle: line.paintStyle ? line.paintStyle : undefined,
      }
      this.jsplumb.connect(connParam, setting.jsplumbConnectOptions)
    }
  }

  // 获取连线点击的from和to
  getConnections(from, to) {
    return this.jsplumb.getConnections({
      source: from,
      target: to,
    })[0]
  }

  // 重画
  repaint() {
    this.jsplumb.repaint()
  }
}
