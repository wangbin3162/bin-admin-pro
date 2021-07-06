import Mock from 'mockjs'
import { builder } from '../util'
import base from '../list/base'
import articles from '../list/articles'
import projects from '../list/projects'

// 基础列表
Mock.mock(/\/list\/base/, 'get', () => builder(base))
// 文章列表
Mock.mock(/\/list\/articles/, 'get', () => builder(articles))
// 项目列表
Mock.mock(/\/list\/projects/, 'get', () => builder(projects))
