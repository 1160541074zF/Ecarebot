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
      <el-button type="primary" @click="synchronisation"> 同步</el-button>
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
import {getPosition} from "@/api/data";
export default {
  name: 'robotstate',
  components: { CommonFrom, CommonTable },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      // fieldMapping: {
      //   1: '厨房',
      //   2: '卧室',
      //   3: '客厅',
      // },
      robotInfo: {
        id: '',
        position_x: '',
        position_y: '',
        orientation_z: '',
        orientation_w: '',
        positon:''
        // location1: '',
        // location2: '',
        // location3: '',
      },
      operateFormLabel: [
        {
          model: 'position_x',
          label: 'position x',
          type: 'input'
        },
        {
          model: 'position_y',
          label: 'position y',
          type: 'input'
        },
        {
          model: 'orientation_z',
          label: 'orientation z',
          type: 'input'
        },
        {
          model: 'orientation_w',
          label: 'orientation w',
          type: 'input'
        },
        {
          model: 'position',
          label: '位置',
          type: 'input'
        },
        // {
        //   model: 'location1',
        //   label: '位置1',
        //   type: 'select',
        //   opts: [
        //     {
        //       value: 0,
        //       label: '厨房'
        //     },
        //     {
        //       value: 1,
        //       label: '卧室'
        //     },
        //     {
        //       value: 2,
        //       label: '客厅'
        //     }
        //   ]
        // },
        // {
        //   model: 'location2',
        //   label: '位置2',
        //   type: 'select',
        //   opts: [
        //     {
        //       value: 0,
        //       label: '厨房'
        //     },
        //     {
        //       value: 1,
        //       label: '卧室'
        //     },
        //     {
        //       value: 2,
        //       label: '客厅'
        //     }
        //   ]
        // },
        // {
        //   model: 'location3',
        //   label: '位置3',
        //   type: 'select',
        //   opts: [
        //     {
        //       value: 0,
        //       label: '厨房'
        //     },
        //     {
        //       value: 1,
        //       label: '卧室'
        //     },
        //     {
        //       value: 2,
        //       label: '客厅'
        //     }
        //   ]
        // },
      ],
      operateForm: {
        position_x: '',
        position_y: '',
        orientation_z: '',
        orientation_w: '',
        position:''
        // location1: '',
        // location2: '',
        // location3: '',
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
      tableData: [
        // {
        //   location: '卧室',
        //   coordinate: 'x: 0.531435847282 , y: 1.22645330429, z: 0.0,x: 0.0,y: 0.0,z: -0.0285912500452,w: 0.999591186646'
        // }
        // {
        //   x: "1", y: '1', z : '1', w : '1'
        // }
      ],
      tableLabel: [
        {
          prop: 'id',
          label: 'id',
        },
        {
          prop: 'x',
          label: 'positon_x',
        },
        {
          prop: 'y',
          label: 'position_y',
        },
        {
          prop: 'z',
          label: 'orientation_z',
        },
        {
          prop: 'w',
          label: 'orientation_w',
        },
        {
          prop: 'position',
          label: '位置',
        },
        // {
        //   prop: 'location1',
        //   label: '位置1',
        // },
        // {
        //   prop: 'location2',
        //   label: '位置2',
        // },
        // {
        //   prop: 'location3',
        //   label: '位置3',
        // },
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
        this.$http.post('http://localhost:5000/update-position-info', this.operateForm).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      } else {
        console.log("表单数据"+this.operateForm)
        this.$http.post('http://localhost:5000/save-position-info', this.operateForm, {
          withCredentials: true,
        }).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    // 同步
    synchronisation() {

    },
    // 添加
    addRoboState() {
      this.isShow = true
      this.operateType = 'add'
      fetch('http://localhost:5000/get-position-info')
          .then(response => response.json())
          .then(data => {
            this.operateForm = {
              position_x: data.x,
              position_y: data.y,
              orientation_z: data.z,
              orientation_w: data.w,
            };
            console.log(data.x)
            console.log(data.y)
            console.log(data.z)
            console.log(data.w)
          })
          .catch(error => {
            console.error('Error:', error);
          });
    },
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      getPosition({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        this.tableData = res.received_json
        console.log(this.tableData);
        // this.config.total = res.location_info.length;
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
        this.$http.post('http://localhost:5000/delete-position-info/${id}', {
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