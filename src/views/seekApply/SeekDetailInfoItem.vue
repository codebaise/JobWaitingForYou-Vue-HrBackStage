<template>
  <div class="info-item-cls">
<!--    <el-col :span="8">-->
        <div class="label-cls">
          <label>{{ title }}</label>
        </div>

<!--    </el-col>-->
<!--    <el-col :span="12">-->
      <span>{{ value }}</span>
<!--    </el-col>-->
  </div>

</template>

<script>
export default {
  name: 'InfoItem',
  props: {
    title: String,
    value: [Number, String]
  }
}
</script>

<style scoped>
  .info-item-cls{
    margin: 10px 0;
  }
  .label-cls{
    width: 120px;
    display: inline-block;
  }

</style>
