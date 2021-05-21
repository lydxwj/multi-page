<template>
  <div class="page_login">
		<!-- 登录界面 -->
		<el-card class="login_main">
			<div class="login_title">
				<span class="title_text">多页应用</span>
			</div>
			<el-form
				ref="loginForm"
				:model="loginForm"
				:rules="loginRules"
				class="login_form"
				auto-complete="on"
				label-position="left"
			>
				<!-- 账户密码登录 -->
				<el-form-item prop="username">
					<div class="login_form_item">
						<span class="svg-container">
							<svg-icon icon-class="user" />
						</span>
						<el-input
							ref="username"
							v-model="loginForm.username"
							placeholder="账号"
							name="username"
							type="text"
							tabindex="1"
							auto-complete="on"
						/>
					</div>
				</el-form-item>
				<el-form-item prop="password">
					<div class="login_form_item">
						<span class="svg-container">
							<svg-icon icon-class="password" />
						</span>
						<el-input
							:key="passwordType"
							ref="password"
							v-model="loginForm.password"
							:type="passwordType"
							placeholder="密码"
							name="password"
							tabindex="2"
							auto-complete="on"
						/>
						<span class="show-pwd" @click="showPwd">
							<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
						</span>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button
						class="login-form-button"
						:loading="loading"
						type="primary"
						tabindex="6"
						@click.native.prevent="handleLogin"
					>登录
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
  </div>
</template>

<script>
import { setAuthority } from '@/utils'
import { Login } from '../../http'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur', }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur', }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    // 密码显示隐藏
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const { loginForm } = this;
          let data = {
						username: loginForm.username,
						password: loginForm.password,
					};
          Login(data).then(res => {
            if (res.code == 200) {
              // 清空历史页面
              this.$store.dispatch('tagsView/delAllViews').then(() => {
                setAuthority(res.result);
                this.$router.replace({ path: this.redirect || '/' })
                this.loading = false
              })
            } else {
              this.$message.error(res.message);
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          });
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">
.page_login {
	width: 100%;
	height: 100%;
	overflow: hidden;
	min-width: 1400px;
	position: relative;
	min-height: 800px;
	background-color: #409eff;
	.login_main{
		width: 400px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.login_title {
		font-size: 32px;
		font-weight: 400;
		line-height: 40px;
		padding-bottom: 40px;
		text-align: center;
	}
	.login_form {
		width: 100%;
		color: rgba(0, 0, 0, 0.65);

		.login_form_item {
			height: 50px;
			box-sizing: border-box;
			border-radius: 4px;
			line-height: 50px;
			border: 1px solid #dcdfe6;
			display: flex;
			overflow: hidden;
		}

		.svg-container {
			padding-left: 15px;
		}

		.show-pwd {
			padding-right: 15px;
		}

		.el-input {
			flex: 1;
		}

		.el-input__inner {
			height: 50px;
			line-height: 50px;
			border: 0 none;
			border-radius: 20px;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px #fff inset !important;
				-webkit-text-fill-color: rgba(0, 0, 0, 0.65) !important;
			}
		}
	}
	.login-form-button {
		margin-top: 20px;
		width: 100%;
		height: 48px;
		font-size: 16px;
		background-color: #409eff;
		border-color: #409eff;
	}
}
</style>
