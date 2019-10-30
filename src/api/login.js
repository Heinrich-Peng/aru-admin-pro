import { request } from '@/utils/request'
import apis from './index'
export function getSmsCaptcha (data) {
  return request({
    url: apis.login.getSmsCaptcha,
    method: 'post',
    data: data
  })
}

/**
 * 用户登录
 * @param username
 * @param password
 */
export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return request({
    url: apis.login.login,
    data,
    method: 'post'
  })
}

/**
 * 登出
 */
export const logout = (token) => {
  return request({
    url: apis.login.logout,
    data: { token: token },
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: apis.login.getUserInfo,
    method: 'get'
  })
}

/**
 * 获取登录用户菜单权限
 */
export const getUserMenu = () => {
  return request({
    url: apis.login.getUserMenu,
    method: 'get'
  })
}

/**
 * get user 2step code open?
 * @param data {*}
 */
export function mobileLogin (data) {
  return request({
    url: 'admin/mobile/token/2',
    method: 'post',
    data: data
  })
}
