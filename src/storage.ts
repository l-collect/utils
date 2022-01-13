/**
 * 存储
 */
function set(key, value) {
    if (!key.trim()) { return; }

    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}
/**
 * 获取
 */
function get(key) {
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
function remove(key) {
    if (!key) { return; }
    window.localStorage.removeItem(key);
}

export const storage= {
    set,
    get,
    remove,
};
