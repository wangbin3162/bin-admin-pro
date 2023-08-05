import G6 from '@antv/g6'
import insertCss from 'insert-css'

export default class G6Creator {
  constructor(wrap, height, nodeClickFun) {
    if (!wrap) return
    this.onNodeClick = nodeClickFun

    this.container = document.getElementById(wrap)
    this.opts = {
      width: this.container.scrollWidth,
      height: this.container.scrollHeight || height,
      animateCfg: { duration: 200, easing: 'easeCubic' },
    }
    this.registerComps()
    this.init()
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
      `)

    G6.registerNode(
      'circle-bar',
      {
        drawShape(cfg, group) {
          const keyShape = group.addShape('circle', {
            attrs: {
              x: 0,
              y: 0,
              r: cfg.size / 2,
              fill: cfg.color,
              shadowColor: cfg.color,
              shadowBlur: 20,
              cursor: 'pointer',
            },
          })

          return keyShape
        },
      },
      'circle',
    )

    // 注册工具栏
    this.toolbar = new G6.ToolBar({
      position: { x: 10, y: 10 },
      getContent: () => `
        <ul class='g6-component-toolbar'>
          <li code='zoomOut'>
            <i class="b-iconfont b-icon-zoomin"></i>
          </li>
          <li code='zoomIn'>
            <i class="b-iconfont b-icon-zoomout"></i>
          </li>
          <li code='realZoom'>
            <i class="b-iconfont b-icon-icon-test"></i>
          </li>
          <li code='autoZoom'>
            <i class="b-iconfont b-icon-expend"></i>
          </li>
        </ul>`,
      handleClick: (code, graph) => {
        switch (code) {
          case 'zoomOut':
            graph.zoom(1.2, undefined, true, this.opts.animateCfg)
            break
          case 'zoomIn':
            graph.zoom(0.8, undefined, true, this.opts.animateCfg)
            break
          case 'realZoom':
            graph.zoomTo(1, undefined, true, this.opts.animateCfg)
            break
          case 'autoZoom':
            graph.fitView(20, undefined, true, this.opts.animateCfg)
            break
        }
      },
    })

    this.tooltip = new G6.Tooltip({
      // offsetX and offsetY include the padding of the parent container
      offsetX: 10,
      offsetY: 10,
      // the types of items that allow the tooltip show up
      // 允许出现 tooltip 的 item 类型
      itemTypes: ['node'],
      // custom the tooltip's content
      // 自定义 tooltip 内容
      getContent: e => {
        const outDiv = document.createElement('div')
        const model = e.item.getModel()
        const name = `${model.xlabel}`
        outDiv.style.width = 'fit-content'
        //outDiv.style.padding = '0px 0px 20px 0px';
        outDiv.innerHTML = `<div>${name}</div>`
        return outDiv
      },
    })
    // 注册minimap
    this.minimap = new G6.Minimap({
      className: 'g6-minimap-wrap',
      size: [150, 100],
    })
  }
  // 初始化工作
  init() {
    const { width, height } = this.opts
    this.graph = new G6.TreeGraph({
      container: this.container,
      width,
      height,
      linkCenter: true,
      defaultNode: {
        size: 30,
        style: {
          lineWidth: 0,
        },
      },
      defaultEdge: {
        color: '#1089ff',
        style: {
          lineWidth: 1,
          shadowBlur: 20,
          shadowColor: '#cfe7ff',
        },
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 3,
          stroke: '#1089ff',
        },
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas'],
      },
      plugins: [this.minimap, this.toolbar, this.tooltip],
      layout: {
        type: 'dendrogram',
        direction: 'LR',
        radial: true,
        nodeSep: 20,
        rankSep: 250,
      },
    })

    this.graph.node(node => {
      const xlabel = node.name
      const label = node.name

      let color = '#2a3a4b'

      let type = 'circle'
      if (node.isLeaf) type = 'circle-bar'
      else if (node.img) {
        type = 'image'
        color = node.color
      }

      return {
        type,
        xlabel,
        label,
        labelCfg: {
          position: 'top',
          style: {
            fill: color,
            fontSize: node.color ? 22 : 26,
          },
        },
      }
    })

    this.graph.on('node:mouseenter', e => {
      const node = e.item
      this.graph.setItemState(node, 'hover', true)
    })

    this.graph.on('node:mouseleave', e => {
      const node = e.item
      this.graph.setItemState(node, 'hover', false)
    })

    this.graph.on('node:click', e => {
      const model = e.item.getModel()
      this.onNodeClick && this.onNodeClick(model)
    })
  }
  render(data) {
    G6.Util.traverseTree(data, item => {
      if (!item.isLeaf) {
        item.size = 140
        item.style = {
          shadowColor: '#e7f3ff',
          shadowBlur: 200,
        }
      } else {
        item.size = 36
      }
      // 中间数据中台部分内容
      if (item.id === 'data-center') {
        item.size = 200
        item.style.shadowBlur = 200
      }
    })

    this.graph.data(data)
    this.graph.render()
    this.graph.fitView()
  }
  destroy() {
    this.graph.clear()
    this.graph.destroy()
  }
}
