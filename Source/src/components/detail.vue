<template>
  <div class="padding-3x">
    <div class="small_block2">
      <div style="overflow: auto; height: 300px; margin: 20px">
        {{info.summary}}
      </div> 
    </div>

    <div class="text-center margin-3x">
    <img  :src="img"   style="width:700px;height:560px" /> 
    </div>
    

    <div class="padding-top icon_back">
      <img :src="back" class="icon-3x" @click="goBack" />
    </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";
import echarts from "echarts";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      shouruinfo: [],
      circular: require("@/assets/circular.png"),
      back: require("@/assets/back.png"),
      village_id: "",
      panduan: "A",
      info: [],
    };
  },
  created() {
    PageHelper.Init(this);
    HttpHelper.Post("member/info", {}).then((Member) => {
      this.village_id = Member.village_id;

      HttpHelper.Post("village/villageinfo", { id: this.village_id }).then(
        (info) => {
          this.info = info;

            this.img =this.uploadpath + "village/" + this.info.villageimg;

          
        }
      );
    });
  },
  methods: {},
};
</script>
<style scoped>
div {
  font-size: 36px;
  color: white;
}

.small_block2 {
  width: 100%;

  background: #2b8bda27;
  border: 1px solid #00f6ff;
  border-radius: 10px;
}
</style>