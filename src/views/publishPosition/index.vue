<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="positionList"
      element-loading-text="Loading"
      fit
      highlight-current-row
      border
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
            <el-form-item label="最低工作经验">
              <span>{{ props.row.minExperience | minExperience }}</span>
            </el-form-item>
            <el-form-item label="最低学历">
              <span>{{ props.row.minEducation | minEducation }}</span>
            </el-form-item>
            <el-form-item label="最低薪资">
              <span>{{ props.row.minSalary + 'k' }}</span>
            </el-form-item>
            <el-form-item label="描述" style="width: 100%">
              <!--              {{ props.row.description }}-->
              <span>
                进入编辑查看
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" type="index" align="center"/>
      <el-table-column label="招聘类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type === 0 ? '校招' : '社招' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" show-overflow-tooltip prop="positionName" align="center"/>
      <el-table-column label="职位审核状态" style="width: 100%" align="center">
        <!--              <span>{{ props.row.status == 0 ? '审核通过' : '审核拒绝' }}</span>-->
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.status | statusFilter"
          >
            {{ scope.row.status + 5 | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
<!--          slot-scope="scope"-->
          <template slot="header">
            Operation
            <el-button type="primary" size="mini" @click="addPosition">新增职位</el-button>
          </template>
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editPosition(scope.$index)">Edit</el-button>
          <el-button v-if="scope.row.status === 3 || scope.row.status === 2" size="small" type="danger"
                     @click="hrChangePositionUseStatus(scope.row.id, scope.$index)"
          >注销职位
          </el-button>
          <el-button v-else-if="scope.row.status === 4" size="small" type="success"
                     @click="hrChangePositionUseStatus(scope.row.id, scope.$index)"
          >启用职位
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-position
      :editPositionData="editPositionData"
      @closeDrawer="closeDrawer"
      ref="drawer"
    ></edit-position>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { changePositionUseStatus } from '@/api/position'
import EditPosition from '@/views/publishPosition/EditPosition'

export default {
  components:{
    EditPosition
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
        2: 'success',
        3: 'success',
        4: 'danger',
        5: '审核中',
        6: '未审核通过, 重新填写资料',
        7: '启用中',
        8: '启用中',
        9: '未启用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      positionList: [],
      listLoading: true,
      editPositionData: {
        drawerTitle: "新增职位",
        showDrawer: false,
        formData: {}
      },
      firstLoadDrawer: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList('/hr/positions').then(response => {
        this.positionList = response.data.items
        this.listLoading = false
      })
    },
    // 修改 当前职位的启用状态
    hrChangePositionUseStatus(positionId, index) {
      changePositionUseStatus(positionId).then((response) => {
        console.log(response)
        if (response.code === 200) {
          this.$message({
            message: 'Operation success !',
            type: 'success'
          })
          if (this.positionList[index].status === 2) {
            this.positionList[index].status = 4
          } else {
            this.positionList[index].status = 2
          }
        }
      })
    },
    addPosition() {
      this.editPositionData.showDrawer = true
      this.editPositionData.drawerTitle = "新增职位"
      this.editPositionData.formData = {}
      this.setTinyDesc("")
    },
    editPosition(index) {
      this.editPositionData.showDrawer = true
      this.editPositionData.drawerTitle = "编辑职位信息"
      this.editPositionData.formData = this.positionList[index]
      this.setTinyDesc(this.editPositionData.formData.description)
    },
    closeDrawer() {
      this.editPositionData.showDrawer = false
    },
    setTinyDesc(val) {
      if (this.firstLoadDrawer !== true)
        this.$refs['drawer'].setTinyDescription(val)
      if (this.firstLoadDrawer === true)
        this.firstLoadDrawer = false
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
