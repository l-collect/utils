/**
 * @module number
 * @description 判断是否为数字类型
 * @param { Number } value 数值
 */

export function isDigit(value) {
    let patrn = /^[0-9]*$/
    return !(!patrn.exec(value) || value === '')
}
/**
 * @module number
 * @description 判断一个数是否为素数（质数）
 * @param { Number } number 数值
 */

export function isPrimes(number) {
    if (typeof number !== 'number') {
        throw Error('isPrimes first argument is not a number')
    }
    if (number === 1) {
        return false
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false
        }
    }
    return true
}
/**
 * @module number
 * @description 获取两个数之间的随机数
 * @param { Number } min 第一个数
 * @param { Number } max 第二个数
 */

export function randomBetween(min = 1, max = 100) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw Error('randomBetween arguments is not a number')
    }
    if (min > max) {
        throw Error('randomBetween first argument must less than second param')
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}