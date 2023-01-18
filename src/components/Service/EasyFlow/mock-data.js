import { deepCopy } from '@/utils/util'

let dataA = {
  name: '流程A',
  nodeList: [
    {
      id: 'nodeA',
      name: '流程A-节点A',
      type: 'task',
      left: '26px',
      top: '161px',
      ico: 'el-icon-user-solid',
    },
    {
      id: 'nodeB',
      name: '流程A-节点B',
      type: 'task',
      left: '340px',
      top: '161px',
      ico: 'el-icon-goods',
    },
    {
      id: 'nodeC',
      name: '流程A-节点C',
      type: 'task',
      left: '739px',
      top: '161px',
      ico: 'el-icon-present',
    },
  ],
  lineList: [
    {
      from: 'nodeA',
      to: 'nodeB',
    },
    {
      from: 'nodeB',
      to: 'nodeC',
    },
  ],
}

let dataB = {
  name: '流程B',
  nodeList: [
    {
      id: 'nodeA',
      name: '节点A-不可拖拽',
      type: 'task',
      left: '18px',
      top: '223px',
      ico: 'user',
      state: 'success',
      viewOnly: true,
    },
    {
      id: 'nodeB',
      type: 'task',
      name: '流程B-节点B',
      left: '351px',
      top: '96px',
      ico: 'bug',
      state: 'error',
    },
    {
      id: 'nodeC',
      name: '流程B-节点C',
      type: 'task',
      left: '354px',
      top: '351px',
      ico: 'index',
      state: 'warning',
    },
    {
      id: 'nodeD',
      name: '流程B-节点D',
      type: 'task',
      left: '723px',
      top: '215px',
      ico: 'printer',
      state: 'running',
    },
  ],
  lineList: [
    {
      from: 'nodeA',
      to: 'nodeB',
      label: '条件A',
    },
    {
      from: 'nodeA',
      to: 'nodeC',
      label: '条件B',
    },
    {
      from: 'nodeB',
      to: 'nodeD',
    },
    {
      from: 'nodeC',
      to: 'nodeD',
    },
  ],
}

let dataC = {
  name: '流程C',
  nodeList: [
    {
      id: 'nodeA',
      name: '流程C-节点A',
      type: 'task',
      left: '400px',
      top: '15px',
      ico: 'el-icon-user-solid',
    },
    {
      id: 'nodeB',
      name: '流程C-节点B',
      type: 'task',
      left: '400px',
      top: '200px',
      ico: 'el-icon-goods',
    },
    {
      id: 'nodeC',
      name: '流程C-节点C',
      type: 'task',
      left: '400px',
      top: '378px',
      ico: 'el-icon-present',
    },
  ],
  lineList: [
    {
      from: 'nodeA',
      to: 'nodeB',
    },
    {
      from: 'nodeB',
      to: 'nodeC',
    },
  ],
}

let dataD = {
  name: '流程D',
  nodeList: [
    {
      id: 'nodeA',
      name: '流程D-节点A',
      type: 'task',
      left: '18px',
      top: '223px',
      ico: 'el-icon-user-solid',
      state: 'success',
    },
    {
      id: 'nodeB',
      type: 'task',
      name: '流程D-节点B',
      left: '351px',
      top: '96px',
      ico: 'el-icon-goods',
      state: 'error',
    },
    {
      id: 'nodeC',
      name: '流程D-节点C',
      type: 'task',
      left: '354px',
      top: '351px',
      ico: 'el-icon-present',
      state: 'warning',
    },
    {
      id: 'nodeD',
      name: '流程D-节点D',
      type: 'task',
      left: '723px',
      top: '215px',
      ico: 'el-icon-present',
      state: 'running',
    },
  ],
  lineList: [
    {
      from: 'nodeA',
      to: 'nodeB',
      label: '直线,自定义线样式,固定锚点',
      connector: 'Straight',
      anchors: ['Top', 'Bottom'],
      paintStyle: { strokeWidth: 2, stroke: '#1879FF' },
    },
    {
      from: 'nodeA',
      to: 'nodeC',
      label: '贝塞尔曲线,固定锚点',
      connector: 'Bezier',
      anchors: ['Bottom', 'Left'],
    },
    {
      from: 'nodeB',
      to: 'nodeD',
      label: '默认连线样式,动态锚点',
    },
    {
      from: 'nodeC',
      to: 'nodeD',
      label: '默认连线样式,动态锚点',
    },
    {
      from: 'nodeC',
      to: 'nodeC',
      label: '自连接',
    },
  ],
}

// 获取模拟数据
export default function (type = 'dataB') {
  return deepCopy({ dataA, dataB, dataC, dataD }[type])
}
