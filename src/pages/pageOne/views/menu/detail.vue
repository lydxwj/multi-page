<template>
  <div class="page-detail-container page-container ">
    <div class="form-container" v-loading="loading">
        <el-form :model="formData" label-position="right" :rules="rules" label-width="110px" ref="form">
          <el-row type="flex" justify="center">
            <el-col :span="10">
              <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formData.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn-container">
          <el-button @click="goto">返回</el-button>
          <el-button type="primary" @click="confirm">保存</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import { descendantsMessage } from '@/utils'
export default {
  data() {
    return {
      detail: {
        id: '',
      },
      formData: {},
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur'},
        ],
      },
      operate: false,
      loading: false,
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const query = this.$route.query;
      if (query.id) {
        this.loading = true;
        this.detail = {
          id: query.id,
          name: query.name
        };
        this.formData = {
          name: query.name,
        };
        this.loading = false;
      }
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.save();
        }
      })
    },
    save() {
      descendantsMessage({
        type: 'warning',
        message: '保存失败'
      });
      this.goto();
    },
    goto() {
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss">
.page-detail-container{
  .btn-container{
    display: flex;
    justify-content: center;
  }
}
</style>
