import BAceEditor from 'bin-editor-next'
import 'brace/ext/emmet'
import 'brace/ext/language_tools'
import 'brace/mode/json'
import 'brace/snippets/json'
import 'brace/mode/typescript'
import 'brace/snippets/typescript'
import 'brace/mode/javascript'
import 'brace/snippets/javascript'
import 'brace/mode/stylus'
import 'brace/snippets/stylus'
import 'brace/mode/groovy'
import 'brace/snippets/groovy'

import 'brace/mode/dot'
import 'brace/snippets/dot'

import 'brace/theme/chrome'
import 'brace/theme/sqlserver'

export function registerEditor(app) {
  app.component('BAceEditor', BAceEditor)
}
