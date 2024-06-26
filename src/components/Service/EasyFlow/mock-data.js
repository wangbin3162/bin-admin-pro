import { deepCopy } from '@/utils/util'

let dataA = {
  name: '流程A',
  nodeList: [
    {
      id: 'nodeA',
      name: '流程A-节点A',
      type: 'switch',
      left: '26px',
      top: '161px',
    },
    {
      id: 'nodeB',
      name: '流程A-节点B',
      type: 'common',
      left: '340px',
      top: '161px',
    },
    {
      id: 'nodeC',
      name: '流程A-节点C',
      type: 'common',
      left: '739px',
      top: '161px',
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
      type: 'common',
      left: '18px',
      top: '223px',
      ico: 'user',
      state: 'success',
      viewOnly: true,
    },
    {
      id: 'nodeB',
      type: 'common',
      name: '流程B-节点B',
      left: '351px',
      top: '96px',
      ico: 'bug',
      state: 'error',
    },
    {
      id: 'nodeC',
      name: '流程B-节点C',
      type: 'common',
      left: '354px',
      top: '351px',
      ico: 'index',
      state: 'warning',
    },
    {
      id: 'nodeD',
      name: '流程B-节点D',
      type: 'common',
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
      type: 'common',
      left: '400px',
      top: '15px',
      ico: 'smile',
    },
    {
      id: 'nodeB',
      name: '流程C-节点B',
      type: 'common',
      left: '400px',
      top: '200px',
      ico: 'smile',
    },
    {
      id: 'nodeC',
      name: '流程C-节点C',
      type: 'common',
      left: '400px',
      top: '378px',
      ico: 'smile',
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
      type: 'common',
      left: '18px',
      top: '223px',
      ico: 'smile',
      state: 'success',
    },
    {
      id: 'nodeB',
      type: 'common',
      name: '流程D-节点B',
      left: '351px',
      top: '96px',
      ico: 'smile',
      state: 'error',
    },
    {
      id: 'nodeC',
      name: '流程D-节点C',
      type: 'common',
      left: '354px',
      top: '351px',
      ico: 'smile',
      state: 'warning',
    },
    {
      id: 'nodeD',
      name: '流程D-节点D',
      type: 'common',
      left: '723px',
      top: '215px',
      ico: 'smile',
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
      label: '流程图线,动态锚点',
      connector: ['Flowchart', { curviness: 50 }],
    },
    {
      from: 'nodeC',
      to: 'nodeD',
      label: '状态机,动态锚点',
      connector: ['StateMachine', { margin: 8, curviness: 10, proximityLimit: 80 }],
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
