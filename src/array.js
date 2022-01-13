import { getType, isExist, isSame } from './object';

// 数组去重
export function unique(srcArr) {
    if (getType(srcArr)!=='array') {
        return srcArr;
    }
    if (typeof window.Set === 'function' && srcArr.every(item => getType(item) !== 'object')) {
        return [...new Set(srcArr)];
    }
    return srcArr.filter((item, i) => srcArr.findIndex(child => isSame(item, child)) === i);
}
/**
 * 数组过滤方法
 * @param {array} arr 需要过滤的数组
 * @param {object} filters 过滤参数，
 * @param {string} logic 参数之间的逻辑关系，可选'and'和'or'
 * @returns {array|Error}  返回过滤之后的数组
 */
export function filter(arr, filters, logic = 'and') {
    if (getType(arr) !== 'array') return new Error('type error');
    function filterFn(item, key, value) {
        // 数组项没有对应的key
        if (item[key] === undefined) return false;
        // 过滤条件为object
        if (getType(value) === 'object') {
            // 如果key对应的数组项为object
            if (getType(item[key]) === 'object') {
                return JSON.stringify(item[key]) === JSON.stringify(value);
            }
            // 对数字类型，min，max做范围限制
            if (getType(item[key]) === 'number' && (value.min !== undefined || value.max !== undefined)) {
                if (value.min !== undefined && value.max !== undefined) {
                    return item[key] >= value.min && item[key] <= value.max;
                }
                if (value.min) return item[key] >= value.min;
                return item[key] <= value.max;
            }
        }
        // 过滤条件为数组
        if (getType(value) === 'array') {
            if (getType(item[key]) === 'array') {
                return value.every(v => item[key].includes(v));
            }
            return value.includes(item[key]);
        }
        // 文本过滤，采用模糊匹配
        if (getType(item[key]) === 'string' && getType(value) === 'string') {
            return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
        }
        return item[key] === value;
    }
    return arr.filter(item => {
        const keys = Object.keys(filters);
        if (logic === 'and') {
            return keys.every((key) => {
                const result = filterFn(item, key, filters[key]);
                return result;
            });
        } if (logic === 'or') {
            return keys.some(key => filterFn(item, key, filters[key]));
        }
        throw new Error('logic error。allow:and/or');
    });
}
/**
 * 数组合并
 * @param a {array} 数组a
 * @param b {array} 数组b
 * @returns {Error|array}
 */
export function merge(a, b) {
    if (getType(a) !== getType(b) || getType(a) !== 'array') return new Error('type error。allow:array');
    const result = a;
    b.forEach((child) => {
        if (!isExist(child, a)) {
            result.push(child);
        }
    });
    return result;
}
/**
 * 多个数组求交集
 * @params 数组 用,分隔
 * @returns {*}
 */
export function intersect() {
    const arrayList = [...arguments].filter(item=>getType(item)==='array').sort((a, b) => a.length - b.length);
    const [minArr] = arrayList.pop();// 取出最短的数组，与每一项进行比较，减少比较次数
    return minArr.filter(item => arrayList.every(arr => arr.some(child => isSame(item, child))));
}
/**
 * @module array
 * @description 返回两个数组之间的差集
 * @param { Array } args 两个数组
 * @return { Array } 返回数组
 * @example
 *  diffArr([1, 2, 3], [2]) // [1, 3]
 */

export function diff(a, b) {
    return a.filter(item => {
        return !b.some(child=>isSame(item,child))
    })
}

/**
 *
 * @param {Array} array
 * @returns {Array}
 */
export function flat(array) {
    return array.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
    })
}
/**
 * @module array
 * @description 返回数组之间的并集
 * @param { Array } args 可以是多个数组，数量不限制
 * @return { Array } 返回数组
 */
export function union(){
    return unique(flat([...arguments]))
}
