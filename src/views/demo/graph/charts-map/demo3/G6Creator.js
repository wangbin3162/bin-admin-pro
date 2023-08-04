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
  constructor(wrap, height) {
    if (!wrap) return

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
    G6.registerNode(
      'bubble',
      {
        drawShape(cfg, group) {
          const self = this
          const r = cfg.size / 2
          // a circle by path
          const path = [
            ['M', -r, 0],
            ['C', -r, r / 2, -r / 2, r, 0, r],
            ['C', r / 2, r, r, r / 2, r, 0],
            ['C', r, -r / 2, r / 2, -r, 0, -r],
            ['C', -r / 2, -r, -r, -r / 2, -r, 0],
            ['Z'],
          ]
          const keyShape = group.addShape('path', {
            attrs: {
              x: 0,
              y: 0,
              path,
              fill: cfg.color || 'steelblue',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'path-shape',
          })
          const mask = group.addShape('path', {
            attrs: {
              x: 0,
              y: 0,
              path,
              opacity: 0.25,
              fill: cfg.color || 'steelblue',
              shadowColor: cfg.color.split(' ')[2].substr(2),
              shadowBlur: 40,
              shadowOffsetX: 0,
              shadowOffsetY: 30,
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'mask-shape',
          })
          const spNum = 10 // split points number
          const directions = [],
            rs = []
          self.changeDirections(spNum, directions)
          for (let i = 0; i < spNum; i++) {
            const rr = r + directions[i] * ((Math.random() * r) / 1000) // +-r/6, the sign according to the directions
            if (rs[i] < 0.97 * r) rs[i] = 0.97 * r
            else if (rs[i] > 1.03 * r) rs[i] = 1.03 * r
            rs.push(rr)
          }
          keyShape.animate(
            () => {
              const path = self.getBubblePath(r, spNum, directions, rs)
              return { path }
            },
            {
              repeat: true,
              duration: 10000,
            },
          )
          const directions2 = [],
            rs2 = []
          self.changeDirections(spNum, directions2)
          for (let i = 0; i < spNum; i++) {
            const rr = r + directions2[i] * ((Math.random() * r) / 1000) // +-r/6, the sign according to the directions
            if (rs2[i] < 0.97 * r) rs2[i] = 0.97 * r
            else if (rs2[i] > 1.03 * r) rs2[i] = 1.03 * r
            rs2.push(rr)
          }
          mask.animate(
            () => {
              const path = self.getBubblePath(r, spNum, directions2, rs2)
              return { path }
            },
            {
              repeat: true,
              duration: 10000,
            },
          )
          return keyShape
        },
        changeDirections(num, directions) {
          for (let i = 0; i < num; i++) {
            if (!directions[i]) {
              const rand = Math.random()
              const dire = rand > 0.5 ? 1 : -1
              directions.push(dire)
            } else {
              directions[i] = -1 * directions[i]
            }
          }
          return directions
        },
        getBubblePath(r, spNum, directions, rs) {
          const path = []
          const cpNum = spNum * 2 // control points number
          const unitAngle = (Math.PI * 2) / spNum // base angle for split points
          let angleSum = 0
          const sps = []
          const cps = []
          for (let i = 0; i < spNum; i++) {
            const speed = 0.001 * Math.random()
            rs[i] = rs[i] + directions[i] * speed * r // +-r/6, the sign according to the directions
            if (rs[i] < 0.97 * r) {
              rs[i] = 0.97 * r
              directions[i] = -1 * directions[i]
            } else if (rs[i] > 1.03 * r) {
              rs[i] = 1.03 * r
              directions[i] = -1 * directions[i]
            }
            const spX = rs[i] * Math.cos(angleSum)
            const spY = rs[i] * Math.sin(angleSum)
            sps.push({ x: spX, y: spY })
            for (let j = 0; j < 2; j++) {
              const cpAngleRand = unitAngle / 3
              const cpR = rs[i] / Math.cos(cpAngleRand)
              const sign = j === 0 ? -1 : 1
              const x = cpR * Math.cos(angleSum + sign * cpAngleRand)
              const y = cpR * Math.sin(angleSum + sign * cpAngleRand)
              cps.push({ x, y })
            }
            angleSum += unitAngle
          }
          path.push(['M', sps[0].x, sps[0].y])
          for (let i = 1; i < spNum; i++) {
            path.push([
              'C',
              cps[2 * i - 1].x,
              cps[2 * i - 1].y,
              cps[2 * i].x,
              cps[2 * i].y,
              sps[i].x,
              sps[i].y,
            ])
          }
          path.push([
            'C',
            cps[cpNum - 1].x,
            cps[cpNum - 1].y,
            cps[0].x,
            cps[0].y,
            sps[0].x,
            sps[0].y,
          ])
          path.push(['Z'])
          return path
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
      nodeSize: d => d.size / 2 + 10,
      nodeStrength: 2500,
      collideStrength: 0.8,
      alphaDecay: 0.01,
      preventOverlap: true,
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
  addEvents() {
    // click root to expand
    this.graph.on('node:click', e => {
      this.curShowNodes = []
      this.curShowEdges = []
      const item = e.item
      const model = item.getModel()
      if (!model.isLeaf && model.level !== 0) {
        return
      }
      // 点击根节点，隐藏不相关的节点，展开相关节点
      if (model.level === 0) {
        const layoutController = this.graph.get('layoutController')
        const forceLayout = layoutController.layoutMethods[0]
        forceLayout.forceSimulation.stop()
        // light the level 0 nodes
        this.showNodes.forEach(snode => {
          const item = this.graph.findById(snode.id)
          this.graph.setItemState(item, 'dark', false)
          if (snode.x < 0.5 * this.opts.width) {
            snode.x = 300
          } else {
            snode.x = this.opts.width - 300
          }
        })
        model.x = this.opts.width / 2
        model.y = this.opts.height / 2
        // animatively hide the items which are going to disappear
        //动画地隐藏将要消失的项目
        if (this.curShowEdges.length) {
          this.curShowEdges.forEach(csedge => {
            const item = this.graph.findById(csedge.id)
            item && this.graph.setItemState(item, 'disappearing', true)
          })
        }
        this.curShowNodes.forEach(csnode => {
          const item = this.graph.findById(csnode.id)
          item && this.graph.setItemState(item, 'disappearing', true)
        })
        this.graph.positionsAnimate()

        // reset curShowNodes nad curShowEdges
        this.curShowNodes = []
        this.curShowEdges = []

        // click on the same node which is the current focus node, hide the small nodes, change the layout parameters to roots view
        //单击当前焦点节点的同一节点，隐藏小节点，将布局参数更改为根视图
        if (this.currentFocus && this.currentFocus.id === model.id) {
          this.currentFocus = undefined
          layoutController.layoutCfg.nodeStrength = 2500
          layoutController.layoutCfg.collideStrength = 0.8
          layoutController.layoutCfg.alphaDecay = 0.01
        } else {
          // click other focus node, hide the current small nodes and show the related nodes
          //单击其他焦点节点，隐藏当前小节点，显示相关节点
          this.currentFocus = model
          // change data after the original items disappearing
          //在原始项消失后更改数据
          const layoutController = this.graph.get('layoutController')
          layoutController.layoutCfg.nodeStrength = () => {
            return -80
          }
          layoutController.layoutCfg.collideStrength = 0.2
          layoutController.layoutCfg.linkDistance = d => {
            if (d.source.level !== 0) return 120
            const length = 250
            return length
          }
          layoutController.layoutCfg.edgeStrength = () => {
            return 2
          }

          this.curShowNodesMap = new Map()
          //查找已单击模型的后代节点
          this.nodes.forEach(node => {
            if (!node.parents) return
            const parents = []
            const ts = node.parents
            parents.push(this.nodeMap.get(ts[0].id))

            if (node.level > 0) {
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
                node.style.fill = color
                node.style.fill = '#fff'
                node.style.lineWidth = 1
                node.size = 60
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
          //查找目标端源在curShowNodes中的边
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
  }
  render(data) {
    const layoutController = this.graph.get('layoutController')
    layoutController.layoutCfg.nodeStrength = 2500
    layoutController.layoutCfg.collideStrength = 0.8
    layoutController.layoutCfg.alphaDecay = 0.01

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
            fontSize: 25,
            fill: '#fff',
            fontWeight: 300,
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
