/**
 * 获取某个数据的类型
 * @param value 需要过去类型的数据
 * @returns {string} 对应类型名称
 */
export function getType(value) {
    const str = Object.prototype.toString.call(value);
    return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}
/**
 * 检测a，b两个值是否相同
 * @param a
 * @param b
 * @returns {boolean}
 */
export function isSame(a, b) {
    if (getType(a) !== getType(b)) return false;
    const type = getType(a);
    if (type === 'object') {
        return Object.keys(a).every(key => isSame(a[key], b[key]));
    }
    if (type === 'array') {
        return a.every((item) => b.some(temp => isSame(item, temp)));
    }
    return a === b;
}

/**
 * 检测某个值是否存在于某个指定的范围中
 * @param value {any} 被检测的值
 * @param source {any} 被检测的范围
 * @returns {Error|boolean}
 */
export function isExist(value, source) {
    const sourceType = getType(source);
    if (sourceType !== 'array' && sourceType !== 'object') {
        return new Error('type error。allow:array/object');
    }
    const valueType = getType(value);
    if (valueType === 'object') {
        if (sourceType === 'array') {
            return source.some(item => getType(item) === 'object' && isSame(value, item));
        }
        if (sourceType === 'object') {
            return Object.keys(source).some(key => isSame(value, source[key]));
        }
        return false;
    }
    if (valueType === 'array') {
        if (sourceType === 'array') {
            return source.some(item => getType(item) === 'array' && item.length === value.length && isSame(value, item));
        }
        if (sourceType === 'object') {
            return Object.key(source).some(key => isSame(value, source[key]));
        }
        return false;
    }
    if (sourceType === 'array' || (valueType === 'string' && sourceType === 'string')) {
        return source.includes(value);
    }
    return false;
}

/**
 * 获取某个值得默认值
 * @param value 指定的值
 * @returns {*} 值对应类型的默认值
 */
export function getDefaultValue(value) {
    const defaultValue = {
        boolean: false,
        number: 0,
        null: null,
        undefined,
        string: '',
        array: [],
        map: new Map(),
        object: {},
        function: () => {},
        regexp: new RegExp(''),
    };
    const type = getType(value);
    return defaultValue[type];
}

/**
 * 对象覆盖
 * @param value {any} 旧值
 * @param newValue {any} 新值
 * @returns {any}
 */
export function cover(value, newValue) {
    if (getType(value) !== getType(newValue)) {
        return newValue;
    }
    let result = getDefaultValue(value);
    const type = getType(value);
    switch (type) {
        case 'boolean':
        case 'number':
        case 'null':
        case 'undefined':
        case 'string':
        case 'function':
        case 'regexp': {
            result = newValue;
            break;
        }
        case 'array': {
            result = value;
            newValue.forEach((child, i) => {
                result[i] = cover(result[i], child);
            });
            break;
        }
        case 'object': {
            result = value;
            const ak = Object.keys(value);
            Object.keys(newValue).forEach(key => {
                result[key] = ak.includes(key) ? cover(value[key], newValue[key]) : newValue[key];
            });
            break;
        }
        default: result = newValue;
    }
    return result;
}

/**
 * 检测值是否为空
 * @param value {any} 需要检测的值
 * @returns {boolean}
 */
export function isEmpty(value) {
    return isSame(value, getDefaultValue(value));
}
/**
 * @description 深拷贝
 * @param { Any } data 被拷贝的数据
 * @return { Any } 返回新的数据
 */

export function deepClone(data) {
    const result = {}
    const keys = Object.keys(data)
    for (let k in keys) {
        let type = getType(data[k])
        switch (type) {
            case 'object':
                result[k] = deepClone(data[k])
                break
            case 'array':
                result[k] = [].concat(data[k])
                break
            default:
                result[k] = data[k]
        }
    }
    return result
}
/**
 * @module element
 * @description 对象继承添加属性、方法[类继承] Object.assign(...arg)的包装
 * @param { Any }   参数为object对象
 * @returns { Object } 返回一个新的对象
 * @example
 * extend({a: 1}, {a: 2, b: 1})   // { a: 2, b: 1 }
 */
export function extend(...arg) {
    return deepClone(Object.assign({}, ...arg))
}