// 基础列表
import Mock from 'mockjs'
import { builder } from '@/mock/util'
import departs from '@/mock/list/departs'

Mock.mock(/\/depart\/tree/, 'get', () => builder(departs))
