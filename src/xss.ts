const __xssMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
};

// 针对普通文本的编码
export function xssH(s) {
    s += '';
    if (/(?:&|<|>|"|'|`)/.test(s) === false) {
        return s;
    }
    return s.replace(/(?:&|<|>|"|'|`)/g, (match) => __xssMap[match]);
}

// 针对url里面query key，value的编码
export function xssUrlv(s) {
    return encodeURIComponent(s).replace("'", '%27');
}
