<template>
  <div class="app-container">
    <el-col v-for="(value, key) in detailData" :key="key" :xs="24" :lg="12">
      <info-item :title="key" :value="value"></info-item>
    </el-col>
  </div>
</template>

<script>
import InfoItem from '@/views/seekApply/SeekDetailInfoItem'

export default {
  components: {
    InfoItem,
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
  props: {
    detailData: Object,
    workExperienceData: Object
  },
  data() {
    return {
      listLoading: true
    }
  },
  methods: {}
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

