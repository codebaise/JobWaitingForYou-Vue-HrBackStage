<template>
  <el-drawer
    :title="data.title"
    :visible.sync="data.showDrawer"
    direction="rtl"
    size="50%"
  >
    <el-table
      :data="data.items"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="城市">
              <span>{{ props.row.workCity }}</span>
            </el-form-item>
            <el-form-item label="工时">
              <span>{{ props.row.workHours }}</span>
            </el-form-item>
            <el-form-item label="职位类型">
              <span>{{ props.row.positionType }}</span>
            </el-form-item>

            <el-form-item label="最低学历">
              <span>{{ props.row.minEducation | minEducation }}</span>
            </el-form-item>
            <el-form-item label="职位审核状态" style="width: 100%">
              <!--              <span>{{ props.row.status == 0 ? '审核通过' : '审核拒绝' }}</span>-->
              <el-tag
                size="small"
                :type="props.row.status | statusFilter"
              >
                {{ props.row.status+2 | statusFilter }}
              </el-tag>
            </el-form-item>
            <el-form-item label="描述" style="width: 100%">
              <span>{{ props.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" type="index" align="center" />
      <el-table-column label="Type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type == 0 ? '校招' : '社招' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" show-overflow-tooltip prop="positionName" align="center" />
      <el-table-column label="最低工作经验" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.minExperience | minExperience }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低薪资" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.minSalary + 'k' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Operation" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" size="small" type="danger" icon="el-icon-delete" circle @click="changePositionStatus(scope.row.id, scope.$index)" />
          <el-button v-if="scope.row.status === 1" size="small" type="success" icon="el-icon-check" circle @click="changePositionStatus(scope.row.id, scope.$index)" />

        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
import { changePositionStatus } from '@/api/user'

export default {
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
        0: 'success',
        1: 'danger',
        2: '审核通过',
        3: '未通过审核'
      }
      return statusMap[status]
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    changePositionStatus(positionId, index) {
      changePositionStatus(positionId).then((response) => {
        console.log(response)
        if (response.code === 200) {
          this.$message({
            message: 'Operation success !',
            type: 'success'
          })
          const status = this.data.items[index].status
          this.data.items[index].status = status === 0 ? 1 : 0
        }
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
    width: 50%;
  }

  .el-form-item {
    padding-left: 30px
  }
</style>
