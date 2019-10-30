import Vue from 'vue'
import { login, getUserInfo, getUserMenu } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    authorities: [],
    menus: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_AUTHORITIES: (state, authorities) => {
      state.authorities = authorities
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const result = res.data
          const token = result.access_token
          Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', token)
          resolve(res)
        }).catch((e) => {
          reject(e)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const result = res.data
          const access = []
          if (result.authorities) {
            result.authorities.map(item => {
              if (item.authority) {
                access.push(item.authority)
              }
            })
          }
          // commit('SET_AVATAR', result.avatar)
          commit('SET_AVATAR', '/avatar.jpg')
          commit('SET_NAME', { name: result.nickName, welcome: welcome() })
          // 转换权限
          commit('SET_AUTHORITIES', access)
          commit('SET_INFO', result)
          getUserMenu().then(res => {
            const result = res.data
            commit('SET_MENUS', result)
            resolve(state)
          }).catch((e) => {
            reject(e)
          })
        }).catch((e) => {
          reject(e)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_AUTHORITIES', [])
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
      })
    }

  }
}

export default user
