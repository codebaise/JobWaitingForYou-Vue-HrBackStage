<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="seekApplyList"
      element-loading-text="Loading"
      fit
      highlight-current-row
      border
    >
      <el-table-column label="ID" type="index" align="center"/>
      <!--      seekerName -->
      <el-table-column label="姓名" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.seekerName }}</span>
        </template>
      </el-table-column>
      <!--      userIdentity -->
      <el-table-column label="用户身份" align="center" width="120px">
        <template slot-scope="scope">
          <!--   0 -> 应届生  || 1 -> 职场人士 || 2 -> 已经入职 -->
          <span>{{ scope.row.userIdentity === 0 ? '应届生' : '职场人士' }}</span>
        </template>
      </el-table-column>
      <!--      currentStatus -->
      <el-table-column label="当前状态" align="center" width="150px">
        <template slot-scope="scope">
          <span v-if="scope.row.userIdentity === 0">应届生</span>
          <span v-if="scope.row.userIdentity === 1">{{ scope.row.currentStatus | currentStatusFilter }}</span>
        </template>
      </el-table-column>
      <!--      positionName -->
      <el-table-column label="申请职位名称" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>
      <!--      workCity -->
      <el-table-column label="工作城市" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.workCity }}</span>
        </template>
      </el-table-column>
      <!--      当前的审批状态 -->
      <el-table-column label="审批状态" style="width: 100%" align="center" width="150px">
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.status | statusFilter"
          >
            {{ scope.row.status + 4 | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <!--      操作 column -->
      <el-table-column label="操作" align="center">
        <!--          slot-scope="scope"-->
        <template slot="header">
          Operation
        </template>
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="getSeekerDetailInfo(scope.row.deliverId)">详细信息</el-button>
          <el-button v-if="scope.row.status === 0" size="small" type="success"
                     @click="checkDeliver(scope.row, 2, scope.$index)"
          >同意
          </el-button>
          <el-button v-if="scope.row.status === 0" size="small" type="danger"
                     @click="checkDeliver(scope.row, 1, scope.$index)"
          >拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="Applicant Detail Info"
      :visible.sync="showDrawer"
      direction="rtl"
      size="50%"
    >
      <el-row>
        <el-divider content-position="center">基本信息</el-divider>
        <seek-detail-info :detailData="detailData"/>
      </el-row>
      <el-row>
        <el-divider content-position="center">工作经历</el-divider>
        <work-experience :workExperienceData="workExperienceData" :deliverId="deliverId"/>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { checkDeliver } from '@/api/position'
import SeekDetailInfo from '@/views/seekApply/SeekDetailInfo'
import WorkExperience from '@/views/seekApply/WorkExperience'
import { checkSeekerDetailInfo, getSeekerWorkExperience } from '@/api/seeker'

export default {
  components: {
    SeekDetailInfo,
    WorkExperience
  },
  filters: {
    minExperience(minExperience) {
      const experienceRule = {
        0: '1年以内',
        1: '1-3年',
        2: '3-5年',
        3: '5-10年',
        4: '10年以上'
      }
      return experienceRule[minExperience]
    },
    minEducation(minEducation) {
      const minEducationRule = {
        0: '不限',
        1: '初中及以下',
        2: '中专/中技',
        3: '高中',
        4: '大专',
        5: '本科',
        6: '硕士',
        7: '博士'
      }
      return minEducationRule[minEducation]
    },
    statusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'danger',
        2: 'primary',
        3: 'success',
        4: '未审批',
        5: '已拒绝',
        6: '等待回复',
        7: '已完成'
      }
      return statusMap[status]
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
  },
  data() {
    return {
      seekApplyList: [],
      listLoading: true,
      detailData: {},
      showDrawer: false,
      workExperienceData: {},
      deliverId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList('/hr/positions/applicants').then(response => {
        this.seekApplyList = response.data.items
        this.listLoading = false
      })
    },
    // 修改 当前职位的启用状态
    checkDeliver(row, value, index) {
      let data = {
        deliverId: row.deliverId,
        checkValue: value
      }
      checkDeliver(data).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.seekApplyList[index].status = value
      })
    },
    closeDrawer() {
      this.editPositionData.showDrawer = false
    },
    async getSeekerDetailInfo(deliverId) {
      this.deliverId = deliverId
      // 获取用户信息
      let responseOne = await checkSeekerDetailInfo(deliverId)
      this.$message({
        message: 'Detail Info Get Success',
        type: 'success'
      })
      this.detailData = responseOne.data.detailData
      // 获取就职经历
      let responseTwo = await getSeekerWorkExperience(deliverId)
      this.$message({
        message: 'Work Experience Get Success',
        type: 'success'
      })
      this.workExperienceData = responseTwo.data.items
      // 置后弹出, 防止数据还没被加载
      this.showDrawer = true
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
  width: 50%;
}

.el-form-item {
  padding-left: 30px
}
</style>
