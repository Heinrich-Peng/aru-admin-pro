// import { defaultRouterMap, constantRouterMap } from '@/router/routers'
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { startWith, hasChild } from '@/utils/util'
import { BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import XEUtils from 'xe-utils'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

/**
 * 格式化路由菜单
 * @param array
 * @returns {Array}
 */
function filterAsyncRouter (array, authorities) {
  const opt = {
    key: 'menuId',
    parentKey: 'parentId',
    children: 'children'
  }
  const menus = XEUtils.toArrayTree(array, opt)
  const routers = filterRouter(menus, authorities, [])
  return routers
}

function filterRouter (array, authorities, routers) {
  const list = array.map(item => {
    const path = startWith(item.path, '/') ? item.path.substring(1) : item.path
    const url = item.scheme + (path || item.menuCode)
    const has = hasChild(item)
    const router = {
      // 使用菜单id不使用menuCode防止修改后,刷新后缓存的页面无法找到
      name: `${item.menuCode}`,
      path: url,
      hidden: false,
      redirect: '',
      meta: {
        level: item.level,
        authorities: authorities,
        title: item.menuName,
        icon: item.icon || (has ? 'folder' : 'file')
      }
    }
    // 非根节点
    if (item.scheme === '/') {
      // 内部组件
      router.component = (resolve) => {
        if (path) {
          require([`@/views/module/${path}.vue`], resolve)
        } else {
          require([`@/views/exception/404.vue`], resolve)
        }
      }
    } else {
      // 外部链接
      router.meta.target = item.target
    }

    if (has) {
      router.component = constantRouterComponents['RouteView']
      router.redirect = item.children[0].menuCode
      router.children = filterRouter(item.children, authorities, [])
    }
    return router
  }
  )
  routers.push(...list)
  return routers
}

const menu = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise((resolve, reject) => {
        const accessedRouters = filterAsyncRouter(data.menus, data.authorities)
        // 插入仪表盘后面
        asyncRouterMap[0].children.splice(0, 0, ...accessedRouters)
        asyncRouterMap.push(notFoundRouter)
        commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    }
  }
}

export default menu
