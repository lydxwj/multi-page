<template>
  <el-pagination
    :page-sizes="pageSizes"
    background
    :pager-count="5"
    layout="total, sizes, prev, pager, next, jumper"
    v-bind="$attrs"
    v-on="$listeners">
  </el-pagination>
</template>
<script>
export default{
  name: 'c-pagination',
  props: {
    pageSizes: {
      default: () => [10, 20, 30, 50],
      type: Array
    }
  },
  data() {
    return {
    }
  },
  create() {
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>