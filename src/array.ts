type FlatOption={
    children?:string|symbol
}
type SimpleValue=string|number|boolean|RegExp|symbol
/**
 * 数组 1 是否包含数组 2 的全部元素
 * @param array1
 * @param array2
 */
export function contain(array1: readonly any[], array2: readonly any[]) {
    return array2.every(item => array1.includes(item))
}

/**
 * 求两个集合的交集
 * @param array1
 * @param array2
 */
export function intersection<T>(array1: readonly T[], array2: readonly T[]) {
    return array1.filter(item => array2.includes(item))
}

/**
 * 求两个集合的差集
 * @param array1
 * @param array2
 */
export function difference<S>(array1: readonly S[], array2: readonly any[]) {
    return array1.filter(item => !array2.includes(item))
}

/**
 * 求两个集合的并集
 * @param array1
 * @param array2
 */
export function union<T>(array1: readonly T[], array2: readonly T[]) {
    return Array.from(new Set([...array1, ...array2]))
}

/**
 * 简单一维数组去重
 * @param array
 */
export function deduplicate(array: readonly SimpleValue[]) {
    return [...new Set(array)]
}

/**
 * 移除数组指定项
 * @param list {any[]}
 * @param item {any}
 */
export function remove<T>(list: T[], item: T) {
    const index = list.indexOf(item)
    if (index >= 0) {
        list.splice(index, 1)
        return true
    }
}

/**
 * 扁平化处理一个对象数组
 * @param source
 * @param options
 */
export function flat(source:any[],options:FlatOption):any[]{
    return source.reduce((target:any[],item)=>{
        return target.concat(item,flat(item[options.children]||[],options));
    },[])
}