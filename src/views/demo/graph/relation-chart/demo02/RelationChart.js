import * as THREE from 'three'
import SpriteText from 'three-spritetext'
import ForceGraph3D from '3d-force-graph'

export default class RelationChart {
  // 构造函数
  constructor(mapContainer, data = [], customConfig = {}) {
    this.data = data // 缓存数据
    this.mapContainer = mapContainer
    this.config = {
      linkWidth: 0.5,
      linkTextSize: 3,
      linkTextColor: 'lightgrey',
      nodeSize: 5,
      nodeTextSize: 4,
      particleWidth: 1,
      particleDensity: 5,
      orgColor: 'gold',
      orgSizeOffset: 2,
      characterColor: 'skyblue',
      familyColor: 'green',
      ...customConfig,
    }

    // 高亮的节点，连线
    this.highlightNodes = new Set()
    this.highlightLinks = new Set()
    // 连线粒子
    this.particleLinks = new Set()
    // 悬停节点
    this.hoverNode = null
    // 点击节点
    this.clickedNode = null

    this.nodes = []
    this.links = []

    this.Graph = null // 实例
  }

  buildNeighboursAndTestPos(data) {
    return data.links.forEach(link => {
      const a = data.nodes[link.source]
      const b = data.nodes[link.target]
      !a.neighbors && (a.neighbors = [])
      !b.neighbors && (b.neighbors = [])
      a.neighbors.push(b)
      b.neighbors.push(a)

      !a.links && (a.links = [])
      !b.links && (b.links = [])
      a.links.push(link)
      b.links.push(link)

      // Generate random 1 decimal number between 0.3 and 0.7
      link.textPos = (Math.floor(Math.random() * 5) + 3) / 10
    })
  }

  updateHighlight() {
    this.nodes.forEach(node => {
      if (this.hoverNode && !this.highlightNodes.has(node)) {
        node.__threeObj.material.opacity = 0.1
      } else if (!this.hoverNode) {
        node.__threeObj.material.opacity = 0.6
      } else {
        node.__threeObj.material.opacity = 1
      }
    })

    this.links.forEach(link => {
      if (this.hoverNode && !this.highlightLinks.has(link)) {
        link.__lineObj.visible = false
        link.__arrowObj.visible = false
      } else {
        link.__lineObj.visible = true
        link.__arrowObj.visible = true
      }
    })

    this.Graph.linkDirectionalParticles(this.Graph.linkDirectionalParticles())
  }

  // 初始化
  init() {
    this.buildNeighboursAndTestPos(this.data)

    const height = this.mapContainer.clientHeight
    const width = this.mapContainer.clientWidth
    // controlType: trackball   orbit
    this.Graph = ForceGraph3D({
      controlType: 'trackball',
    })(this.mapContainer).graphData(this.data)

    this.Graph.width(width)
    this.Graph.height(height)
    this.Graph.backgroundColor('rgba(0,0,0,1)')
    this.Graph.showNavInfo(false) //禁用页脚
  }

  // 绑定事件
  bindEvents() {
    this.Graph.onNodeHover(node => this.handleHoverNode(node))
      .onNodeClick(node => this.handleNodeClick(node))
      .onBackgroundClick(() => this.handleBgClick())
  }

  // 悬停节点
  handleHoverNode(node) {
    // 如果点击节点存在
    if (this.clickedNode) {
      // 如果当前悬停的节点不是点击节点 ，表示悬停再次邻居上
      if (node && node !== this.clickedNode) {
        // hover on its neighbours
        node.links.forEach(link => {
          if (
            (link.source === node && link.target === this.clickedNode) ||
            (link.target === node && link.source === this.clickedNode)
          ) {
            this.particleLinks.add(link)
          }
        })
      }
      // 如果悬停的就是点击节点，则效果高亮为当前节点自己的links连线
      else if (node && node === this.clickedNode) {
        this.clickedNode.links.forEach(link => this.particleLinks.add(link))
      }
      // 其他情况不予高亮
      else {
        this.particleLinks.clear()
      }
      this.Graph.linkDirectionalParticles(this.Graph.linkDirectionalParticles())
      return
    }

    // no state change
    if ((!node && !this.highlightNodes.size) || (node && this.hoverNode === node));

    this.highlightNodes.clear()
    this.highlightLinks.clear()

    if (node) {
      this.highlightNodes.add(node)
      node.neighbors.forEach(neighbor => this.highlightNodes.add(neighbor))
      node.links.forEach(link => this.highlightLinks.add(link))
    }

    this.hoverNode = node || null
    this.updateHighlight()
  }

