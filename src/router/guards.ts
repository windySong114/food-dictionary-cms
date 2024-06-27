// 全局前置路由
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import useUserStore from "@/store/modules/user"

//5. 路由扁平化 
const flatRouters = (routes: RouteItem[]): RouteItem[] => {
    let res: RouteItem[] = [];
    //深度复制对象，并处理循环引用
    const cloneRoutes  = JSON.parse(JSON.stringify(routes));
    res = $utils.list.flatTree(cloneRoutes)
    return res;
};

export const beforeEach = (to: RouteLocationNormalized) => {
    let curRoute: RouteLocationNormalized
    if (Object.keys(to.meta || {}).length) {
        curRoute = to;
    } else {
        curRoute = flatRouters.find((i:RouteItem) => i.path == to.fullPath)
    }
    if (!curRoute.meta._isHideSidebar) {
        const userStore = useUserStore()
        userStore.addTag({
            meta: curRoute.meta as RouterMeta,
            path: curRoute.path,
            query: curRoute.query,
            params: curRoute.params
        })
    }
    return true
}

// 全局后置路由
export const afterEach = () => {
    console.log('后置')
}