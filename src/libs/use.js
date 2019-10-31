import Vue from 'vue'
import VueStorage from 'vue-ls'
// base library
import VXETable from 'vxe-table'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import TreeSelect from '@riophae/vue-treeselect'
import VueClipboard from 'vue-clipboard2'
import config from '../config/defaultSettings'
import VueBus from '../utils/vue-bus'
import { STable } from '../components'
import Install from './install'
// import directives
import './directives/action'
// import style
// import 'iview/dist/styles/iview.css'
import 'vxe-table/lib/index.css'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import '../components/index.less'

// Vue.use(iView)
Vue.component('treeselect', TreeSelect)
Vue.use(VXETable)
Vue.use(Viser)
Vue.use(VueStorage, config.storageOptions)
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(VueCropper)
Vue.config.productionTip = false
// 注册自定义组件
Vue.use(STable)
// 事件总线
Vue.use(VueBus)
// 全局注册应用配置
Vue.use(Install)
