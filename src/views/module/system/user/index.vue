<template>
  <div class="content">
    <a-card type="inner" :bordered="false" :title="title">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="登录名" prop="userName">
                <a-input type="text" :value="pageParams.userName" placeholder="请输入登录名"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="手机号" prop="mobile">
                <a-input type="text" :value="pageParams.mobile" placeholder="请输入手机号"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="邮箱" prop="email">
                <a-input type="text" :value="pageParams.email" placeholder="请输入邮箱"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="handleSearch()">查询</a-button>&nbsp;
                <a-button @click="handleResetForm('searchForm')">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" @click="handleSave">添加</a-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleDelete">
            <a-menu-item key="1"><a-icon type="close"/>删除</a-menu-item>
          </a-menu>
          <a-button>批量操作<a-icon type="down"/></a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="userId"
        showPagination="auto"
        :columns="tableColumns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'

const statusMap = {
  '0': { color: 'red', text: '禁用' },
  '1': { color: 'green', text: '正常' },
  '2': { color: 'orange', text: '锁定' }
}

export default {
  name: 'SystemUser',
  components: {
    STable
  },
  /* eslint-disable */
  data () {
    return {
      title: '用户管理',
      pageParams: {},
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
            const status = text === '' ? statusMap['0'] : statusMap[text]
            return <a-tag color={status.color}>{status.text}</a-tag>
          }
        },
        { title: '描述', dataIndex: 'userDesc' },
        { title: '注册时间', dataIndex: 'createTime' },
        { title: '操作', dataIndex: 'action', width: 180,
          customRender: (text, record, index) => {
            return <div>
                    <a-button style="margin-right: 5px;" type="primary" size="small">编辑</a-button>
                    <a-dropdown>
                      <a-menu slot="overlay" onClick={this.handleAction}>
                        <a-menu-item key="1"><a-icon type="user"/>用户设置</a-menu-item>
                        <a-menu-item key="2"><a-icon type="select"/>发送到密保邮箱</a-menu-item>
                        <a-menu-item key="3"><a-icon type="tool"/>修改密码</a-menu-item>
                      </a-menu>
                      <a-button size="small">更多<a-icon type="down"/></a-button>
                    </a-dropdown>
                  </div>
          }
        }
      ],

      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectedRowKeys = selectedRowKeys
            this.selectedRows = selectedRows
          }
        }
        // alert: false,
        // rowSelection: null
      }
    }
  },
  created () {

  },
  methods: {
    loadData (parameter) {
      return this.$http.get(this.$apis.user.page, {
        params: {}
      }).then(res => {
        const result = {}
        result.data = res.data.records
        result.pageSize = parseInt(res.data.limit)
        result.pageNo = parseInt(res.data.current)
        result.totalPage = parseInt(res.data.pages)
        result.totalCount = parseInt(res.data.total)
        return result
      })
    },
    handleSearch () {

    },
    handleResetForm () {

    },
    handleSave () {

    },
    handleDelete (){

    },
    handleAction (e) {
      console.log(e)
    }
  },
  mounted: function () {
  }
}
</script>
