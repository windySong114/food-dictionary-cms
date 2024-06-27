// 判断是否为移动端设备
function isMobile(): boolean {
    const userAgent = navigator.userAgent;

    // 使用一些常见的移动设备关键词进行匹配
    const mobileKeywords = [
        'Android',
        'iPhone',
        'iPad',
        'Windows Phone',
        'BlackBerry',
        'Nokia',
        'Mobile'
    ];

    return mobileKeywords.some(keyword => userAgent.includes(keyword));
}

export default {
    isMobile
}