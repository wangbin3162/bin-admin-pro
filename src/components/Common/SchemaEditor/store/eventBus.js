import mitt from 'mitt'

const emitter = mitt()

const SCHEMA_AUTO_SAVE = 'SCHEMA_AUTO_SAVE'

export { emitter, SCHEMA_AUTO_SAVE }
