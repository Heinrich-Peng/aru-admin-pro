<template>
  <search-table
    ref="tableSearch"
    title="用户管理"
    :searchColums="searchColums"
    tableRowKey="userId"
    :tableColumns="tableColumns"
    :showAction="$auth('systemUserEdit')"
    :pageFunc="pageFunc"
    :saveFunc="null"
    :updateFunc="null"
    :deleteFunc="deleteFunc"
    @on-search=""
    @on-reset=""
    @on-save=""
    @on-delete=""
  >
    <user-modal
      ref="userModal"
    >
    </user-modal>
  </search-table>
</template>

<script>
import SearchTable from '@/custom/components/search-table'
import UserModal from './modal'

/* eslint-disable */
export default {
  name: 'SystemUser',
  components: {
    SearchTable,
    UserModal
  },
  data () {
    return {
      searchColums: [
        { title: '登录名', dataIndex: 'userName', type: 'text' },
        { title: '手机号', dataIndex: 'mobile', type: 'num' },
        { title: '邮箱', dataIndex: 'email', type: 'text' },
        { title: '测试', dataIndex: 'test', type: 'render',
          render: <a-select placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
        },
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
              <a-button style="margin-right: 5px;" type="primary" size="small" onClick={this.handleAction}>编辑</a-button>
              <a-dropdown>
                <a-menu slot="overlay" onClick={this.handleAction}>
                  <a-menu-item key="1"><a-icon type="user"/>用户设置</a-menu-item>
                  <a-menu-item key="2"><a-icon type="select"/>发送到密保邮箱</a-menu-item>
                  <a-menu-item key="3"><a-icon type="tool"/>修改密码</a-menu-item>
                  <a-menu-item key="4"><a-icon type="close"/>删除</a-menu-item>
                </a-menu>
                <a-button size="small">更多<a-icon type="down"/></a-button>
              </a-dropdown>
            </div>
          }
        }
      ]
    }
  },
  created () {
  },
  methods: {
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
    saveFunc (param) {
      return this.$http.post(this.$apis.user.add, {

      }).then(res => {

      })
    },
    updateFunc (param) {
      return this.$http.post(this.$apis.user.update, {

      }).then(res => {

      })
    },
    deleteFunc (param) {
      return this.$http.get(this.$apis.user.page, param)
    },
    handleAction (param) {
      this.$refs['userModal'].handleShow(param)
      console.log(this.$refs['tableSearch'].selectedRows)
      console.log(this.$refs['tableSearch'].selectedRowKeys)
    }
  },
  mounted: function () {
  }
}
</script>
