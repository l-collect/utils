export class SuperDate extends Date{
    constructor(date) {
        super(date)
    }
    getY() {
        return this.getFullYear();
    }
    getM() {
        return this.getMonth();
    }
    getD() {
        return this.getDate();
    }
    addDay(days) {
        let year = this.getY();
        let month = this.getM();
        let day = this.getD();
        return new Date(year, month, day + days);
    }
    minusDay(days) {
        let year = this.getY();
        let month = this.getM();
        let day = this.getD();
        return new Date(year, month, day - days);

    }
    format(format) {
        const o = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S': this.getMilliseconds()
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    }
    setDate(day) {
        return this.setDate(day);
    }
    setMonthLastDate() {
        return this.setDate(this.getMonthLastDate())
    }
    getMonthLastDate() {
        return new Date(this.getY(), this.getM() + 1, 0).getDate();
    }
    setLastMonth() {
        return new Date(this.getFullYear(), this.getMonth() - 1, 1);
    }
    _addPrefixOneZero(i) {
        let j = `00${i}`;
        return j.slice(-2);
    }
    getDateYMD() {
        return `${this.getFullYear()}-${this._addPrefixOneZero(this.getMonth() + 1)}-${this._addPrefixOneZero(this.getDate())}`;
    }
    timeCompare(d) {
        return this.getTime() - d.getTime();
    }
    before(d) {
        return this.timeCompare(d) <= 0;
    }
    after(d) {
        return this.timeCompare(d) >= 0;
    }
    equal(d) {
        return this.timeCompare(d) == 0;
    }
}