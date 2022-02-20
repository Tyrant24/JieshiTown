<template>
  <div>{{TimeSpan}}</div>
</template>
<script>
import { Utils } from "../Utils";

export default {
  data() {
    return {
      TimeSpan: ""
    };
  },
  created() {
    setInterval(() => {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.TimeSpan = yy + "年" + mm + "月" + dd + "日 " + hh + ":" + mf + ":" + ss;
    }, 1000);
  },
  methods: {}
};
</script>
<style scoped>
</style>