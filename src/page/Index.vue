<template>
  <div>
    <van-button class="btn" type="info" @click="btn()">信息按钮</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)

export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    btn() {
      this.$router.push('/authentication')
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  width: 375px;
}
</style>
