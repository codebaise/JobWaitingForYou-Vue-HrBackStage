<template>
  <el-drawer
    :title="editPositionData.drawerTitle"
    :before-close="handleClose"
    :visible.sync="editPositionData.showDrawer"
    direction="rtl"
    custom-class="demo-drawer"
    ref="drawer"
    size="75%"
  >
    <div class="demo-drawer__content">
      <el-form :model="editPositionData.formData">
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="招聘类型" :label-width="formLabelWidth">
            <el-select v-model="editPositionData.formData.type" placeholder="请选择招聘类型">
              <el-option v-for="(value, i) in typeList" :key="value" :label="value" :value="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="职位名称" :label-width="formLabelWidth">
            <el-input style="width: 200px" v-model="editPositionData.formData.positionName" autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="职位类型" :label-width="formLabelWidth">
            <el-select v-model="editPositionData.formData.positionType" placeholder="请选择职位类型">
              <el-option label="java开发" value="java开发"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="工作城市" :label-width="formLabelWidth">
            <el-input style="width: 200px" v-model="editPositionData.formData.workCity" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="工作时长" :label-width="formLabelWidth">
            <el-input style="width: 200px" v-model="editPositionData.formData.workHours" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="最低学历" :label-width="formLabelWidth">
            <el-select v-model="editPositionData.formData.minEducation" placeholder="请选择最低学历">
              <el-option v-for="(value, i) in minEducationList" :key="value" :label="value" :value="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="最低工作经验" :label-width="formLabelWidth">
            <el-select v-model="editPositionData.formData.minExperience" placeholder="请选择最低工作经验">
              <el-option v-for="(value, i) in experienceList" :key="value" :label="value" :value="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item label="最低薪资" :label-width="formLabelWidth">
            <el-input style="width: 200px" v-model="editPositionData.formData.minSalary" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
          <el-form-item :label-width="formLabelWidth">
            <!--      <div class="demo-drawer__footer">-->
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{
                loading ? '提交中 ...' : '提交'
              }}
            </el-button>
          </el-form-item>
          <!--      </div>-->
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述" :label-width="formLabelWidth">
            <tinymce ref="tinymce" :value="editPositionData.formData.description" width="95%"></tinymce>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import Tinymce from '@/components/Tinymce/index'
import { saveORUpdatePositionInfo} from '@/api/position'

export default {
  name: 'EditPosition',
  components: {
    Tinymce
  },
  props: {
    editPositionData: {
      type: Object,
      default: function() {
        return {
          title: '新增职位',
          showDrawer: false,
          formData: {}
        }
      }
    },
    type: String
  },
  data() {
    return {
      formLabelWidth: '120px',
      loading: false,
      typeMap: {
        0: '校招',
        1: '社招'
      },
      typeList: [],
      experienceMap: {
        0: '1年以内',
        1: '1-3年',
        2: '3-5年',
        3: '5-10年',
        4: '10年以上'
      },
      experienceList: [],
      minEducationMap: {
          0: '不限',
          1: '初中及以下',
          2: '中专/中技',
          3: '高中',
          4: '大专',
          5: '本科',
          6: '硕士',
          7: '博士'
        },
      minEducationList:[]
    }
  },
  created() {
    this.initList()
  },
  methods: {
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('是否提交表单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.setCurDescription()
        this.updatePosition()
      }).catch(() => {
        this.cancelForm()
      })
    },
    cancelForm() {
      this.loading = false
      this.$emit('closeDrawer')
    },
    updatePosition() {
      saveORUpdatePositionInfo(this.editPositionData.formData).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.cancelForm()
      }).catch(() => {
        this.timer = setTimeout(() => {
          // 动画关闭需要一定的时间
          setTimeout(() => {
            this.loading = false;
          }, 400);
        }, 2000);
      })
    },
    setCurDescription() {
        this.editPositionData.formData.description = this.$refs['tinymce'].getContent()
    },
    setTinyDescription(value) {
        this.$refs['tinymce'].setContent(value)
    },
    initList() {
      for (let item in this.typeMap){
        this.typeList.push(this.typeMap[item])
      }
      for (let item in this.experienceMap){
        this.experienceList.push(this.experienceMap[item])
      }
      for (let item in this.minEducationMap){
        this.minEducationList.push(this.minEducationMap[item])
      }
    }

  }
}
</script>

<style>
.el-avatar, .el-drawer {
  overflow: auto;
}
</style>
