<template>
  <div class="app-container">
    <iframe
      :src="urlPath"
      class="iframe"
      ref="iframe"></iframe>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import qs from 'qs'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Iframe',
  data() {
    return {
      urlPath: this.getUrlPath() //iframe src 路径
    }
  },
  computed: {
    ...mapState({
      activityUrl: state => state.iframe.activityUrl,
    }),
  },
  mounted() {
    this.load();
    this.resize();
  },
  props: ['routerPath'],
  watch: {
    $route: function (to, from) {
      if (to.path != from.path) {
        this.load()
      }
    },
  },
  components: {
    ...mapGetters(['screen']),
  },
  methods: {
    // 显示等待框
    show() {
      NProgress.start()
    },
    // 隐藏等待狂
    hide() {
      NProgress.done()
    },
    // 加载浏览器窗口变化自适应
    resize() {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    // 加载组件
    load() {
      this.show()
      //超时5s自动隐藏等待框，加强用户体验
      let time = 5
      const timeFunc = setInterval(() => {
        time--
        if (time == 0) {
          this.hide()
          clearInterval(timeFunc)
        }
      }, 1000)
      this.iframeInit()
    },
    //iframe窗口初始化
    iframeInit() {
      const iframe = this.$refs.iframe
      if (iframe && iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      } else if (iframe) {
        iframe.onload = () => {
          this.hide()
        }
      }
    },
    getUrlPath: function () {
      //获取 iframe src 路径
      let routerPath = this.$route.path;
      const additionUrl = this.$route.meta.additionUrl
      routerPath = routerPath.replace(additionUrl, '').replace('/iframe', '');
      const query = this.$route.query;
      const params = this.$route.params;
      const queryParams = qs.stringify({
        ...query,
        ...params
      })
      return routerPath + '#' + additionUrl + '?' + queryParams 
    }
  }
}
</script>

<style scoped>
.app-container{
  height: 100%;
}
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
