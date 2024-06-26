import G6 from '@antv/g6'
import insertCss from 'insert-css'

const lightColors = [
  '#8FE9FF',
  '#87EAEF',
  '#FFC9E3',
  '#A7C2FF',
  '#FFA1E3',
  '#FFE269',
  '#BFCFEE',
  '#FFA0C5',
  '#D5FF86',
]
const darkColors = [
  '#7DA8FF',
  '#44E6C1',
  '#FF68A7',
  '#7F86FF',
  '#AE6CFF',
  '#FF5A34',
  '#5D7092',
  '#FF6565',
  '#6BFFDE',
]
const uLightColors = [
  '#CFF6FF',
  '#BCFCFF',
  '#FFECF5',
  '#ECFBFF',
  '#EAD9FF',
  '#FFF8DA',
  '#DCE2EE',
  '#FFE7F0',
  '#EEFFCE',
]
const uDarkColors = [
  '#CADBFF',
  '#A9FFEB',
  '#FFC4DD',
  '#CACDFF',
  '#FFD4F2',
  '#FFD3C9',
  '#EBF2FF',
  '#FFCBCB',
  '#CAFFF3',
]

const gColors = []

const unlightColorMap = new Map()

lightColors.forEach((lcolor, i) => {
  gColors.push('l(0) 0:' + lcolor + ' 1:' + darkColors[i])
  unlightColorMap.set(gColors[i], 'l(0) 0:' + uLightColors[i] + ' 1:' + uDarkColors[i])
})

const mapNodeSize = (nodes, propertyName, visualRange) => {
  let minp = 9999999999
  let maxp = -9999999999
  nodes.forEach(node => {
    minp = node[propertyName] < minp ? node[propertyName] : minp
    maxp = node[propertyName] > maxp ? node[propertyName] : maxp
  })
  const rangepLength = maxp - minp
  const rangevLength = visualRange[1] - visualRange[0]
  nodes.forEach(node => {
    node.size = ((node[propertyName] - minp) / rangepLength) * rangevLength + visualRange[0]
  })
}

