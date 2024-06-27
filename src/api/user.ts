// 用户登录
export async function userLoginApi(data:{
    username: string,
    password: string,
    verifyCode: string
}){
    let [suc,res] = await $utils.https.request({
        url: "/user/login",
        method: "POST",
        data:data
    })
    return [suc,res]
}

// 获取用户信息
export async function getUserInfoApi(){
    let [suc,res] = await $utils.https.request({
        url: "/user/get_current_info",
        method: "GET",
    })
    return [suc,res]
}

// 获取验证码
export async function getVerifyCodeApi(){
    let [suc,res] = await $utils.https.request({
        url: "/user/get_verify_code",
        method: "GET",
    })
    return [suc,res]
}

// 退出登录
export async function logoutApi(){
    let [suc,res] = await $utils.https.request({
        url: "/user/logout",
        method: "POST",
    })
    return [suc,res]
}