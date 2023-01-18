export default {
  install(app) {
    app.directive('flowDrag', {
      mounted(el, binding) {
        if (!binding) return
        el.onmousedown = e => {
          // 右键不用管
          if (e.button === 2) return
          //  鼠标按下，计算当前原始距离可视区的高度
          let disX = e.clientX
          let disY = e.clientY
          el.style.cursor = 'move'

          document.onmousemove = e => {
            // 移动时禁止默认事件
            e.preventDefault()
            const left = e.clientX - disX
            disX = e.clientX
            el.scrollLeft += -left

            const top = e.clientY - disY
            disY = e.clientY
            el.scrollTop += -top
          }

          document.onmouseup = () => {
            el.style.cursor = 'auto'
            document.onmousemove = null
            document.onmouseup = null
          }
        }
        // 监听滚动事件，更新画布底纹
        el.onscroll = () => {
          el.style.backgroundPosition = `-${el.scrollLeft}px -${el.scrollTop}px`
        }
      },
    })
  },
}