export default class G6Creator {
  constructor(wrap, height, nodeClickFun) {
    if (!wrap) return
    this.onNodeClick = nodeClickFun
    this.container = document.getElementById(wrap)

    this.showNodes = []
    this.showEdges = []
    this.curShowNodes = []
    this.curShowEdges = []
    this.nodes = []
    this.edges = []
    this.nodeMap = new Map()
    this.edgesMap = new Map()
    this.curShowNodesMap = new Map()
    this.highlighting = false
    this.currentFocus = undefined

    this.opts = {
      width: this.container.scrollWidth,
      height: this.container.scrollHeight || height,
    }

    this.LIMIT_OVERFLOW_WIDTH = this.opts.width
    this.LIMIT_OVERFLOW_HEIGHT = this.opts.height

    this.registerComps()
    this.init()
    this.addEvents()
  }
  // 注册组件
  registerComps() {
    // 插入css
    insertCss(`
      .g6-minimap-wrap {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #fff;
        box-shadow: 0 0 0 1px #e2e2e2;
      }
      .g6-minimap-viewport {
        border: 2px solid rgb(25, 128, 255);
      }
      .g6-component-toolbar li i {
        font-size: 20px;
      }
      .g6-component-tooltip {
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        font-size: 12px;
        color: #000;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 10px 8px;
        box-shadow: rgb(174, 174, 174) 0px 0px 10px;
      }
    `)

    // 注册minimap
    this.minimap = new G6.Minimap({
      className: 'g6-minimap-wrap',
      size: [150, 100],
    })
    this.tooltip = new G6.Tooltip({
      offsetX: 10,
      offsetY: 10,
      fixToNode: [1, 0.5],
      // the types of items that allow the tooltip show up
      // 允许出现 tooltip 的 item 类型
      itemTypes: ['node'],
      // custom the tooltip's content
      // 自定义 tooltip 内容
      getContent: e => {
        const model = e.item.getModel()
        const outDiv = document.createElement('div')
        outDiv.style.width = 'fit-content'
        outDiv.style.height = 'fit-content'

        if (model.level > 0) {
          outDiv.innerHTML = `表名：${model.name}`
        } else {
          outDiv.innerHTML = `${model.name} (${model.childrenNum})`
        }
        return outDiv
      },
    })
    G6.registerNode(
      'bubble',
      {
        drawShape(cfg, group) {
          const r = cfg.size / 2
          const keyShape = group.addShape('circle', {
            attrs: {
              x: 0,
              y: 0,
              r,
              fill: cfg.color || 'steelblue',
              cursor: 'pointer',
            },
            name: 'path-shape',
          })
          return keyShape
        },
        setState(name, value, item) {
          const shape = item.get('keyShape')
          if (name === 'dark') {
            if (value) {
              if (shape.attr('fill') !== '#fff') {
                shape.oriFill = shape.attr('fill')
                const uColor = unlightColorMap.get(shape.attr('fill'))
                shape.attr('fill', uColor)
              } else {
                shape.attr('opacity', 0.2)
              }
            } else {
              if (shape.attr('fill') !== '#fff') {
                shape.attr('fill', shape.oriFill || shape.attr('fill'))
              } else {
                shape.attr('opacity', 1)
              }
            }
          }
        },
      },
      'single-node',
    )
    G6.registerNode(
      'animate-circle',
      {
        setState(name, value, item) {
          const shape = item.get('keyShape')
          shape.attr('cursor', 'pointer')
          const label = shape.get('parent').get('children')[1]
          if (name === 'disappearing' && value) {
            shape.animate(
              ratio => {
                return {
                  opacity: 1 - ratio,
                  r: shape.attr('r') * (1 - ratio),
                }
              },
              {
                duration: 200,
              },
            )
            label.animate(
              ratio => {
                return {
                  opacity: 1 - ratio,
                }
              },
              {
                duration: 500,
              },
            )
          } else if (name === 'appearing' && value) {
            const r = item.getModel().size / 2
            shape.animate(
              ratio => {
                return {
                  opacity: ratio,
                  r: r * ratio,
                  fill: shape.attr('fill'),
                }
              },
              {
                duration: 300,
              },
            )
            label.animate(
              {
                onFrame(ratio) {
                  return {
                    opacity: ratio,
                  }
                },
              },
              {
                duration: 300,
              },
            )
          } else if (name === 'dark') {
            if (value) {
              if (shape.attr('fill') !== '#fff') {
                shape.oriFill = shape.attr('fill')
                const uColor = unlightColorMap.get(shape.attr('fill'))
                shape.attr('fill', uColor)
              } else {
                shape.attr('opacity', 0.2)
                label.attr('fill', '#A3B1BF')
              }
            } else {
              if (shape.attr('fill') !== '#fff') {
                shape.attr('fill', shape.oriFill || shape.attr('fill'))
              } else {
                shape.attr('opacity', 1)
                label.attr('fill', '#697B8C')
              }
            }
          } else if (name === 'selected') {
            if (value) {
              shape.attr('fill', shape.attrs.stroke)
              shape.attr('fillOpacity', 0.3)
            } else {
              shape.attr('fill', '#fff')
              shape.attr('fillOpacity', 1)
            }
          }
        },
      },
      'circle',
    )
    G6.registerEdge(
      'animate-line',
      {
        drawShape(cfg, group) {
          const self = this
          let shapeStyle = self.getShapeStyle(cfg)
          shapeStyle = Object.assign(shapeStyle, {
            opacity: 0,
            strokeOpacity: 0,
          })
          const keyShape = group.addShape('path', {
            attrs: shapeStyle,
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'path-shape',
          })
          return keyShape
        },
        afterDraw(cfg, group) {
          const shape = group.get('children')[0]
          shape.animate(
            ratio => {
              const opacity = ratio * cfg.style.opacity
              const strokeOpacity = ratio * cfg.style.strokeOpacity
              return {
                opacity: ratio || opacity,
                strokeOpacity: ratio || strokeOpacity,
              }
            },
            {
              duration: 300,
            },
          )
        },
        setState(name, value, item) {
          const shape = item.get('keyShape')
          if (name === 'disappearing' && value) {
            shape.animate(
              ratio => {
                return {
                  opacity: 1 - ratio,
                  strokeOpacity: 1 - ratio,
                }
              },
              {
                duration: 200,
              },
            )
          } else if (name === 'dark') {
            if (value) shape.attr('opacity', 0.2)
            else shape.attr('opacity', 1)
          }
        },
      },
      'line',
    )
  }
  // 初始化工作
  init() {
    const { width, height } = this.opts
    const layoutCfg = {
      type: 'force',
      nodeSize: d => d.size / 2 + 5,
      preventOverlap: true, //是否防止重叠
      nodeStrength: 2500, // 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
      collideStrength: 0.8, // 防止重叠的力强度，范围 [0, 1]
      alphaDecay: 0.01, // 迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300
      onTick: () => {
        const nodeItems = this.graph.getNodes()
        const height = this.graph.get('height')
        const width = this.graph.get('width')
        const padding = 10
        nodeItems.forEach(item => {
          const model = item.getModel()
          if (model.x > width - padding) model.x = width - padding
          else if (model.x < padding) model.x = padding

          if (model.y > height - padding) model.y = height - padding
          else if (model.y < padding) model.y = padding
        })
      },
    }
    this.graph = new G6.Graph({
      container: this.container,
      width,
      height,
      linkCenter: true,
      layout: layoutCfg,
      modes: {
        default: ['drag-canvas'],
      },
      plugins: [this.minimap, this.tooltip],
      defaultNode: {
        type: 'bubble',
        size: 95,
        labelCfg: {
          position: 'center',
          style: {
            fill: 'white',
            fontStyle: 'bold',
          },
        },
      },
      defaultEdge: {
        color: '#888',
        type: 'animate-line', //'animate-line'
      },
    })

    this.graph.get('canvas').set('localRefresh', false)
  }
  refreshDragedNodePosition(e) {
    const model = e.item.get('model')
    model.fx = e.x
    model.fy = e.y
  }
  addEvents() {
    // click root to expand
    this.graph.on('node:click', e => {
      this.curShowNodes = []
      this.curShowEdges = []
      const model = e.item.getModel()
      if (model.isLeaf) {
        this.clickTable(e.item)
        return
      }
      if (model.level > 0) {
        return
      }
      // 点击根节点，隐藏不相关的节点，展开相关节点
      if (model.level === 0) {
        const layoutController = this.graph.get('layoutController')
        const forceLayout = layoutController.layoutMethods[0]
        forceLayout.forceSimulation.stop()
        // 高亮根节点 light the level 0 nodes
        this.showNodes.forEach(snode => {
          // 先设置根元素dark模式为false
          this.setStateByID(snode.id, 'dark', false)

          if (snode.x < 0.5 * this.opts.width) {
            snode.x = 300
          } else {
            snode.x = this.opts.width - 300
          }
        })
        model.x = this.opts.width / 2
        model.y = this.opts.height / 2
        // animatively hide the items which are going to disappear
        // 如果有将要消失的 边线，则动画隐藏
        if (this.curShowEdges.length) {
          this.disappearingItem(this.curShowEdges)
        }
        // 如果有将要消失的节点
        if (this.curShowNodes.length) {
          this.disappearingItem(this.curShowNodes)
        }
        this.graph.positionsAnimate()

        // reset curShowNodes nad curShowEdges 隐藏完毕后充值两个集合
        this.curShowNodes = []
        this.curShowEdges = []

        // click on the same node which is the current focus node, hide the small nodes, change the layout parameters to roots view
        //单击当前焦点节点的同一节点，隐藏小节点，将布局参数更改为根视图
        if (this.currentFocus && this.currentFocus.id === model.id) {
          this.setRootView()
        } else {
          // click other focus node, hide the current small nodes and show the related nodes
          //单击其他焦点节点，隐藏当前小节点，显示相关节点
          this.currentFocus = model
          // change data after the original items disappearing
          const layoutController = this.graph.get('layoutController')
          layoutController.layoutCfg.nodeStrength = () => -80
          layoutController.layoutCfg.collideStrength = 0.2
          layoutController.layoutCfg.edgeStrength = () => 2
          layoutController.layoutCfg.linkDistance = () => 200

          const mId = model.id
          this.curShowNodesMap = new Map()
          // 查找已单击模型的后代节点
          this.nodes.forEach(node => {
            if (!node.parents) return

            const tlength = node.parents.length
            let isChild = false
            const parents = []
            for (let i = 0; i < tlength; i++) {
              const ts = node.parents[i]
              if (ts.id === mId) isChild = true
              parents.push(this.nodeMap.get(ts.id))
            }
            if (isChild) {
              const randomAngle = Math.random() * 2 * Math.PI
              node.x = model.x + (Math.cos(randomAngle) * model.size) / 2 + 10
              node.y = model.y + (Math.sin(randomAngle) * model.size) / 2 + 10
              if (!node.style) node.style = {}
              node.style.lineWidth = 0
              node.style.opacity = 1
              if (node.isLeaf) {
                node.type = 'animate-circle'
                let color = 'l(0)'
                const parentsNum = parents.length
                parents.forEach((parent, i) => {
                  const parentColor = parent.color.split(' ')[1].substr(2)
                  color += ` ${i / (parentsNum - 1)}:${parentColor}`
                })
                if (parentsNum === 1) {
                  color = model.color.split(' ')[1].substr(2)
                }
                node.color = color
                node.style.fill = '#fff'
                node.style.lineWidth = 1
                node.size = 50
                node.cursor = 'pointer'
                node.labelCfg = {
                  style: {
                    fontSize: 11,
                    lineHeight: 19,
                    fill: '#697B8C',
                  },
                  position: 'center',
                }
              } else if (node.level !== 0) {
                node.type = 'circle' // 'bubble';
                node.size = 95
                if (!node.style) node.style = {}
                node.color = model.color
                node.style.fill = model.color
                node.cursor = 'pointer'
                node.labelCfg = {
                  style: {
                    fill: '#fff',
                    fontSize: 14,
                  },
                  position: 'center',
                }
              }
              this.curShowNodes.push(node)
              this.curShowNodesMap.set(node.id, node)
              // add the edge connect from model to node which exists in edges
              const edgeId = `${model.id}-${node.id}`
              const edge = this.edgesMap.get(edgeId)
              if (edge) {
                edge.color = model.color
                this.curShowEdges.push(edge)
              }
            }
          })

          // find the edges whose target end source are in the curShowNodes
          // 查找目标端源在curShowNodes中的边
          this.curShowNodes.forEach((nu, i) => {
            const lu = nu.level
            this.curShowNodes.forEach((nv, j) => {
              if (j <= i) return
              const lv = nv.level
              let edgeId
              if (lu < lv) {
                edgeId = `${nu.id}-${nv.id}`
              } else {
                edgeId = `${nv.id}-${nu.id}`
              }
              let color = model.color
              if (nu.isLeaf) {
                if (nv.level === 0 && nv.tag !== model.tag) color = '#DFE5EB'
              } else if (nv.isLeaf) {
                if (nu.level === 0 && nu.tag !== model.tag) color = '#DFE5EB'
              }
              const edge = this.edgesMap.get(edgeId)
              if (edge) {
                edge.color = color
                this.curShowEdges.push(edge)
              }
            })
          })
        }
        setTimeout(() => {
          this.graph.changeData({
            nodes: this.showNodes.concat(this.curShowNodes),
            edges: this.showEdges.concat(this.curShowEdges),
          })
          const nodeItems = this.graph.getNodes()
          const edgeItems = this.graph.getEdges()
          edgeItems.forEach(item => {
            this.graph.clearItemStates(item)
          })
          nodeItems.forEach(item => {
            this.graph.clearItemStates(item)
            this.graph.setItemState(item, 'appearing', true)
          })
        }, 400)
      }

      // this._logStates()
    })

    this.graph.on('canvas:click', () => {
      this.currentFocus = undefined
      const forceLayout = this.graph.get('layoutController').layoutMethods[0]
      forceLayout.forceSimulation.stop()
      const nodeItems = this.graph.getNodes()
      const edgeItems = this.graph.getEdges()
      if (this.highlighting) {
        this.highlighting = false
        nodeItems.forEach(item => {
          this.graph.setItemState(item, 'dark', false)
        })
        edgeItems.forEach(item => {
          this.graph.setItemState(item, 'dark', false)
        })
      } else {
        nodeItems.forEach(item => {
          const model = item.getModel()
          if (model.level === 0) {
            this.graph.setItemState(item, 'dark', false)
          } else {
            this.graph.setItemState(item, 'disappearing', true)
          }
        })
        edgeItems.forEach(item => {
          this.graph.setItemState(item, 'disappearing', true)
        })
        this.curShowNodes = []
        this.curShowEdges = []
        setTimeout(() => {
          const layoutController = this.graph.get('layoutController')
          layoutController.layoutCfg.nodeStrength = 2500
          layoutController.layoutCfg.collideStrength = 0.8
          layoutController.layoutCfg.alphaDecay = 0.01

          this.graph.changeData({
            nodes: this.showNodes,
            edges: this.showEdges,
          })
        }, 400)
      }
    })

    this.graph.on('node:dragstart', e => {
      this.graph.layout()
      this.refreshDragedNodePosition(e)
    })
    this.graph.on('node:drag', e => {
      this.refreshDragedNodePosition(e)
    })
    this.graph.on('node:dragend', e => {
      e.item.get('model').fx = null
      e.item.get('model').fy = null
    })

    this.graph.on('node:mouseenter', e => {
      const item = e.item
      const model = e.item.getModel()
      const group = e.item.getContainer()
      const label = group.find(element => element.get('className') === 'node-label')
      if (label) {
        label.attr('cursor', 'pointer')
      }
      if (model.level === 0) return

      this.highlighting = true
      this.graph.setAutoPaint(false)
      const nodeItems = this.graph.getNodes()
      const edgeItems = this.graph.getEdges()
      nodeItems.forEach(node => {
        this.graph.setItemState(node, 'dark', true)
        node.getModel().light = false
      })
      this.graph.setItemState(item, 'dark', false)
      model.light = true

      const tags = model.parents
      const findTagsMap = new Map()

      let mid = 0
      // find the tags
      tags.forEach(t => {
        findTagsMap.set(t.id, mid)
        mid++
      })
      // find the nodes with tag === tags[?]
      nodeItems.forEach(item => {
        const node = item.getModel()
        if (findTagsMap.get(node.id) !== undefined) {
          this.graph.setItemState(item, 'dark', false)
          node.light = true
        }
      })

      edgeItems.forEach(item => {
        const source = item.getSource().getModel()
        const target = item.getTarget().getModel()
        if (source.light && target.light) {
          this.graph.setItemState(item, 'dark', false)
        } else {
          this.graph.setItemState(item, 'dark', true)
        }
      })
      this.graph.paint()
      this.graph.setAutoPaint(true)
    })

    this.graph.on('node:mouseleave', e => {
      const group = e.item.getContainer()
      const label = group.find(element => element.get('className') === 'node-label')
      if (label) {
        label.attr('cursor', 'default')
      }
      if (this.highlighting) {
        const nodeItems = this.graph.getNodes()
        const edgeItems = this.graph.getEdges()
        this.highlighting = false
        nodeItems.forEach(item => {
          this.graph.setItemState(item, 'dark', false)
        })
        edgeItems.forEach(item => {
          this.graph.setItemState(item, 'dark', false)
        })
      }
    })
  }
  // 打印当前状态
  _logStates() {
    const {
      showNodes,
      showEdges,
      curShowNodes,
      curShowEdges,
      nodes,
      edges,
      nodeMap,
      edgesMap,
      curShowNodesMap,
      highlighting,
      currentFocus,
    } = this
    console.log({
      showNodes,
      showEdges,
      curShowNodes,
      curShowEdges,
      nodes,
      edges,
      nodeMap,
      edgesMap,
      curShowNodesMap,
      highlighting,
      currentFocus,
    })
  }
  // 根据id设置状态
  setStateByID(id, state, value) {
    const item = this.graph.findById(id)
    item && this.graph.setItemState(item, state, value)
  }
  // 隐藏边线或者是节点
  disappearingItem(list = []) {
    list.forEach(csnode => {
      const item = this.graph.findById(csnode.id)
      item && this.graph.setItemState(item, 'disappearing', true)
    })
  }
  // 设置根视图
  setRootView() {
    const layoutController = this.graph.get('layoutController')
    this.currentFocus = undefined
    layoutController.layoutCfg.nodeStrength = 2500
    layoutController.layoutCfg.collideStrength = 0.8
    layoutController.layoutCfg.alphaDecay = 0.02
  }
  // 点击一个表的逻辑
  clickTable(item) {
    const model = item.getModel()

    // 清除所有节点的选中状态
    this.graph.getNodes().forEach(node => {
      this.graph.setItemState(node, 'selected', false)
    })

    // 设置当前节点为选中状态
    this.graph.setItemState(item, 'selected', true)

    this.onNodeClick && this.onNodeClick(model)
  }
  // 根据id设置一个节点的点击状态
  setSelected(id) {
    if (this.currentFocus) return
    const node = this.nodes.find(i => i.id === id)
    // 获取父级节点的id
    const parents = node.parents
    if (parents && parents.length > 0) {
      const parentId = parents[0].id

      const parentItem = this.graph.findById(parentId)

      // 手动触发一个点击事件
      this.graph.emit('node:click', { item: parentItem })
      setTimeout(() => {
        const item = this.graph.findById(id)
        item && this.clickTable(item)
      }, 400)
    }
  }
  render(data) {
    this.setRootView()

    this.nodes = data.nodes
    this.edges = data.edges

    this.showNodes = []
    this.showEdges = []
    this.nodeMap = new Map()
    this.edgesMap = new Map()

    // find the roots
    this.nodes.forEach(node => {
      if (node.level === 0) {
        node.color = gColors[this.showNodes.length % gColors.length]
        node.style = {
          fill: gColors[this.showNodes.length % gColors.length],
          lineWidth: 0,
        }
        node.labelCfg = {
          size: 40,
          style: {
            fontSize: 14,
            lineHeight: 20,
            fill: '#fff',
          },
        }
        node.x = Math.random() * 800
        node.y = Math.random() * 800
        this.showNodes.push(node)
      }
      this.nodeMap.set(node.id, node)
    })

    mapNodeSize(this.showNodes, 'childrenNum', [120, 180])

    this.edges.forEach(edge => {
      // map the id
      edge.id = `${edge.source}-${edge.target}`
      edge.style = {
        lineWidth: 0.8,
        opacity: 1,
        strokeOpacity: 1,
      }
      this.edgesMap.set(edge.id, edge)
    })
    this.graph.data({
      nodes: this.showNodes,
      edges: this.showEdges,
    })
    this.graph.render()
  }
  destroy() {
    this.graph.clear()
    this.graph.destroy()
  }
}
