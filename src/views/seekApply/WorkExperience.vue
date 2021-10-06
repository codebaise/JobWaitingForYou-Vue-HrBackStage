<template>
  <div>
    <el-table
      :data="workExperienceData"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"/>
      <el-table-column property="companyName" label="就职公司" width="100"/>
      <el-table-column property="position" label="职位" width="100"/>
      <el-table-column property="startTime" label="startTime" width="100"/>
      <el-table-column property="endTime" label="endTime" width="100"/>
      <el-table-column property="description" show-overflow-tooltip label="简述"/>
      <el-table-column label="就职评价" align="center">
        <template>
          <el-button size="mini" type="primary" icon="el-icon-search" circle
                     @click="getPositionComments()"
          />
        </template>
      </el-table-column>
    </el-table>
    <work-experience-position-comments :data="innerDrawerData"/>
  </div>
</template>

<script>
import WorkExperiencePositionComments from '@/views/seekApply/WorkExperiencePositionComments'
import { getPositionComments } from '@/api/seeker'

export default {
  components: {
    WorkExperiencePositionComments
  },
  props: {
    workExperienceData: Array,
    deliverId: String
  },
  data() {
    return {
      expandStatus: false,
      // 传递给 下层的 PositionComments 组件的data
      innerDrawerData: {
        openDraw: false,
        comments: {}
      }
    }
  },
  methods: {
    // 获取 当前就职经历的评论列表
    getPositionComments() {
      getPositionComments(this.deliverId).then((response) => {
        this.innerDrawerData.comments = response.data.items
        this.innerDrawerData.openDraw = true
      })
    }
  }
}
</script>

<style scoped>

</style>
