/**
 * @module dom
 * @description 判断元素是否存在某个class类
 * @param { HTMLElement } el dom元素
 * @param { String } className class名称
 * @example
 *  hasClass(document.body, 'temp-class')
 */

export function hasClass(el, className) {
    return el.classList.contains(className)
}
/**
 * @module dom
 * @description 判断元素是否存在某个class类
 * @param { HTMLElement } el dom元素
 * @param { String | string[] } className class名称
 * @example
 *  addClass(document.body, 'temp-class')
 */
export function addClass(el, className) {
    if (Array.isArray(className)) {
        className.forEach(item => {
            if (!hasClass(el, item)) {
                el.classList.add(item)
            }
        })
        return
    }
    if (!hasClass(el, className)) {
        el.classList.add(className)
    }
}
/**
 * @module dom
 * @description 获取元素的css属性内容
 * @param { HTMLElement } el dom元素
 * @param { String } cssProp css的属性名称
 * @return { String } css对应的属性的值
 * @example
 * computedStyle(document.body, 'width')
 */

export function computedStyle(el, cssProp) {
    if (!el || !cssProp) return
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(el, '')[cssProp] : el.currentStyle[cssProp]
}
/**
 * @module dom
 * @description 复制网页文字到剪切板
 * @param { String } str 拷贝的内容
 * @example
 * copyToClipboard('hello world')
 */

export function copyToClipboard(str) {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)

    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false

    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
    }
}
/**
 * @module dom
 * @description 获取当前页面的滚动位置
 * @param { String } el 元素
 * @example
 * getScrollPosition() //  {x: 3, y: 6023}
 */

export function getScrollPosition(el = window) {
    // @ts-ignore
    return {
        x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollX,
        y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollY
    }
}
/**
 * @module dom
 * @description 动态加载css样式
 * @param { String } url link的地址
 * @param { Object } config link属性配置
 * @return { Promise }
 */

export function loadCss(url, config) {
    return new Promise<void>((resolve, reject) => {
        try {
            const link = document.createElement('link')
            link.href = url
            for (let k in config) {
                link[k] = config[k]
            }
            document.getElementsByTagName('head')[0].appendChild(link)
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
/**
 * @module dom
 * @description 动态加载script标签
 * @param { String } url  script 的地址
 * @param { Object } config  script配置
 * @return { Promise } onload的 e
 */

export function loadScript(url, config) {
    return new Promise((resolve, reject) => {
        try {
            const body = document.body || document.getElementsByTagName('body')[0]
            const script = document.createElement('script')
            script.src = url
            script.onload = resolve
            script.onerror = reject
            for (let k in config) {
                script[k] = config[k]
            }
            body.appendChild(script)
        } catch (e) {
            reject(e)
        }
    })
}
/**
 * @module dom
 * @description 元素删除class
 * @param { HTMLElement } el dom元素
 * @param { (String | Array) } className class名称，可以是多个
 */
export function removeClass(el, className) {
    if (Array.isArray(className)) {
        className.forEach(item => {
            if (hasClass(el, item)) {
                el.classList.remove(item)
            }
        })
        return
    }
    if (hasClass(el, className)) {
        el.classList.remove(className)
    }
}