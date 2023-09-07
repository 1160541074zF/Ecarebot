<template>
  <el-table
      :data="tableData"
      stripe
      border
      style="width:1250px;height:240px;overflow: auto">
    <el-table-column prop="image" label="头像" width="90"  align="center">
      <template >
        <el-avatar shape="circle" :size="50" :src="userImage" @error="handleImageError"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" width="55px" v-if="false"></el-table-column>
    <el-table-column prop="orderNum" label="订购单编号" width="150px"></el-table-column>
    <el-table-column prop="instockNum" label="入库单编号" width="150px"></el-table-column>
    <el-table-column prop="priority" label="紧急程度" width="180px">
      <template slot-scope="scope">
        <el-rate disabled size="mini" v-model="scope.row.priority" show-text :texts="texts"></el-rate>
      </template>
    </el-table-column>
    <el-table-column prop="supplierId"  v-if="false" ></el-table-column>
    <el-table-column prop="supplierName" label="供应商单位" width="150px"></el-table-column>
    <el-table-column prop="phone" label="联系方式" width="100px"></el-table-column>
    <el-table-column prop="remark" label="备注" width="140px"></el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="150px"></el-table-column>
    <el-table-column prop="instockTime" label="入库时间" width="150px"></el-table-column>
    <el-table-column prop="status" label="状态" width="125px">
      <template slot-scope="scope">
        <el-tag size="mini" effect="plain" v-if="scope.row.status==2">入库完成</el-tag>
        <el-tag size="mini" effect="plain" v-if="scope.row.status==1">审核通过 待入库</el-tag>
        <el-tag size="mini" effect="plain" type="warning" v-if="scope.row.status==0">审核中</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="260px">
      <template slot-scope="scope">
        <!--更新的数据从scope中取出来-->
        <el-button @click="handleFindDeatails(scope.row)" size="mini" type="success" icon="el-icon-view" >明细</el-button>
        <el-button @click="handleAudit(scope.row)" size="mini" type="warning" icon="el-icon-edit"
                   v-if="scope.row.status == 0">通过</el-button>
        <!--确认删除-->
        <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="handleDeleteOrder(scope.row)"
        >
          <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete" style="margin-left: 10px">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import userImage from '@/assets/images/user.png';
export default {
  name: "test.vue",
  data() {
    return {
      userImage: userImage,
    }
  },
  methods: {
    handleImageError(event) {
      console.error('Image loading error:', event);
    },
  },
}
</script>

<style scoped>

</style>