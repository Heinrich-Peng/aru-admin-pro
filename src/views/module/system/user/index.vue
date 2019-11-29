<template>
  <search-table
    ref="tableSearch"
    title="用户管理"
    :searchColums="searchColums"
    :actionShow="$auth('systemUserEdit')"
    :actionColumns="actionColumns"
    :tableRowKey="tableRowKey"
    :tableColumns="tableColumns"
    :pageFunc="pageFunc"
    :saveFunc="saveFunc"
    :deleteFunc="null"
    @on-search="() => {}"
    @on-reset="() => {}"
  >
    <user-modal
      ref="modalForm"
      @on-close="() => {}"
    ></user-modal>
  </search-table>
</template>

<script>
import SearchTable from '@/custom/components/search-table'
import UserModal from './modal.vue'
import { SDropdown } from '@/custom/components/base'

/* eslint-disable */
export default {
  name: 'SystemUser',
  components: {
    SearchTable,
    UserModal,
    SDropdown
  },
  data () {
    return {
      tableRowKey: "userId",
      searchColums: [
        { title: '登录名', dataIndex: 'userName', type: 'text' },
        { title: '手机号', dataIndex: 'mobile', type: 'num' },
        { title: '邮箱', dataIndex: 'email', type: 'text' }
      ],
      tableColumns: [
        { title: '序号', dataIndex: 'serial',
          customRender: (text, record, index) => {
            return index + 1
          }
        },
        { title: '登录名', dataIndex: 'userName' },
        { title: '昵称', dataIndex: 'nickName' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '手机号', dataIndex: 'mobile' },
        { title: '状态', dataIndex: 'status',
          customRender: (text, record, index) => {
            const statusMap = {
              '0': { color: 'red', text: '禁用' },
              '1': { color: 'green', text: '正常' },
              '2': { color: 'orange', text: '锁定' }
            }
            const status = text === '' ? statusMap['0'] : statusMap[text]
            return <a-tag color={status.color}>{status.text}</a-tag>
          }
        },
        { title: '描述', dataIndex: 'userDesc' },
        { title: '注册时间', dataIndex: 'createTime' },
        { title: '操作', dataIndex: 'action', width: 180,
          customRender: (text, record, index) => {
            return <div v-show={this.$auth('systemUserEdit')}>
              <a-button
                style="margin-right: 5px;"
                type="primary"
                size="small"
                onClick={(param) => this.saveFunc({ param, text, record, index })}
              >编辑</a-button>
              <s-dropdown
                size="small"
                actionColumns={[
                  { title: '用户设置', dataIndex: 'userInfo', icon: 'user',
                    func: (param) => { this.handleAction(Object.assign({}, param, { text, record, index })) } },
                  { title: '发送到密保邮箱', dataIndex: 'sendEmail', icon: 'select',
                    func: (param) => { this.handleAction(null) } },
                  { title: '修改密码', dataIndex: 'updatePasswd', icon: 'tool',
                    func: (param) => { this.handleAction(Object.assign({}, param, { text, record, index })) } },
                ]}
              ></s-dropdown>
            </div>
          }
        }
      ],
      actionColumns: [
        { title: '批量', dataIndex: 'batch', icon: 'star',
          func: (param) => { this.handleAction(param) }
        },
      ]
    }
  },
  created () {
  },
  methods: {
    /**
     * 表格分页处理函数
     */
    pageFunc (param) {
      const _param = {}
      Object.keys(param).forEach(key => {
        if (key === 'pageNo') {
          _param['page'] = param['pageNo']
        } else if (key === 'pageSize') {
          _param['limit'] = param['pageSize']
        } else {
          _param[key] = param[key]
        }
      })
      return this.$http.get(this.$apis.user.page, _param).then(res => {
        const result = {}
        result.data = res.data.records
        result.pageSize = parseInt(res.data.limit)
        result.pageNo = parseInt(res.data.current)
        result.totalPage = parseInt(res.data.pages)
        result.totalCount = parseInt(res.data.total)
        return result
      })
    },
    saveFunc (_param) {
      if (_param === undefined) {
        // 添加按钮
        this.$refs['modalForm'].handleShow(null, '新增用户', ['userInfo'])
      } else {
        // 编辑按钮
        const { param, text, record, index } = _param
        this.$refs['modalForm'].handleShow(record, '编辑用户 - ' + record.userName, ['userInfo', 'userRole', 'userAuth', 'updatePasswd'])
      }
    },
    handleAction (_param) {
      if (_param === null) {
        this.$notification.warning({ message: 'emmm....', description: '啥也没干...' })
      } else if (_param.key !== undefined && _param.object !== undefined) {
        // 批量操作
        const { actionParam, key, object } = _param
        this.$refs['modalForm'].handleShow(key, actionParam.title, [])
      } else {
        // 表格操作
        const { actionParam, text, record, index } = _param
        this.$refs['modalForm'].handleShow(record, actionParam.title, [actionParam.dataIndex])
      }
    }
  },
  mounted: function () {
  }
}
</script>
