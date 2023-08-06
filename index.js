// 把这个变量转换成一个mockjs的模板的脚本
// 类型: string number boolean array object date
export const generateMockTemplate = (obj) => {
    if(Array.isArray(obj)){
        return generateMockTemplateArray(obj)
    }
    const keys = Object.keys(obj)
    const template = {}
    keys.forEach(key => {
        const value = obj[key]
        if (typeof value === "string") {
            template[generateString(key)] = value
        } else if (typeof value === "number") {
            template[generateNumber(key)] = value
        } else if (typeof value === "boolean") {
            template[generateBoolean(key)] = value
        } else if (Array.isArray(value)) {
            let [newKey, newValue] = generateArray(key, value)
            // 如果是数组，那么就需要把数组里面的每一项都转换成模板
            if (typeof newValue === "object") {
                newValue = generateMockTemplate(newValue)
            }
            template[newKey] = [newValue]
        } else if (typeof value === "object") {
            let [newKey, newValue] = generateObject(key, value)
            // 如果是对象，那么就需要把对象里面的每一项都转换成模板
            if (typeof newValue === "object") {
                newValue = generateMockTemplate(newValue)
            }
            template[newKey] = newValue
        } else if (value instanceof Date) {
            const [newKey, newValue] = generateDate(key)
            template[newKey] = newValue
        } else {
            template[key] = value
        }
    })
    return template
}

function generateMockTemplateArray(array) {
    const obj = {
        list: [array[0]]
    }
    return generateMockTemplate(obj)
}

const generateString = (key, num = 5) => {
    return `${key}|${num}`
}
const generateNumber = (key, min = 0, max = 100) => {
    return `${key}|${min}-${max}`
}
const generateBoolean = (key) => {
    return `${key}|1`
}
const generateArray = (key, template, num = 10,) => {
    return [`${key}|${num}`, template[0]]
}
const generateObject = (key, template) => {
    return [`${key}`, template]
}
const generateDate = (key) => {
    return [`${key}|1`, `Mock.Random.date()`]
}

