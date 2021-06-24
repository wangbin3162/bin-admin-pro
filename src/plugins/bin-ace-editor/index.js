import BAceEditor from 'bin-ace-editor'
import 'brace/ext/emmet'
import 'brace/ext/language_tools'
import 'brace/mode/json'
import 'brace/snippets/json'
import 'brace/theme/chrome'

export function registerEditor(app) {
  app.component('BAceEditor', BAceEditor)
}
