<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      iframes: []
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
  }
}
</script>

<style scoped lang="scss">
.app-main {
  width: 100%;
  height: calc(100% - 86px);
  box-sizing: border-box;
  position: relative;
}
.fixed-header+.app-main {
  margin-top: 86px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.iframe{
  width: 100%;
  height: 100%;
}
</style>
