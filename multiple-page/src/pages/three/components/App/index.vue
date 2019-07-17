<template>
    <div class="wrapper">
      page second
      <Com></Com>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    components: {

      // Prefetch闲置时间加载组件
        /* webpackChunkName: "test" */
      Com: () => import(
        /* webpackPrefetch: true */
        "../Com/index.vue")
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
