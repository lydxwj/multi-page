<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to,title)">
    <slot />
  </component>
</template>

<script>
import { isExternal, isIframe } from "@/utils/validate";

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url, title) {
      // 对于https: http: 请求是打开新窗口
      if (isExternal(url)) {
        if (isIframe(url)) {
          url = url.replace("iframe:", "");
          return {
            is: "router-link",
            to: "/iframe?title=" + title + "&src=" + url
          };
        } else {
          //url = url.replace("_blank:", '');
          return {
            is: "a",
            href: url,
            target: "_blank",
            rel: "noopener"
          };
        }
      }
      return {
        is: "router-link",
        to: url
      };
    }
  }
};
</script>
