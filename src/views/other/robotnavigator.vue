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
      <el-button type="primary" @click="addLocation">+ 新增</el-button>
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
        @edit="editLocation"
        @del="delLocation"
    ></common-table>
  </div>
</template>


<script>
import CommonFrom from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import {getLocation} from "@/api/data";
export default {
  name: 'robotnavigator',
  components: { CommonFrom, CommonTable },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      navigator: {
        id: '',
        location1: '',
        location2: '',
        location3: '',
      },
      operateFormLabel: [
        {
          model: 'id',
          label: 'id',
          type: 'input'
        },
        {
          model: 'location1',
          label: '位置1',
          type: 'select',
          opts: [
            {
              value: 0,
              label: '厨房'
            },
            {
              value: 1,
              label: '卧室'
            },
            {
              value: 2,
              label: '客厅'
            }
          ]
        },
        {
          model: 'location2',
          label: '位置2',
          type: 'select',
          opts: [
            {
              value: 0,
              label: '厨房'
            },
            {
              value: 1,
              label: '卧室'
            },
            {
              value: 2,
              label: '客厅'
            }
          ]
        },
        {
          model: 'location3',
          label: '位置3',
          type: 'select',
          opts: [
            {
              value: 0,
              label: '厨房'
            },
            {
              value: 1,
              label: '卧室'
            },
            {
              value: 2,
              label: '客厅'
            }
          ]
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
          prop: 'id',
          label: 'id',
        },
        {
          prop: 'location1',
          label: '位置1',
        },
        {
          prop: 'location2',
          label: '位置2',
        },
        {
          prop: 'location3',
          label: '位置3',
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
        this.$http.post('http://localhost:5000/update-location-info', this.operateForm).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      } else {
        console.log("表单数据"+this.operateForm)
        this.$http.post('http://localhost:5000/save-location-info', this.operateForm, {
          withCredentials: true,
        }).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    // 添加
    addLocation() {
      this.isShow = true
      this.operateType = 'add',
          this. operateForm = {
            id: '',
            location1: '',
            location2: '',
            location3: ''
          }
    },
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      getLocation({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        this.tableData = res.location_data;
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editLocation(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delLocation(row) {
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