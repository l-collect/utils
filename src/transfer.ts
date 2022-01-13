/**
 * @module transfer
 * @description base64解码成字符串
 * @param { String } str base64字符串
 * @return { String } 返回str字符串
 */
export function base64Decode(str) {
    return window.atob(decodeURIComponent(str))
}
/**
 * @module transfer
 * @description 字符串转成base64编码
 * @param { String } str 字符串
 * @return { String } str base64 字符串
 */
export function base64Encode(str) {
    return window.btoa(str)
}
/**
 * @module transfer
 * @description 文件转成blob流
 * @param { File } dataUrl  单个file
 * @return { Blob } 返回新的文件流  可以append到formdata中
 */

export function fileToBolb(dataUrl) {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}
/**
 * @module transfer
 * @description html解码（反转义）
 * @param { String } text 需要反转义的字符串
 * @param { Boolean } useDom 转换方法选择
 * @return { String }
 */

export function htmlDecode(text, useDom) {
    if (text.length === 0) return ''

    let output = ''
    if (useDom) {
        let el = document.createElement('div')
        el.innerHTML = text
        output = el.innerText || el.textContent
        el = null
    } else {
        output = text.replace(/&amp;/g, '&')
        output = output.replace(/&lt;/g, '<')
        output = output.replace(/&gt;/g, '>')
        output = output.replace(/&nbsp;/g, ' ')
        output = output.replace(/&#39;/g, '\'')
        output = output.replace(/&quot;/g, '"')
    }
    return output
}
/**
 * @module transfer
 * @description html编码（转义）
 * @param { String } text 需要转义的字符串
 * @param { Boolean } useDom 转换方法选择
 * @return { String }
 */

export function htmlEncode(text, useDom) {
    if (text.length === 0) return ''

    let output = ''
    if (useDom) {
        let el = document.createElement('div')
        el.textContent !== undefined ? (el.textContent = text) : (el.innerText = text)
        output = el.innerHTML
        el = null
    } else {
        output = text.replace(/&/g, '&amp;')
        output = output.replace(/</g, '&lt;')
        output = output.replace(/>/g, '&gt;')
        output = output.replace(/\s/g, '&nbsp;')
        output = output.replace(/\\'/g, '&#39;')
        output = output.replace(/\\"/g, '&quot;')
    }
    return output
}