import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/userNotify',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      redirect: '/userNotify',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/account',
    component: Layout,
    // redirect: '/account/detailInfo',
    // meta: { title: 'DetailInfo', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'detailInfo',
        name: 'DetailInfo',
        component: () => import('@/views/detail/index'),
        meta: { title: 'DetailInfo', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/notify',
    component: Layout,
    redirect: '/notify',
    meta: { title: 'Notify', icon: 'el-icon-message-solid' },
    children: [
      {
        path: '/globalNotify',
        name: 'GlobalNotify',
        component: () => import('@/views/notify/GlobalMessage/index'),
        meta: { title: '系统通知', icon: 'el-icon-s-opportunity' }
      },
      {
        path: '/userNotify',
        name: 'UserNotify',
        component: () => import('@/views/notify/RemindMessage/index'),
        meta: { title: '我的消息', icon: 'el-icon-s-comment' }
      }
    ]
  },
  {
    path: '/publishPosition',
    component: Layout,
    // redirect: '/account/detailInfo',
    // meta: { title: 'PublishPosition', icon: 'el-icon-s-promotion' },
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/publishPosition/index'),
        meta: { title: 'PublishPosition', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  {
    path: '/seekApply',
    component: Layout,
    // redirect: '/account/detailInfo',
    // meta: { title: 'SeekApply', icon: 'el-icon-postcard' },
    children: [
      {
        path: 'seekApply',
        name: 'SeekApply',
        component: () => import('@/views/seekApply/index'),
        meta: { title: 'SeekApply', icon: 'el-icon-postcard' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
