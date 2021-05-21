<template>
  <div class="page-list-container page-container">
    <div class="table-filter-place">
      <div class="table-filter-place-floor">
        <div class="inline-block p-r-10">
          <el-input width="200" placeholder="请输入名称" v-model="name">
          </el-input>
        </div>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
        <el-button type="success" @click="gotoAdd">新建</el-button>
      </div>
    </div>
    <el-table
      border
      ref="table"
      :data="list"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="status"
        label="操作">
        <template slot-scope="{ row }">
          <el-button class="m-r-10" type="primary" size="mini" @click="gotoEdit(row)">编辑</el-button>
          <el-popconfirm
            title="是否删除？"
            @confirm="() => {}"
          >
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-t-20">
      <c-pagination
        v-if="total"
        :page-size.sync="limit"
        :total="total"
        :current-page.sync="pageNo"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      list: [{
      id: '1',
      name: '数据一'
    },{
      id: '2',
      name: '数据二'
    }],
      pageNo: 1,
      limit: 10,
      total: 2,
      loading: false,
      operate: false,
      selected: [],
      selectRow: new Map(),
    } 
  },
  created() {
  },
  methods: {
    gotoAdd() {
      this.$router.push({
        name: 'listAdd'
      });
    },
    gotoEdit(row) {
      this.$router.push({
        name: 'listEdit',
        query: {
          id: row.id,
          name: row.name,
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
