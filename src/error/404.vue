<template>
	<div class="error-page">
		<p class="error-txt">
      抱歉，您查找资源不存在，请检查路径。404
		</p>
		<div class="btn-group">
			<el-button type="primary"  @click="goBackIndex">返回首页</el-button>
			<el-button @click="refresh">刷新</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goBackIndex() {
        this.closeSelectedTag(this.$route);
				this.$router.push('/');
			},
			refresh(){
        this.closeSelectedTag(this.$route);
				this.$router.go(-1);
			},
      closeSelectedTag(view) {
        this.$store.dispatch('tagsView/delView', view);
      },
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.error-page{
		text-align:center;
		padding-top: 70px;
		.error-txt{
			color: #848587;
			font-size: 24px;
			margin: 20px 0 40px 0;
		}
	}
	@media screen and (max-width: 1366px) {
		.error-page{
			padding-top: 100px;
		}
	}
</style>
