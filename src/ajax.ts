export function encodeFormData(data) {
    if(!data) return '';
    let arr = [];
    let name, value;
    for(name in data) {
        if(typeof data[name] === 'object') {
            value = JSON.stringify(data[name]);
            arr.push(name+'='+value);
            continue;
        }
        if(data.hasOwnProperty(name)) continue;
        if(typeof data[name] === 'function') continue;
        value = data[name].toString();
        name = encodeURIComponent(name.replace('%20', '+'));
        value = encodeURIComponent(value.replace('%20', '+'));
        arr.push(name+'='+value);
    }
    return arr.join('&');
}
const xhr = new XMLHttpRequest();
export const ajax={
    get: function(url, data, success, error) {
        xhr.open('GET', url+'?'+encodeFormData(data), true);
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 ) {
                if( xhr.status === 200 ) {
                    success( JSON.parse(xhr.responseText) );
                }
                else {
                    error(xhr.status)
                }
            }
        }
        xhr.send(null)
    },
    post: function(url, data, success, error) {
        xhr.open('POST', url, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if( xhr.status === 200 ) {
                    success( JSON.parse(xhr.responseText) );
                }
                else {
                    error(xhr.status);
                }
            }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(encodeFormData(data));
    },
    file: function(url, data, success, error) {
        xhr.open('POST', url, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if( xhr.status === 200 ) {
                    success( JSON.parse(xhr.responseText) );
                }
                else {
                    error(xhr.status);
                }
            }
        }
        let formData = new FormData();
        for(let name in data) {
            if(!data.hasOwnProperty(name)) continue;
            let value = data[name];
            if(typeof value === 'function') continue;
            formData.append(name, value);
        }
        xhr.send(formData);
    }
}
