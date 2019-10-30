const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  authorities: state => state.user.authorities,
  menus: state => state.user.menus,
  userInfo: state => state.user.info,
  addRouters: state => state.menu.addRouters,
  multiTab: state => state.app.multiTab
}

export default getters
