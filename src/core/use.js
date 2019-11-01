import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext library
import VueClipboard from 'vue-clipboard2'
import MultiTab from '@/components/MultiTab'
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/utils/helper/permission'
// import '@/components/use'
import './directives/action'

// TODO --------------------------------
import VXETable from 'vxe-table'
import TreeSelect from '@riophae/vue-treeselect'
import VueBus from '@/utils/vue-bus'
import { STable } from '@/components'
import Install from './libs/install'
import 'vxe-table/lib/index.css'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import '@/components/index.less'
Vue.config.productionTip = false

VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(Viser)
Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)

// TODO --------------------------------
Vue.use(VXETable)
Vue.component('treeselect', TreeSelect)
// 事件总线
Vue.use(VueBus)
// 注册自定义组件
Vue.use(STable)
// 全局注册应用配置
Vue.use(Install)
