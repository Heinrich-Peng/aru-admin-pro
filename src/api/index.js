const apis = {
  user: {
    page: 'base/user',
    add: 'base/user/add',
    update: 'base/user/update',
    setRole: 'base/user/roles/add',
    updatePassword: 'base/user/update/password',
    updateCurrent: 'base/current/user/update',
    all: 'base/user/all',
    addUserRoles: 'base/user/roles/add',
    getUserRoles: 'base/user/roles'
  },
  role: {
    page: 'base/role',
    add: 'base/role/add',
    update: 'base/role/update',
    remove: 'base/role/remove',
    all: 'base/role/all',
    setUser: 'base/role/users/add',
    getRoleUsers: 'base/role/users',
    addRoleUsers: 'base/role/users/add'

  },
  developer: {
    page: 'base/developer',
    add: 'base/developer/add',
    update: 'base/developer/update',
    remove: 'base/developer/remove',
    all: 'base/developer/all',
    updatePassword: 'base/developer/update/password'
  },
  app: {
    page: 'base/app',
    add: 'base/app/add',
    update: 'base/app/update',
    remove: 'base/app/remove',
    updateClient: 'base/app/client/update',
    resetClient: 'base/app/reset',
    getApp: function (appId) {
      return `base/app/${appId}/info`
    },
    getClient: function (clientId) {
      return `base/app/client/${clientId}/info`
    }
  },
  api: {
    page: 'base/api',
    add: 'base/api/add',
    update: 'base/api/update',
    remove: 'base/api/remove',
    all: 'base/api/all',
    batchRemove: 'base/api/batch/remove',
    batchUpdateOpen: 'base/api/batch/update/open',
    batchUpdateStatus: 'base/api/batch/update/status',
    batchUpdateAuth: 'base/api/batch/update/auth'
  },
  menu: {
    add: 'base/menu/add',
    update: 'base/menu/update',
    remove: 'base/menu/remove',
    all: 'base/menu/all',
    getMenu: function (menuId) {
      return `base/menu/${menuId}/info`
    }
  },
  action: {
    add: 'base/action/add',
    update: 'base/action/update',
    remove: 'base/action/remove',
    all: 'base/action/all',
    getActionsByMenu: 'base/menu/action'
  },
  authority: {
    user: 'base/authority/user',
    role: 'base/authority/role',
    app: 'base/authority/app',
    menu: 'base/authority/menu',
    api: 'base/authority/api',
    action: 'base/authority/action',
    userGrant: 'base/authority/user/grant',
    roleGrant: 'base/authority/role/grant',
    appGrant: 'base/authority/app/grant',
    actionGrant: 'base/authority/action/grant'
  },
  login: {
    login: 'admin/login/token',
    logout: 'admin/logout/token',
    getUserInfo: 'admin/current/user',
    getUserMenu: 'base/current/user/menu',
    mobileLogin: 'admin/mobileLogin/token',
    getSmsCaptcha: '/sms/captcha'
  },
  gateway: {
    refresh: 'actuator/open/refresh',
    getAccessLogs: 'base/gateway/access/logs',
    getServiceList: 'base/gateway/service/list'
  },
  routes: {
    page: 'base/gateway/route',
    add: 'base/gateway/route/add',
    update: 'base/gateway/route/update',
    remove: 'base/gateway/route/remove'
  },
  rateLimit: {
    page: 'base/gateway/limit/rate',
    add: 'base/gateway/limit/rate/add',
    update: 'base/gateway/limit/rate/update',
    remove: 'base/gateway/limit/rate/remove',
    getRateLimitApis: 'base/gateway/limit/rate/api/list',
    addRateLimitApis: 'base/gateway/limit/rate/api/add'
  },
  ipLimit: {
    page: 'base/gateway/limit/ip',
    add: 'base/gateway/limit/ip/add',
    update: 'base/gateway/limit/ip/update',
    remove: 'base/gateway/limit/ip/remove',
    getIpLimitApis: 'base/gateway/limit/ip/api/list',
    addIpLimitApis: 'base/gateway/limit/ip/api/add'
  },
  jobs: {
    page: 'task/job',
    add: 'task/job/add/http',
    update: 'task/job/update/http',
    remove: 'task/job/delete',
    pause: 'task/job/pause',
    resume: 'task/job/resume',
    getLogs: 'task/job/logs'
  },
  msg: {
    getLogs: 'msg/webhook/logs'
  },
  generate: {
    tables: 'code/generate/tables',
    execute: 'code/generate/execute',
    download: function () {
      return `${process.env.VUE_APP_API_BASE_URL}/code/generate/download`
    }
  }
}
export default apis
