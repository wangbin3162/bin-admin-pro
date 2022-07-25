import { h, Transition } from 'vue'

export default {
  name: 'MoveTransition',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'layout-main',
    },
  },
  setup(props, { slots }) {
    return () => {
      return h(
        Transition,
        {
          name: props.name,
          appear: true,
          mode: 'out-in',
          duration: { enter: 500, leave: 250 },
          onBeforeLeave(el) {
            el.style.position = 'absolute'
            el.style.top = '0'
            el.style.left = '0'
            el.style.width = '100%'
            el.style.height = '100%'
            el.style.overflow = 'hidden'
          },
          onAfterLeave(el) {
            el.style = ''
          },
        },
        slots.default,
      )
    }
  },
}
