import { RouteRecordRaw } from 'vue-router'
import Layout from "@/layout/layout.vue"

export const STATIC_ROUTES: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        name: 'layout',
        component: Layout,
        children: [{
            path: "/home",
            component: () => import('@/pages/system/home.vue'),
            meta: {
                title: "首页",
                icon: "House"
            }
        },{
            path: '/user',
            name: 'User',
            meta: { 
                title: '用户管理',
                icon: "User"
            },
            children: [{
                path: '/user/userList',
                component: () => import('@/pages/user/userList.vue'),
                name: 'UserList',
                meta: { 
                    title: '用户列表',
                }
            },{
                path: '/user/userInfo',
                component: () => import('@/pages/user/userInfo.vue'),
                name: 'UserInfo',
                meta: { 
                    title: '用户信息',
                }
            }]
        }]
    },
    {
        path: '/login',
        component: () => import('@/pages/user/login.vue'),
        meta: {
            hidden: true,
            _isHideSidebar: true
        },
    },
]