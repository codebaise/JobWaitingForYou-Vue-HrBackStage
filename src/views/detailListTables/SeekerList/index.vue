<template>
  <div class="app-container">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div>
              <el-divider content-position="left">基本信息</el-divider>
            </div>
            <el-form-item label="Name">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="Age">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="UserIdentity">
              <span>{{ props.row.userIdentity | userIdentityFilter }}</span>
            </el-form-item>
            <el-form-item label="CurrentStatus">
              <span>{{ props.row.currentStatus | currentStatusFilter(props.row.userIdentity) }}</span>
            </el-form-item>
            <el-form-item label="期望职位">
              <span>{{ props.row.expectPosition }}</span>
            </el-form-item>
            <el-form-item label="期望城市">
              <span>{{ props.row.expectCity }}</span>
            </el-form-item>
            <div>
              <el-divider content-position="left">教育经历</el-divider>
            </div>
            <el-form-item label="SchoolName">
              <span>{{ props.row.schoolName }}</span>
            </el-form-item>
            <el-form-item label="Education">
              <span>{{ props.row.education | educationFilter }}</span>
            </el-form-item>
            <el-form-item label="Domain">
              <span>{{ props.row.domain }}</span>
            </el-form-item>
            <el-form-item label="StartTime">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="EndTime">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
            <div>
              <el-divider content-position="left">查询更多</el-divider>
            </div>
          </el-form>
        </template>
      </el-table-column>
  </div>
</template>

<script>
import { getList } from '@/api/table'
export default {
  components: {
  },
  filters: {
    userIdentityFilter(userIdentity) {
      return userIdentity === 0 ? '应届生' : '职场人士'
    },
    currentStatusFilter(currentStatus, userIdentity) {
      if (userIdentity === 0) {
        return ''
      }
      const currentStatusMap = {
        0: '离职找工作',
        1: '在职找工作',
        2: '在职看机会',
        3: '暂时不找工作'
      }
      return currentStatusMap[currentStatus]
    },
    educationFilter(education) {
      const educationRule = {
        0: '不限',
        1: '初中及以下',
        2: '中专/中技',
        3: '高中',
        4: '大专',
        5: '本科',
        6: '硕士',
        7: '博士'
      }
      return educationRule[education]
    }
  },
  data() {
    return {
      listLoading: true
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getList('/backStageManagement/seekers', { page }).then((response) => {
        this.pageInfo = response.data.items
        this.listLoading = false
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
