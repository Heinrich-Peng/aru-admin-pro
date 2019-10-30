import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import qs from 'qs'
import { sign } from '@/utils/sign'
import Config from '@/config/defaultSettings'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 30000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    // if (error.response.status === 403) {
    //   notification.error({
    //     message: 'Forbidden',
    //     description: data.message
    //   })
    // }
    // if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
    //   notification.error({
    //     message: 'Unauthorized',
    //     description: 'Authorization verification failed'
    //   })
    //   if (token) {
    //     store.dispatch('Logout').then(() => {
    //       setTimeout(() => {
    //         window.location.reload()
    //       }, 1500)
    //     })
    //   }
    // }
    if (error.response.status === 401) {
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      } else if (error.response.status === 403) {
        notification.error({ message: '错误', description: data.path + ',' + data.message })
      } else if (error.response.status === 502) {
        notification.error({ message: '错误', description: '连接服务器失败!' })
      } else if (error.response.status === 429) {
        notification.error({ message: '错误', description: '访问太过频繁，请稍后再试!' })
      } else {
        notification.error({ message: '错误', description: error.response.data.message })
      }
    } else {
      notification.error({ message: '错误', description: '连接服务器失败!' })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  // const token = Vue.ls.get(ACCESS_TOKEN)
  // if (token) {
  //   config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  // }
  // return config

  // 参数签名处理
  config = sign(config, Config.appId, Config.appSecretKey, 'SHA256')
  config.method === 'get'
    ? config.params = { ...config.params } : config.data = qs.stringify({ ...config.data })
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  // return response.data
  if (response.data.code === 0) {
    // 服务端定义的响应code码为0时请求成功
    // 使用Promise.resolve 正常响应
    return Promise.resolve(response.data)
  } else {
    // 使用Promise.reject 响应
    notification.error({ message: '错误', description: response.data.message })
    return Promise.reject(response.data)
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as request
}
