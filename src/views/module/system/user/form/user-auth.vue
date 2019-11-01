<!--<template>-->
<!--  &lt;!&ndash;分配权限&ndash;&gt;-->
<!--  <div>-->
<!--    <Alert type="info" show-icon>支持单独分配用户额外的功能权限(包含已授权角色的权限)。已经被角色授权过的,将被禁止重复授权</Alert>-->
<!--    <Form ref="form" :model="formItem" :label-width="100">-->
<!--      <FormItem label="过期时间" prop="expireTime">-->
<!--        <Badge v-if="formItem.isExpired" text="授权已过期">-->
<!--          <DatePicker-->
<!--            v-model="formItem.expireTime"-->
<!--            class="ivu-form-item-error"-->
<!--            type="datetime"-->
<!--            placeholder="设置有效期"></DatePicker>-->
<!--        </Badge>-->
<!--        <DatePicker v-else="" v-model="formItem.expireTime" type="datetime" placeholder="设置有效期"></DatePicker>-->
<!--      </FormItem>-->
<!--      <FormItem label="功能权限" prop="grantMenus">-->
<!--        <vxe-table-->
<!--          border-->
<!--          resizable-->
<!--          ref="tree"-->
<!--          row-id="menuId"-->
<!--          :tree-config="{children: 'children',expandAll: true}"-->
<!--          :select-config="{labelField: 'menuName',checkRowKeys: checkRowKeys,checkMethod:checkMethod}"-->
<!--          :data.sync="selectMenus">-->
<!--          <vxe-table-column type="selection" field="menuId" title="菜单" tree-node width="220"></vxe-table-column>-->
<!--          <vxe-table-column field="operation" title="操作">-->
<!--            <template v-slot="{ row }">-->
<!--              <CheckboxGroup v-model="formItem.grantActions">-->
<!--                <Checkbox :disabled="item.disabled" v-for="item in row.actionList" :label="item.authorityId">-->
<!--                  <span :title="item.actionDesc">{{ item.actionName }}</span>-->
<!--                </Checkbox>-->
<!--              </CheckboxGroup>-->
<!--            </template>-->
<!--          </vxe-table-column>-->
<!--        </vxe-table>-->
<!--      </FormItem>-->
<!--    </Form>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import XEUtils from 'xe-utils'-->
<!--export default {-->
<!--  name: 'UserAuth',-->
<!--  props: {},-->
<!--  data () {-->
<!--    return {-->
<!--      selectMenus: [],-->
<!--      pageInfo: {},-->
<!--      checkRowKeys: [],-->
<!--      disableRowKeys: [],-->
<!--      formItem: this.getFormItem()-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    getFormItem () {-->
<!--      return {-->
<!--        userId: '',-->
<!--        grantActions: [],-->
<!--        grantMenus: [],-->
<!--        expireTime: '',-->
<!--        isExpired: false-->
<!--      }-->
<!--    },-->
<!--    setData (data) {-->
<!--      if (data && data.userId) {-->
<!--        this.formItem = Object.assign({}, this.formItem, data)-->
<!--        this.handleLoadUserGranted(data.userId)-->
<!--      }-->
<!--    },-->
<!--    checkMethod ({ row, rowIndex }) {-->
<!--      if (this.disableRowKeys.includes(row.menuId)) {-->
<!--        return false-->
<!--      } else {-->
<!--        return true-->
<!--      }-->
<!--    },-->
<!--    handleReset () {-->
<!--      this.$refs['form'].resetFields()-->
<!--      this.formItem = this.getFormItem()-->
<!--    },-->
<!--    handleSubmit () {-->
<!--      this.$refs['form'].validate((valid) => {-->
<!--        if (valid) {-->
<!--          const authorityIds = this.getCheckedAuthorities()-->
<!--          this.$http.post(this.$apis.authority.userGrant, {-->
<!--            userId: this.formItem.userId,-->
<!--            expireTime: this.formItem.expireTime ? this.formItem.expireTime.pattern('yyyy-MM-dd HH:mm:ss') : '',-->
<!--            authorityIds: authorityIds.join(',')-->
<!--          }).then(res => {-->
<!--            this.$bus.emit('closeModal')-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    getCheckedAuthorities () {-->
<!--      const menuIds = []-->
<!--      this.$refs['tree'].getSelectRecords().map(item => {-->
<!--        menuIds.push(item.authorityId)-->
<!--      })-->
<!--      return menuIds.concat(this.formItem.grantActions)-->
<!--    },-->
<!--    handleLoadUserGranted (userId) {-->
<!--      const that = this-->
<!--      const p1 = this.$http.get(this.$apis.authority.menu, {}, this)-->
<!--      const p2 = this.$http.get(this.$apis.authority.user, {-->
<!--        userId: userId-->
<!--      }, this)-->
<!--      const roleAuthorites = []-->
<!--      Promise.all([p1, p2]).then(function (values) {-->
<!--        const res1 = values[0]-->
<!--        const res2 = values[1]-->
<!--        if (res1.code === 0 && res1.data) {-->
<!--          if (res2.code === 0 && res2.data && res2.data.length > 0) {-->
<!--            const menus = []-->
<!--            const actions = []-->
<!--            res2.data.map(item => {-->
<!--              if (item.owner === 'role') {-->
<!--                roleAuthorites.push(item.authorityId)-->
<!--              }-->
<!--              // 菜单权限-->
<!--              if (item.authority.indexOf('MENU_') !== -1 && !menus.includes(item.authorityId)) {-->
<!--                menus.push(item.authorityId)-->
<!--              }-->
<!--              // 操作权限-->
<!--              if (item.authority.indexOf('ACTION_') !== -1 && !actions.includes(item.authorityId)) {-->
<!--                actions.push(item.authorityId)-->
<!--              }-->
<!--            })-->
<!--            that.formItem.grantMenus = menus-->
<!--            that.formItem.grantActions = actions-->
<!--            // 时间-->
<!--            if (res2.data.length > 0) {-->
<!--              that.formItem.expireTime = res2.data[0].expireTime-->
<!--              that.formItem.isExpired = res2.data[0].isExpired-->
<!--            }-->
<!--          }-->
<!--          res1.data.map(item => {-->
<!--            // 菜单选中-->
<!--            if (that.formItem.grantMenus.includes(item.authorityId)) {-->
<!--              that.checkRowKeys.push(item.menuId)-->
<!--              // 归属角色权限,禁止授权-->
<!--              if (roleAuthorites.includes(item.authorityId)) {-->
<!--                that.disableRowKeys.push(item.menuId)-->
<!--              }-->
<!--            }-->

<!--            // 功能权限-->
<!--            item.actionList.map(action => {-->
<!--              if (roleAuthorites.includes(action.authorityId)) {-->
<!--                action.disabled = true-->
<!--              }-->
<!--            })-->
<!--          })-->
<!--          const opt = {-->
<!--            key: 'menuId',-->
<!--            parentKey: 'parentId',-->
<!--            children: 'children'-->
<!--          }-->
<!--          that.selectMenus = XEUtils.toArrayTree(res1.data, opt)-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  created () {-->

<!--  },-->
<!--  components: {}-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="less" rel="stylesheet/less">-->

<!--</style>-->
