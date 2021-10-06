<template>
  <div>
<!--    为了美观 -->
    <div style="margin-bottom: 10px"></div>
    <notify-item
      v-for="item in pageInfo.records"
      :key="item.createTime"
      :title="item.title"
      :content="item.content"
      :createTime="item.createTime"
    ></notify-item>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="pageInfo.total"
      :current-page="pageInfo.current"
      :hide-on-single-page="hideOnSinglePage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getGlobalMessage } from '@/api/notify'
import NotifyItem from '@/views/notify/components/index'

export default {
  name: 'index',
  components: {
    NotifyItem
  },
  data() {
    return {
      pageInfo: {},
      listLoading: false,
      hideOnSinglePage: true
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getGlobalMessage({ page }).then((response) => {
        this.pageInfo = response.data.items
        this.listLoading = false
        this.parseStringToIntPage()
      })
    },
    handleCurrentChange(val) {
      this.fetchData(val)
    },
    parseStringToIntPage() {
      this.pageInfo.current = parseInt(this.pageInfo.current)
      this.pageInfo.total = parseInt(this.pageInfo.total)
      this.pageInfo.pages = parseInt(this.pageInfo.pages)
      this.pageInfo.size = parseInt(this.pageInfo.size)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.el-pagination.is-background {
  width: 50%;
  margin-top: 20px;
  margin-left: 30%;
  margin-bottom: 20px;
}
.infinite-list li{
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

</style>
