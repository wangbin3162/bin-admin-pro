import comps from './comps'
import func from './func'
import pages from './pages'
import nested from './nested'
import dynamicRoute from './dynamic-route'
import links from './links'
import graph from './graph'
import sys from './sys'
import about from './about'

// 动态载入，无顺序
// const files = import.meta.globEager('./*.js')
// const modules = Object.keys(files).map(key => [...files[key].default])

export default [
  ...comps,
  ...func,
  ...pages,
  ...nested,
  ...dynamicRoute,
  ...links,
  ...graph,
  ...sys,
  ...about,
]