  // 点击节点
  handleNodeClick(node) {
    console.log(node)
    // All click actions are preceeded hover actions
    if (this.clickedNode === node) {
      // Clicked on the node that has been clicked
      this.clickedNode = null
      this.hoverNode = null
      this.highlightNodes.clear()
      this.highlightLinks.clear()
      this.particleLinks.clear()
      this.updateHighlight()
    } else if (this.clickedNode) {
      // Clicked on a different node than current clickedNode
      this.clickedNode = node
      this.hoverNode = node
      this.highlightNodes.clear()
      this.highlightLinks.clear()
      this.highlightNodes.add(node)
      node.neighbors.forEach(neighbor => this.highlightNodes.add(neighbor))
      node.links.forEach(link => {
        this.highlightLinks.add(link)
        this.particleLinks.add(link)
      })
      this.updateHighlight()
    } else {
      // No node is in clicked status
      this.clickedNode = node
      node.links.forEach(link => this.particleLinks.add(link))
      this.Graph.linkDirectionalParticles(this.Graph.linkDirectionalParticles())
    }
  }

  // 背景点击
  handleBgClick() {
    // Cancel clickedNode status
    this.highlightNodes.clear()
    this.highlightLinks.clear()
    this.clickedNode = null
    this.hoverNode = null
    this.updateHighlight()
  }

  render() {
    this.init()
    // 扩展配置
    this.Graph.nodeThreeObject(node => {
      this.nodes.push(node)
      let obj
      if (node.avatar) {
        // load img from URL
        const textureLoader = new THREE.TextureLoader()
        // const imgTexture = textureLoader.load(node.avatar, texture => {
        //   texture.encoding = THREE.sRGBEncoding
        //   texture.mapping = THREE.EquirectangularReflectionMapping
        // })
        const imgTexture = textureLoader.load('@/assets/images/point/point1.png', texture => {
          texture.encoding = THREE.sRGBEncoding
          texture.mapping = THREE.EquirectangularReflectionMapping
        })
        // Mesh a circle with previous img material
        let circle = new THREE.Mesh(
          new THREE.CircleGeometry(
            node.type === 'Char'
              ? this.config.nodeSize
              : this.config.nodeSize + this.config.orgSizeOffset,
            32,
          ),
          new THREE.MeshBasicMaterial({
            map: imgTexture,
            side: THREE.DoubleSide,
          }),
        )

        circle.material.transparent = true
        circle.material.opacity = 0.6

        // Make object always facing camera
        // eslint-disable-next-line no-unused-vars
        circle.onBeforeRender = (renderer, scene, camera, geometry, material, group) => {
          circle.quaternion.copy(camera.quaternion)
        }
        obj = circle
      } else {
        const sprite = new SpriteText(node.name)
        sprite.material.depthWrite = false // make sprite background transparent
        if (node.type === 'Char') {
          sprite.color = this.config.characterColor
          sprite.textHeight = this.config.nodeTextSize
        } else if (node.type === 'Org') {
          sprite.color = this.config.orgColor
          sprite.textHeight = this.config.nodeTextSize + this.config.orgSizeOffset
        } else {
          sprite.color = this.config.familyColor
          sprite.textHeight = this.config.nodeTextSize + this.config.orgSizeOffset
        }

        obj = sprite
      }

      return obj
    })

    this.Graph
      // 在图中的两个节点之间创建方向性粒子流，以表示节点之间的连接关系
      .linkDirectionalParticles(link =>
        this.particleLinks.has(link) ? this.config.particleDensity : 0,
      )
      .linkDirectionalParticleWidth(this.config.particleWidth)
      .linkThreeObjectExtend(true)
      .linkThreeObject(link => {
        this.links.push(link)
        // console.log(link);
        // extend link with text sprite
        const sprite = new SpriteText(link.relation)
        sprite.color = this.config.linkTextColor
        sprite.textHeight = this.config.linkTextSize
        return sprite
      })
      .linkDirectionalArrowLength(2) // 方向箭头值0隐藏箭头。
      .linkDirectionalArrowRelPos(1) //用于箭头沿链接线的纵向位置0表示紧邻source节点、1紧邻target节点和0.5正中间。
      .linkCurvature(0.2) // 连线贝塞尔曲线
      .linkAutoColorBy('type') //  以自动对颜色进行分组
      // .linkWidth(0.5)
      // .linkWidth(link => (this.highlightLinks.has(link) ? 1 : 0))
      // .linkVisibility(link => (this.highlightLinks.has(link) ? false : true))
      .linkPositionUpdate((sprite, { start, end }, link) => {
        /*
        const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
          [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
        })));
        */
        // Position sprite
        // Object.assign(sprite.position, middlePos);
        // console.log(link.__curve.getPoint(0.5));
        Object.assign(sprite.position, link.__curve.getPoint(link.textPos))
      })

    this.bindEvents()
    // 将节点展开得更宽一些
    this.Graph.d3Force('charge').strength(-120)
  }
}
