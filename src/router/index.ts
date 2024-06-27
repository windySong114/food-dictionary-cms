import { createRouter, createWebHistory } from 'vue-router'
// 引入静态路由表
import { STATIC_ROUTES } from './routes'
// 引入全局路由守卫
import { beforeEach, afterEach } from './guards'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_FRONT_CONTEXT_NAME),
    routes: STATIC_ROUTES
})

// 全局前置导航守卫
router.beforeEach(beforeEach)
// 全局后置导航守卫
router.afterEach(afterEach)

export default router