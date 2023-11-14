import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import permission from '@/router/modules/permission'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home/index.vue'),
                meta: {
                    title: "首页"
                }
            },
            permission
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/index.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 配置路由守卫
router.beforeEach(() => {
    nprogress.start()
})
router.afterEach(() => {
    nprogress.done()
})

export default router