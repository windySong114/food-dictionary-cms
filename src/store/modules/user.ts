import { defineStore } from 'pinia'
import { userLoginApi, getUserInfoApi } from "@/api/user"
//定义store
const useUserStore = defineStore('userStore', {
    // state：类似组件中的data，重置state：const resetBtn = ()=> {useUserStore.$reset()}
    state: () => {
        return {
            token: null as String|null, // 登录令牌
            hasLogin: false as Boolean, // 是否登录
            userInfo: {
                username: "", // 用户名称
                nickname: "", // 昵称
                avatar: "", // 头像
                phone: "", // 手机号码
                email: "", // 邮箱  
                roleName: "", // 角色名称
                roleCode: "", // 角色码
            } as UserInfo,
            roles: [] as Array<string>,// 用户角色
            permissionMenuList: [] as RouteItem[],// 权限菜单列表
            isSideBarScale: false as boolean, // 左侧菜单是否收起/展开
            tagsViewList:[] as TagsViewItem[], // 用户标签页列表
        }
    },
    // getters：类似组件中的computed
    getters: {
        // 获取token
        getToken(state) {
            return state.token
        }
    },
    // actions：类似组件中的methods，调用异步方法：const getCount = () => {useUserStore.setCount()}
    actions: {
        // 登录
        async requestLogin(loginForm:UserInfo){
            let [loginSuc,loginRes] = await userLoginApi({
                username: loginForm.username,
                password: loginForm.password,
                verifyCode: loginForm.verifyCode
            })
            if(!loginSuc) return false
            this.token = loginRes.data.token
            this.hasLogin = true
            let isSuc = await this.requestUserInfo()
            return isSuc
        },
        // 退出登录
        async requestLogout(){
            console.log("退出")
        },
        // 获取用户信息
        async requestUserInfo(){
            let [infoSuc,infoRes] = await getUserInfoApi()
            if(!infoSuc) return false
            this.userInfo = infoRes.data
            return true
        },
        // 切换左侧菜单展开/收起
        changeSideBarScale(){
            this.isSideBarScale = !this.isSideBarScale
        },
        // 移除标签
        removeTagByIndex(index:number){
            if(this.tagsViewList.length<=1){
                console.error('错误：tagsViewList长度至少为1')
                return
            }
            this.tagsViewList.splice(index,1)
        },
        // 清空标签，可以输入排除索引
        clearTag(excludeIndex:number[]){
            let list:TagsViewItem[] = []
            excludeIndex.forEach(index=>{
                list.push(this.tagsViewList[index])
            })
            if(list.length==0){
                list = [this.tagsViewList[0]]
            }
            this.tagsViewList = list
        },
        // 通过路径获取标签
        getTagIndexByPath(path:string){
            return this.tagsViewList.findIndex((item:TagsViewItem)=>{
                return item.path == path
            })
        },
        // 添加标签
        addTag(e:TagsViewItem){
            let index = this.getTagIndexByPath(e.path)
            if(index<0){
                this.tagsViewList.push(e)
            }
        }
    },
    
    // 将 persist 选项设置为 true，整个 Store 将使用默认持久化配置保存
    persist: [{
        key: 'piniaStore', //存储名称
        storage: sessionStorage, // 存储方式
        paths: ['userInfo'], //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
    },{
        key: 'AUTH_TOKEN', //存储名称
        storage: localStorage, // 存储方式
        paths: ['token'], //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
    }]
})

export default useUserStore