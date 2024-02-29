import comps from './comps'
import func from './func'
import pages from './pages'
import nested from './nested'
import dynamicRoute from './dynamic-route'
import links from './links'
import flow from './flow'
import graph from './graph'
import excel from './excel'
import sys from './sys'
import about from './about'

// 动态载入，无顺序
// const files = import.meta.glob('./*.js')
// const modules = Object.keys(files).map(key => [...files[key].default])

export default [
  ...comps,
  ...func,
  ...pages,
  ...nested,
  ...dynamicRoute,
  ...links,
  ...flow,
  ...graph,
  ...excel,
  ...sys,
  ...about,
]
