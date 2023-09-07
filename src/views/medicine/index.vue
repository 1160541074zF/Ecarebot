<template>
  <div class="manage">
    <!--    <el-dialog>是Element UI 提供的对话框组件-->
    <el-dialog
        :title="operateType === 'add' ? '新增用药信息' : '更新用药信息'"
        :visible.sync = 'isShow'
    >
      <common-from
          :formLabel="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
      >M
      </common-from>

      <div slot="footer" class="dialog-footer">
<!--        <el-button @click="refresh">刷新</el-button>-->
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addMed">+ 新增</el-button>
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
        @edit="editMed"
        @del="delMed"
    ></common-table>
  </div>
</template>

<script>
import CommonFrom from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import Vue from 'vue'
import {getMed} from '@/api/data.js';
import axios from "axios";
Vue.prototype.$axios = axios
export default {
  name: 'medicine',
  components: { CommonFrom, CommonTable },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      medInfo: {
        id: '',
        name: '',
        medname: '',
        num: '',
        spec: '',
        usage: '',
        dosage: '',
        freq: '',
        time: ''
      },
      operateFormLabel: [
        {
          model: 'id',
          label: '用户id',
          type: 'input'
        },
        {
          model: 'name',
          label: '用户名',
          type: 'input'
        },
        {
          model: 'medname',
          label: '药品名',
          type: 'input'
        },
        {
          model: 'num',
          label: '药盒号',
          type: 'input',
        },
        {
          model: 'spec',
          label: '规格',
          type: 'input',
        },
        {
          model: 'usage',
          label: '用法',
          type: 'input',
        },
        {
          model: 'dosage',
          label: '用量',
          type: 'input',
        },
        {
          model: 'freq',
          label: '频率',
          type: 'input',
        },
        {
          model: 'time',
          label: '用药时间',
          type: 'input',
        }
      ],
      operateForm: {
        id : '',
        name: '',
        medname: '',
        num: '',
        spec: '',
        usage: '',
        dosage: '',
        freq: '',
        time: ''
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
          label: '用户id',
          width: '100px'
        },
        {
          prop: 'name',
          label: '用户名',
        },
        {
          prop: 'medname',
          label: '药品名',
        },
        {
          prop: 'num',
          label: '药盒号',
        },
        {
          prop: 'spec',
          label: '规格',
        },
        {
          prop: 'usage',
          label: '用法',
        },
        {
          prop: 'dosage',
          label: '用量',
        },
        {
          prop: 'freq',
          label: '频率',
        },
        {
          prop: 'time',
          label: '用药时间',
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
        this.$http.post('http://localhost:5000/update-med-info', this.operateForm).then(res => {
          console.log("提交的数据"+res);
          this.isShow = false;
          this.getList();
        });
      } else {
        console.log("表单数据"+this.operateForm)
        this.$http.post('http://localhost:5000/save-med-info', this.operateForm, {
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
    // 添加
    addMed() {
      this.isShow = true
      this.operateType = 'add',
          this. operateForm = {
            name: '',
            medname: '',
            num: '',
            spec: '',
            usage: '',
            dosage: '',
            freq: '',
            time: ''
          }
    },
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      getMed({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        this.tableData = res.med_info; // 将后端返回的数据存储到tableData中
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    editMed(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delMed(row) {
      this.$confirm("此操作将永久删除该文件，是否继续", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( () => {
        let id = row.id;
        console.log(row.id)
        console.log(id)
        this.$http.delete(`http://localhost:5000/delete-med-info/${id}`)
            .then(res => {
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