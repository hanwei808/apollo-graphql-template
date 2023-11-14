import { RouteRecordRaw, RouterView } from "vue-router";

const routers: RouteRecordRaw = {
    path: '/permission',
    name: 'permission',
    component: RouterView,
    meta: {
        title: '权限管理'
    },
    children: [
        {
            path: 'permission_admin',
            name: 'permission_admin',
            component: () => import('@/views/permission/admin/index.vue'),
            meta: {
                title: '管理员列表'
            }
        },
        {
            path: 'permission_role',
            name: 'permission_role',
            component: () => import('@/views/permission/role/index.vue'),
            meta: {
                title: '角色列表'
            
            }
        },
        {
            path: 'permission_rule',
            name: 'permission_rule',
            component: () => import('@/views/permission/rule/index.vue'),
            meta: {
                title: '规则列表'
            }
        },
    ]
}

export default routers