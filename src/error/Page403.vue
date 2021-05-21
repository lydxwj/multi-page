<template>
	<div class="error-page">
		<p class="error-txt">
      抱歉，您没有当前页面的权限，请联系管理员配置。403
		</p>
		<div class="btn-group">
			<el-button @click="goBackIndex">返回上一页</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			goBackIndex() {
        this.closeSelectedTag(this.$route);
				this.$router.go(-1);
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
		.error-flag{
			width: 670px;
			height: 395px;
		}
		.error-txt{
			color: #848587;
			font-size: 24px;
			margin: 20px 0 40px 0;
		}
		.blueButton,.whiteButton{
			padding: 0;
		}
	}
	@media screen and (max-width: 1366px) {
		.error-page{
			padding-top: 100px;
		}
	}
</style>
