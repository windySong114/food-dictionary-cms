// 从字符串中获取参数
function getQueryString(paramStr:string, name:string) {
    if (!paramStr) return null
    paramStr = decodeURIComponent(paramStr)
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = paramStr.split("?")[1].match(reg);
    if (r != null) return r[2];
    return null;
}

// 复制到剪贴板
function copyToClipboard(text:string) {
    return new Promise<[boolean, string]>((resolve,reject)=>{
        navigator.clipboard.writeText(text)
        .then(() => {
            resolve([true,'复制成功'])
        })
        .catch(err => {
            resolve([false,err])
        });
    })
}

// 判断是否为空
function isEmpty(obj:any) {
    if (obj === null || obj === undefined) return true
    let type = Object.prototype.toString(obj)
    switch (type) {
        case '[object String]':
            if (obj === '' || obj.trim() === '') return true
            break
        case '[object Array]':
            if (Object.keys(obj).length === 0) return true
            break
        case '[object Object]':
            let t = typeof (obj)
            if (t === 'number') return false
            if (Object.keys(obj).length === 0) return true
            break
    }
    return false
}

export default {
    // 从query 字符串中提取参数
    getQueryString,
    // 复制到剪贴板
    copyToClipboard,
    // 判空
    isEmpty
}