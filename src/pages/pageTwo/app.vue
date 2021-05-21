<template>
	<div class="main">
		<router-view></router-view>
	</div>
</template>

<script>
import { isInIframe } from '@/utils'
export default{
	data() {
		return {
		}
	},
	created() {
		isInIframe();
	},
}
</script>

<style>
</style>
