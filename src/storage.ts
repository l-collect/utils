/**
 * 存储
 */
export function set(key, value) {
    if (!key.trim()) { return; }

    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}
/**
 * 获取
 */
export function get(key) {
    if (!key.trim()) { return; }
    const value = window.localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}
/**
 * 删除
 */
export function remove(key) {
    if (!key) { return; }
    window.localStorage.removeItem(key);
}

export const storage= {
    set,
    get,
    remove,
};
