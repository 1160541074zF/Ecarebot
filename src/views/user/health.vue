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
      <el-button type="primary" @click="addMonitor">+ 新增</el-button>
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
        @edit="editMonitor"
        @del="delMonitor"
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
      healthState: {
        // location: '',
        // coordinate: '',
        id: '',
        name: '',
        state: '',
        meanHR: '',
        rmssd: '',
        ANS: '',
        stressIndex: '',
        HRs: '',
        arrhythmiaNum: '',
        prob_AF: '',
        prob_PXC: '',
        prob_N_shape: '',
        prob_other: ''
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
          model: 'data',
          label: '日期',
          type: 'input'
        },
        {
          model: 'state',
          label: '状态',
          type: 'input'
        },
        {
          model: 'meanHR',
          label: '平均心率',
          type: 'input'
        },
        {
          model: 'rmssd',
          label: '心率变异性',
          type: 'input'
        },
        {
          model: 'ANS',
          label: '交感与副交感神经兴奋度',
          type: 'input'
        },
        {
          model: 'stressIndex',
          label: '心脏压力指数',
          type: 'input'
        },
        {
          model: 'arrhymiaNum',
          label: '节律异常片段个数',
          type: 'input'
        },
        {
          model: 'prob_AF',
          label: '房颤风险',
          type: 'input'
        },
        {
          model: 'prob_PXC',
          label: '房早室早风险',
          type: 'input'
        },
        {
          model: 'prob_N_shape',
          label: '传导问题风险',
          type: 'input'
        },
      ],
      operateForm: {
        id: '',
        name: '',
        data: '',
        state: '',
        meanHR: '',
        rmssd: '',
        ANS: '',
        stressIndex: '',
        HRs: '',
        arrhythmiaNum: '',
        prob_AF: '',
        prob_PXC: '',
        prob_N_shape: '',
        prob_other: ''
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
        {
          id: 1,
          name: '张三',
          date: '2023/9/11',
          state: '1',
          meanHR: '56',
          rmssd: '0',
          ANS: '0',
          stressIndex: '0',
          HRs: '0',
          arrhythmiaNum: '0',
          prob_AF: '0',
          prob_PXC: '0',
          prob_N_shape: '0',
          prob_other: '0'
        },
        {
          id: 2,
          name: '张三',
          date: '2023/9/12',
          state: '1',
          meanHR: '62',
          rmssd: '0',
          ANS: '1',
          stressIndex: '1',
          HRs: '0',
          arrhythmiaNum: '0',
          prob_AF: '0',
          prob_PXC: '0',
          prob_N_shape: '0',
          prob_other: '0'
        },
        {
          id: 3,
          name: '张三',
          date: '2023/9/13',
          state: '1',
          meanHR: '60',
          rmssd: '0',
          ANS: '0',
          stressIndex: '0',
          HRs: '0',
          arrhythmiaNum: '0',
          prob_AF: '0',
          prob_PXC: '0',
          prob_N_shape: '0',
          prob_other: '0'
        },
        {
          id: 4,
          name: '张三',
          date: '2023/9/13',
          state: '1',
          meanHR: '65',
          rmssd: '0',
          ANS: '1',
          stressIndex: '0',
          HRs: '0',
          arrhythmiaNum: '0',
          prob_AF: '0',
          prob_PXC: '0',
          prob_N_shape: '0',
          prob_other: '0'
        }
      ],
      tableLabel: [
        {
          prop: 'id',
          label: '用户id',
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'date',
          label: '日期',
        },
        {
          prop: 'state',
          label: '状态',
        },
        {
          prop: 'meanHR',
          label: '平均心率',
        },
        {
          prop: 'rmssd',
          label: '心率变异性',
        },
        {
          prop: 'ANS',
          label: '交感与副交感神经兴奋度',
        },
        {
          prop: 'stressIndex',
          label: '心脏压力指数',
        },
        {
          prop: 'HRs',
          label: '心率',
        },
        {
          prop: 'arrhythmiaNum',
          label: '节律异常片段个数',
        },
        {
          prop: 'prob_AF',
          label: '房颤风险',
        },
        {
          prop: 'prob_PXC',
          label: '房早室早风险',
        },
        {
          prop: 'prob_N_shape',
          label: '传导问题风险',
        },
        {
          prop: 'prob_other',
          label: '其他问题风险',
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
        selectedRowIndex: -1, // 初始化为-1，表示没有选中任何行
      }

    }
  },
  methods: {
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('http://localhost:5000/update-monitor-info', this.operateForm).then(res => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        console.log("表单数据"+this.operateForm)
        this.$http.post('http://localhost:5000/save-monitor-info', this.operateForm, {
          withCredentials: true,
        }).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    handleTableRowClick(row, rowIndex) {
      // 将选中行的行数分配给selectedRowIndex变量
      this.selectedRowIndex = rowIndex;
      console.log(this.selectedRowIndex)
    },
    // confirm() {
    //   if (this.operateType === 'edit') {
    //     console.log(this.operateForm.id)
    //     this.tableData.id = this.operateForm.id;
    //     console.log(this.operateForm.name)
    //     this.tableData.name = this.operateForm.name;
    //   }
    // },
    refresh(){

    },
    // addMonitor() {
    //   this.isShow = true
    //   this.operateType = 'add',
    //       this. operateForm = {
    //         name: '',
    //         // addr: '',
    //         age: '',
    //         birth: '',
    //         sex: '',
    //         type: '',
    //       }
    // },
    addMonitor() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        id: '',
        name: '',
        data: '',
        state: '',
        meanHR: '',
        rmssd: '',
        ANS: '',
        stressIndex: '',
        HRs: '',
        arrhythmiaNum: '',
        prob_AF: '',
        prob_PXC: '',
        prob_N_shape: '',
        prob_other: ''
      }
    },
    getList(name = '', date = '') {
      // this.config.loading = true
      // name ? (this.config.page = 1) : ''
      // getState({
      //   page: this.config.page,
      //   name,
      //   date
      // }).then(({data: res}) => {
      //   console.log(res)
      //   this.tableData = res.user_state
      //   // this.tableData = res.list.map(item => {
      //   //   item.sexLabel = item.sex === 0 ? '女' : '男'
      //   //   return item
      //   // })
      //   console.log("表格数据"+this.tableData)
      //   this.config.total = res.count
      //   this.config.loading = false
      // })
    },
    editMonitor(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delMonitor(row) {
      this.$confirm("此操作将永久删除该文件，是否继续", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( () => {
        const id = row.id
        print(row.id)
        this.$http.post('http://localhost:5000/delete-monitor', {
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