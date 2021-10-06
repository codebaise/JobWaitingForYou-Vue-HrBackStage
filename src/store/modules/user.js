import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(), // token 在登录后/跳转过来的时候直接设置, 且token实际是从cookie中获取
    name: 'zhi',
    fillLevel: '',
    roles: [],
    userType: '',
    homeLink: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_FILL_LEVEL: (state, fillLevel) => {
    state.fillLevel = fillLevel
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_TYPE: (state, userType) => {
    state.userType = userType
  },
  SET_HOME_LINK: (state, homeLink) => {
    state.homeLink = homeLink
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        let { info } = response.data
        if (!info) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, userInfoFillLevel, userType, homeLink } = info

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_FILL_LEVEL', userInfoFillLevel)
        commit('SET_USER_TYPE', userType)
        commit('SET_HOME_LINK', homeLink)
        resolve(info)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve() // 这句才会去执行成功时指向的then方法
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve() // 这句才会去执行成功时指向的then方法
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

