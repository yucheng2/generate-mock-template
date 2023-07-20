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
// const mockRes = Mock.mock(res)
// const test = JSON.stringify(mockRes)
fs.writeFileSync('./test.json', JSON.stringify(res))