import {getType} from "./object";

export function format(format,date) {
    if(getType(date)==='string'){
        date=new Date(date)
    }
    if(getType(date)==='number'){
        date=new Date(parseInt(date) * 1000)
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}
export function toLocaleString(date) {
    if(getType(date)==='string'){
        date=new Date(date)
    }
    if(getType(date)==='number'){
        date=new Date(parseInt(date) * 1000)
    }
    const dateTimeStamp = date.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const now = new Date().getTime();
    let result = '';
    const diffValue = now - dateTimeStamp;
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;
    if (monthC >= 1) {
        result = format('YYYY-mm-dd HH:MM:MM',date);
    } else if (weekC >= 1) {
        result = `${parseInt(String(weekC), 12)}周前`;
    } else if (dayC >= 1) {
        result = `${parseInt(String(dayC), 12)}天前`;
    } else if (hourC >= 1) {
        result = `${parseInt(String(hourC), 12)}小时前`;
    } else if (minC >= 1) {
        result = `${parseInt(String(minC), 12)}分钟前`;
    } else {
        result = '刚刚';
    }
    return result;
}
