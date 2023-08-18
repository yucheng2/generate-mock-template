import Mock from 'mockjs'
import {generateMockTemplate} from "./index.js";
import fs from 'node:fs'
import clipboardy from 'clipboardy'

// 读取js文件
let obj
const jsFile = fs.readFileSync('./rowObj.txt', 'utf-8')
eval(`obj = ${jsFile}`)
const res = generateMockTemplate(obj)
// const mockRes = Mock.mock(res)
// const test = JSON.stringify(mockRes)
const wrapper = ` Mock.mock(${JSON.stringify(res)})`
fs.writeFileSync('./test.json', wrapper)
clipboardy.writeSync(wrapper)