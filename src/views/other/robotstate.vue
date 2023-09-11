<!--<template>-->
<!--  <div>-->
<!--    pageTwo页面-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->

<!--}-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
<template>
  <div class="manage">
    <!--    <el-dialog>是Element UI 提供的对话框组件-->
    <el-dialog
        :title="operateType === 'add' ? '新增' : '更新'"
        :visible.sync = 'isShow'
    >
      <common-from
          :formLabel="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
      >
      </common-from>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addRoboState">+ 新增</el-button>
      <common-from
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-from>
    </div>

    <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editRoboState"
        @del="delRoboState"
    ></common-table>
  </div>
</template>

<script>
import CommonFrom from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import {getRobotState} from "@/api/data";
export default {
  name: 'robotstate',
  components: { CommonFrom, CommonTable },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      robotInfo: {
        id: '',
        location: '',
        coordinate: ''
      },
      operateFormLabel: [
        {
          model: 'location',
          label: '位置',
          type: 'input'
        },
        {
          model: 'coordinate',
          label: '坐标',
          type: 'input'
        },
      ],
      operateForm: {
        location: '',
        coordinate: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: 'location',
          label: '位置',
        },
        {
          prop: 'coordinate:',
          label: '坐标',
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      }
    }
  },
  methods: {
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('http://localhost:5000/update-state-info', this.operateForm).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      } else {
        console.log("表单数据"+this.operateForm)
        this.$http.post('http://localhost:5000/save-state-info', this.operateForm, {
          withCredentials: true,
        }).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    // 添加
    addRoboState() {
      this.isShow = true
      this.operateType = 'add',
          this. operateForm = {
            location: '',
            coordinate: ''
          }
    },
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      getRobotState({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        this.tableData = res.location
        console.log(this.tableData)
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editRoboState(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delRoboState(row) {
      this.$confirm("此操作将永久删除该文件，是否继续", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( () => {
        const id = row.id
        this.$http.post('/user/del', {
          params: { id }
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>