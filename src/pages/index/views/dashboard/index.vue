<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ userInfo.name }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapState({
      'userInfo': state => state.userInfo
    }),
  },
  data() {
  return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
