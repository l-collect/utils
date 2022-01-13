/**
 * 获取某个数据的类型
 * @param value 需要过去类型的数据
 * @returns {string} 对应类型名称
 */
export function getType(value) {
    const str = Object.prototype.toString.call(value);

    return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}