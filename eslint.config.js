import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier' // 新增

export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  eslintConfigPrettier, // 新增
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'space-before-function-paren': 'off',
      'template-curly-spacing': 'off',
      'comma-dangle': 'off',
      eqeqeq: ['error', 'always'],
      indent: 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
]
