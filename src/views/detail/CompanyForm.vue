<template>
  <el-col :xs="24" :offset="2" :sm="12">
    <el-divider content-position="left">基本信息</el-divider>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="companyName">
        <el-input v-model="companyName"/>
      </el-form-item>
      <el-form-item label="simpleName">
        <el-input v-model="simpleName"/>
      </el-form-item>
      <el-form-item label="domain">
        <el-input v-model="domain"/>
      </el-form-item>
      <el-form-item label="scale">
        <el-input v-model="scale"/>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-tag :type="auditStatus | statusFilter" effect="dark">
          {{ auditStatus + 3 | statusFilter(hrCompanyId) }}
        </el-tag>
        <el-button @click="saveOrUpdateCompanyInfo" size="small" type="primary" class="submit_botton">提交</el-button>
      </el-form-item>

    </el-form>
  </el-col>
</template>

<script>
import { saveOrUpdateCompanyInfo } from '@/api/hr'

export default {
  filters: {
    statusFilter(status, hrCompanyId) {
      if (hrCompanyId === undefined || hrCompanyId === "0")
        return "未填写"
      const statusMap = {
        0: 'warning',
        1: 'danger',
        2: 'success',
        3: '审核中',
        4: '审核未通过',
        5: '审核通过'
      }
      return statusMap[status]
    }
  },
  props: {
    companyName: String,
    simpleName: String,
    domain: String,
    auditStatus: Number,
    scale: Number,
    hrCompanyId: String
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    saveOrUpdateCompanyInfo() {
      this.form.name = this.companyName
      this.form.simpleName = this.simpleName
      this.form.domain = this.domain
      this.form.scale = this.scale
      this.$emit("saveOrUpdateCompanyInfo", this.form)
    }
  }
}
</script>

<style>
.submit_botton {
  /*margin-top: 8px;*/
  float: right;
}
</style>
