import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setToken, getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

// 路由跳转钩子
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // 接收从其他地方跳转来的token
  let willTo = ""
  if (to.query.to !== undefined){
    willTo = to.query.to
  }
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 判断是否为hr
        if (store.getters.userType === 1){
          if (willTo === '')
            next()
          else
            next(willTo)
        } else {
          await store.dispatch("user/logout")
          next("/")
        }

      } else {
        try {
          // 获取用户详细信息
          await store.dispatch('user/getInfo') // 埋坑注释
          // 成功则跳转
          if (willTo === '')
            next()
          else
            next(willTo)
          // 异常则跳转到这里
        } catch (error) {
          // 移除token 并跳转到 login 界面
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // console.log("this")
    // 没有token 判断是否在 白名单里
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单则允许跳转
      next()
    } else {
      // 否则 跳转到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
