function deepen(modifyString: (source: string) => string) {
    function modifyObject<T extends unknown>(source: T): T {
        if (typeof source !== 'object' || !source) return source
        if (Array.isArray(source)) return source.map(modifyObject) as any
        const result = {} as any
        for (const key in source) {
            result[modifyString(key)] = modifyObject(source[key])
        }
        return result as T
    }

    return function<T> (source: T): T {
        if (typeof source === 'string') {
            return modifyString(source) as any
        } else {
            return modifyObject(source)
        }
    }
}

/**
 * 首字母大写
 * @param source 字符串
 */
export function capitalize(source: string) {
    return source.charAt(0).toUpperCase() + source.slice(1)
}

/** 驼峰转换
 * @param source {array|object|string} 要转换的对象或数组或字符串
 * @return array|object|string
 */
export const camelCase = deepen(source => source.replace(/[_-][a-z]/g, str => str.slice(1).toUpperCase()))
/** 横杠转换
 * @param source {array|object|string} 要转换的对象或数组或字符串
 * @return array|object|string
 */
export const paramCase = deepen(source => source.replace(/_/g, '-').replace(/(?<!^)[A-Z]/g, str => '-' + str.toLowerCase()))
/** 下划线转换
 * @param source {array|object|string} 要转换的对象或数组或字符串
 * @return array|object|string
 */
export const snakeCase = deepen(source => source.replace(/-/g, '_').replace(/(?<!^)[A-Z]/g, str => '_' + str.toLowerCase()))
