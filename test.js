import {generateMockTemplate} from "./index.js";
import fs from 'node:fs'
import clipboardy from 'clipboardy'
import {resIsArray} from "./utils.js";

// 读取js文件
let obj
const jsFile = fs.readFileSync('./rowObj.txt', 'utf-8')
eval(`obj = ${jsFile}`)
const res = generateMockTemplate(obj)
// const mockRes = Mock.mock(res)
// const test = JSON.stringify(mockRes)
let wrapper = ` Mock.mock(${JSON.stringify(res)})`
if (resIsArray(res)) {
    wrapper += '.list'
}
console.log(wrapper)
fs.writeFileSync('./test.json', wrapper)
clipboardy.writeSync(wrapper)
