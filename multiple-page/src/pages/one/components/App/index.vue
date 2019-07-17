<template>
    <div class="wrapper">
      page
      <Test></Test>
      <Test2></Test2>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import Test2 from './test2';

export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    components: {

      // Prefetch闲置时间加载组件
        /* webpackChunkName: "test" */
      Test: () => import(
        /* webpackPrefetch: true */
        "../Test/index.vue"),
      Test2
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style lang="css" scoped>
    @import './index.css';

    .wrapper {
        /* border: 2px solid #fff; */
    }
</style>
