<!--<template>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "state.vue"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
  <div class="manage">
    <!--    <el-dialog>是Element UI 提供的对话框组件-->
    <!--    新增/更新用户-->
    <el-dialog
        :title="operateType === 'add' ? '新增用户' : '更新用户'"
        :visible.sync = 'isShow'
    >
      <!--      表单组件-->
      <common-from
          :formLabel="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
      >

      </common-from>

      <div slot="footer" class="dialog-footer">
        <el-button @click="refresh">刷新</el-button>
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <!--      <el-button type="primary" @click="addUser">+ 新增</el-button>-->
      <common-from
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
        <el-button type="primary" @click="getList(searchForm.date)">搜索</el-button>
        <!-- 添加日期选择器 -->
        <el-date-picker v-model="searchForm.date" type="date" placeholder="选择日期"></el-date-picker>
      </common-from>
    </div>

    <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editState"
        @del="delState"
    ></common-table>
  </div>
</template>

<script>
import CommonFrom from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import {getState} from '@/api/data.js'
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
export default {
  name: 'user',
  components: { CommonFrom, CommonTable },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      userState: {
        // location: '',
        // coordinate: '',
        // id: '',
        // name: '',
        // sit_time: '',
        // state: '',
        // meanHR: '',
        // rmssd: '',
        // ANS: '',
        // stressIndex: '',
        // HRs: '',
        // arrhythmiaNum: '',
        // prob_AF: '',
        // prob_PXC: '',
        // prob_N_shape: '',
        // prob_other: ''
      },
      operateFormLabel: [
        {
          model: 'id',
          label: 'id',
          type: 'input'
        },
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'sit_time',
          label: '久坐时间',
          type: 'input'
        },
        {
          model: 'date',
          label: '日期',
          type: 'input'
        },
        // {
        //   model: 'state',
        //   label: '状态',
        //   type: 'input'
        // },
        // {
        //   model: 'meanHR',
        //   label: '平均心率',
        //   type: 'input'
        // },
        // {
        //   model: 'rmssd',
        //   label: '心率变异性',
        //   type: 'input'
        // },
        // {
        //   model: 'ANS',
        //   label: '交感与副交感神经兴奋度',
        //   type: 'input'
        // },
        // {
        //   model: 'stressIndex',
        //   label: '心脏压力指数',
        //   type: 'input'
        // },
      ],
      operateForm: {
        id: '',
        name: '',
        sit_time: '',
        date:''
        // date: '',
        // state: '',
        // meanHR: '',
        // rmssd: '',
        // ANS: '',
        // stressIndex: '',
        // HRs: '',
        // arrhythmiaNum: '',
        // prob_AF: '',
        // prob_PXC: '',
        // prob_N_shape: '',
        // prob_other: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: '',
        date: ''
      },
      tableData: [
        { id: '1',
          name: '张三',
          sit_time: '2h10min',
          date:'2023-7-24 16:38'
        },
        { id: '2',
          name: '张三',
          sit_time: '1h45min',
          date:'2023-7-26 12:50'
        },
        { id: '3',
          name: '张三',
          sit_time: '1h32min',
          date:'2023-7-26 18:34'
        },
        { id: '4',
          name: '张三',
          sit_time: '1h52min',
          date:'2023-7-27 19:42'
        },
        { id: '5',
          name: '张三',
          sit_time: '2h05min',
          date:'2023-7-29 9:56'
        },
      ],
      tableLabel: [
        {
          prop: 'id',
          label: 'id',
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'sit_time',
          label: '久坐时间',
        },
        {
          prop: 'date',
          label: '日期',
        }
        // {
        //   prop: 'date',
        //   label: '日期',
        // },
        // {
        //   prop: 'state',
        //   label: '状态',
        // },
        // {
        //   prop: 'meanHR',
        //   label: '平均心率',
        // },
        // {
        //   prop: 'rmssd',
        //   label: '心率变异性',
        // },
        // {
        //   prop: 'ANS',
        //   label: '交感与副交感神经兴奋度',
        // },
        // {
        //   prop: 'stressIndex',
        //   label: '心脏压力指数',
        // },
        // {
        //   prop: 'HRs',
        //   label: '心率',
        // },
        // {
        //   prop: 'arrhythmiaNum',
        //   label: '节律异常片段个数',
        // },
        // {
        //   prop: 'prob_AF',
        //   label: '房颤风险',
        // },
        // {
        //   prop: 'prob_PXC',
        //   label: '房早室早风险',
        // },
        // {
        //   prop: 'prob_N_shape',
        //   label: '传导问题风险',
        // },
        // {
        //   prop: 'prob_other',
        //   label: '其他问题风险',
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
        this.$http.post('http://localhost:5000/update-state-info', this.operateForm).then(res => {
          console.log(res);
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
    refresh(){

    },
    addState() {
      this.isShow = true
      this.operateType = 'add',
          this. operateForm = {
            name: '',
            // addr: '',
            sit_time:''
          }
    },
    getList(name = '', date = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getState({
        page: this.config.page,
        name: this.tableData.name,
        date: date
      }).then(({data: res}) => {
        console.log(res)
        this.tableData = res.user_state
        console.log("表格数据"+this.tableData)
        this.config.total = res.count
        this.config.loading = false
      })
    },
    editState(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delState(row) {
      this.$confirm("此操作将永久删除该文件，是否继续", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = row.id;
        console.log(row.id)
        console.log(id)
        this.$http.delete(`http://localhost:5000/delete-state-info/${id}`)
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getList();
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
      });
    }
  },
  created() {
    this.getList()
  },


}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>