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
        <img :src="imageUrl" alt="加载图片" style="width: 120px;">
<!--        <img :src="require('@/assets/logo.png')" alt="加载图片" style="width: 100px;">-->
<!--        <img :src=this.operateForm.image alt="加载图片" style="width: 100px;">-->
<!--        <img :src="'http://localhost:5000/Fay-main/gui/static/source/img/picture.jpg'" alt="加载图片" style="width: 100px;">-->
      </common-from>

      <div slot="footer" class="dialog-footer">
        <el-button @click="refreshPicture">刷新图片</el-button>
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
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
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonFrom from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import {getUser} from '@/api/data.js'
import {getPicture} from '@/api/data.js'
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
      userInfo: {
        id: '',
        name: '',
        age: '',
        sex: '',
        birth: '',
        type: ''
      },
      // hostUrl: 'http://localhsot:5000',
      imageUrl: require('@/assets/logo.png'),
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
          model: 'age',
          label: '年龄',
          type: 'input',
        },
        {
          model: 'sexLabel',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'data',
        },
        // {
        //   model: 'addr',
        //   label: '地址',
        //   type: 'input',
        // },
        {
          model: 'typeLabel',
          label: '用户类型',
          type: 'select',
          opts: [
            {
              value: 0,
              label: '老人'
            },
            {
              value: 1,
              label: '家属'
            }
          ]
        },
        {
          model: 'image',
          label: '用户头像',
          type: 'upload',
        }
      ],
      operateForm: {
        id: '',
        name: '',
        // addr: '',
        age: '',
        birth: '',
        sexLabel: '',
        type: '',
        image: require('@/assets/logo.png')
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
        },
        // {
        //   prop: 'image',
        //   label: '用户头像',
        //   // 使用自定义的渲染函数来加载图片
        //   render: (h, params) => {
        //     return h('img', {
        //       attrs: {
        //         src: params.row.image, // 使用数据中的image属性作为图片的URL
        //         alt: 'User Image',
        //         width: '50',
        //         height: '50',
        //       },
        //     });
        //   },
        // },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'age',
          label: '年龄',
        },
        {
          prop: 'sexLabel',
          label: '性别',
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        // {
        //   prop: 'addr',
        //   label: '地址',
        //   width: 320
        // },
        {
          prop: 'typeLabel',
          label: '用户类型',
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
        this.$http.post('http://localhost:5000/update-user-info', this.operateForm).then(res => {
          console.log("表单数据"+this.operateForm.image)
          console.log("imageUrl"+this.imageUrl)
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      } else {
        console.log("表单数据"+this.operateForm.image)
        this.$http.post('http://localhost:5000/save-user-info', this.operateForm, this.imageUrl, {
          withCredentials: true,
        }).then(res => {
          console.log("表单数据"+this.operateForm.image)
          console.log("imageUrl"+this.imageUrl)
          console.log("提交的数据"+res.data);
          this.isShow = false;
          this.getList();
        });
        this.$http.post('http://localhost:5000/save_image_and_train', this.operateForm.name, this.imageUrl, {
          withCredentials: true,
        }).then(res => {
          console.log("提交的数据"+res.data);
          console.log("name"+this.operateForm.name)
          console.log("image"+this.imageUrl)
          this.isShow = false;
          this.getList();
        });
      }
    },
    // 添加用户
    addUser() {
      this.isShow = true
      this.operateType = 'add',
      this. operateForm = {
        name: '',
        // addr: '',
        age: '',
        birth: '',
        sex: '',
        type: '',
      }
    },
    refreshPicture() {
      // 调用 getPicture 函数来获取图像数据
      getPicture()
          .then(response => {
            // 如果成功获取到数据，将图像URL赋值给 imageUrl 属性
            this.operateForm.image = response.data.url;
          })
          .catch(error => {
            console.error('获取图像失败', error);
          });
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({data: res}) => {
        console.log(res)
        // this.tableData = res.user_info
        this.tableData = res.user_info.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          item.typeLabel = item.type == 0 ? '家属' : '老人'
          return item
        })
        // const rowIndexToUpdate = 0;
        // this.tableData[rowIndexToUpdate].image = '/assets/images/user.png';
        console.log("表格数据"+this.tableData)
        this.config.total = res.count
        this.config.loading = false
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件，是否继续", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = row.id;
        console.log(row.id)
        console.log(id)
        this.$http.delete(`http://localhost:5000/delete-user-info/${id}`)
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
    },
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