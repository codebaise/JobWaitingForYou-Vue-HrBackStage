<template>
  <el-col :xs="24" :md="12" :lg="8">
    <el-divider content-position="left"> 基本信息 </el-divider>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="hrName"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="curPosition"></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-tag
          :type="status | statusFilter"
          effect="dark">
          {{ status+2 | statusFilter }}
        </el-tag>
        <el-button size="small" @click="editHrInfo" type="primary" class="submit_botton">提交</el-button>
      </el-form-item>
    </el-form>
  </el-col>

</template>

<script>

export default {
  filters: {
    statusFilter(status){
      const statusMap = {
        0: 'danger',
        1: 'success',
        2: '审核中',
        3: '审核通过'
      }
      return statusMap[status]
    }
  },
  props: {
    hrName:String,
    curPosition: String,
    status: Number
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    editHrInfo() {
      console.log(this.hrName, this.curPosition)
      this.$emit("editHrInfo", this.hrName, this.curPosition)
    }
  }
}
</script>

<style scoped>
.submit_botton {
  margin-top: 6px;
  float: right;
}
</style>
