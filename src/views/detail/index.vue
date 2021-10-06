<template>
  <div class="app-container">
    <el-row :gutter="10">
      <!--    <el-divider content-position="left"> 基本信息 </el-divider>-->
      <user-detail-form
        :hrName.sync="detailInfo.hrName"
        :curPosition.sync="detailInfo.curPosition"
        :status="detailInfo.status"
        @editHrInfo="editHrInfo"
      ></user-detail-form>
      <company-form
        :companyName="detailInfo.companyName"
        :simpleName="detailInfo.simpleName"
        :domain="detailInfo.domain"
        :scale="detailInfo.scale"
        :auditStatus="detailInfo.auditStatus"
        :hrCompanyId="detailInfo.hrCompanyId"
        @saveOrUpdateCompanyInfo="saveOrUpdateCompanyInfo"
      />
    </el-row>
    <!--    <el-divider content-position="left"> 公司详情 </el-divider>-->
  </div>
</template>

<script>
import { getDetailInfo } from '@/api/user'
import UserDetailForm from '@/views/detail/UserDetailForm'
import CompanyForm from '@/views/detail/CompanyForm'
import { saveOrUpdateCompanyInfo, saveOrUpdateHrInfo } from '@/api/hr'

export default {
  components: {
    UserDetailForm,
    CompanyForm
  },
  filters: {
    auditStatusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'danger',
        2: 'success',
        3: '审核中',
        4: '公司资质不达标',
        5: '审核通过'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      detailInfo: {}
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      getDetailInfo().then(response => {
        this.detailInfo = response.data.detailInfo
      })
    },
    editHrInfo(name, curPosition) {

      let data = {
        name, curPosition
      }
      saveOrUpdateHrInfo(data).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    saveOrUpdateCompanyInfo(form) {
      saveOrUpdateCompanyInfo(form).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}

.el-form-item {
  padding-left: 30px
}

.el-pagination.is-background {
  width: 50%;
  margin-top: 20px;
  margin-left: 30%;
}
</style>
