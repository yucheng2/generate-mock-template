import Mock from 'mockjs'
import {generateMockTemplate} from "./index.js";
import fs from 'node:fs'

const obj = {
    age: 0,
    name: "张三",
    isMale: true,
    arr: [
        {
            name: "张三",
            age: 18,
            list: [
                {
                    name: "张三",
                    age: 18,
                },
                {
                    name: "张三",
                    age: 18,
                }
            ]
        }
    ],
    obj: {
        a: 1,
        obj: {
            name: "张三",
            age: 18,
        },
        list: [
            {
                name: "张三",
                age: 18,
            },
            {
                name: "张三",
                age: 18,
            },
        ]
    },
    date: new Date(),
}
const res = generateMockTemplate(obj)
console.log(res)
const mockRes = Mock.mock({
    'age|0-100': 0,
    'name|5': '张三',
    'isMale|1': true,
    'arr|10': [
        {
            'name|5': '张三',
            'age|0-100': 18,
            'list|10': [{'name|5': '张三', 'age|0-100': 18}]
        }
    ],
    'obj|1': {
        'a|0-100': 1,
        'obj|1': {'name|5': '张三', 'age|0-100': 18},
        'list|10': {'name|5': '张三', 'age|0-100': 18}
    },
    'date|1': {}
})
const test = JSON.stringify(mockRes)
fs.writeFileSync('./test.json', test)