import { request } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  authorities: '/authorities',
  authoritiesNoPager: '/authorities/no-pager',
  orgTree: '/org/tree'
}

export function getUserList (parameter) {
  return request({
    baseURL: '/',
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    baseURL: '/',
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return request({
    baseURL: '/',
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getauthoritiess (parameter) {
  return request({
    baseURL: '/',
    url: api.authoritiesNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return request({
    baseURL: '/',
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return request({
    baseURL: '/',
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
