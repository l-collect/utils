import {regexp} from './regexp'
export function isHex(str) {
    return regexp.hexColor.test(str);
}

export function isRgb(str) {
    return (regexp.rgbColor.test(str));
}
export function rgb2Hex(str) {
    let result=str
    if (isRgb(str)) {
        const aColor = str.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        let strHex = '#';
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = `0${hex}`;
            }
            strHex += hex;
        }
        result = strHex;
    }
    return result;
}
export function hex2Rgb(str) {
    let result=str
    let sColor = str.toLowerCase();
    if (isHex(str)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        const sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
        }
        result = `RGB(${sColorChange.join(',')})`;
    }
    return result
}
/**
 * @description 返回rgba随机色
 * @param { Number } opacity    透明度 0～1之间
 * @return { String } rgba色值
 */

export function randomColor(opacity = 1) {
    const r = ~~(Math.random() * 256)
    const g = ~~(Math.random() * 256)
    const b = ~~(Math.random() * 256)
    return `rgba(${r},${g},${b},${opacity})`
}