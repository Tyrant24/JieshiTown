<template>
  <div class="padding-3x">
    <div class="small_block2">
      <div class="margin-3x">
        <div class="flex-row flex-center">
          <img :src="circular" class="icon-10" />
          <div class="margin-left-1x h3 f-g">种养殖数据预警</div>
        </div>

        <div class="flex-row flex-center h7 f-g padding_1 margin-top-1x">
          <div class="flex-1">种养类型</div>
          <div class="flex-1 text-center">饱和数据</div>
          <div class="flex-1 text-center">实际数据</div>
          <div class="flex-1 text-right">增长率</div>
        </div>

        <div class="block_1">
          <div
            class="flex-row flex-center h7 f-g padding_1"
            v-for="(item, index) of zhongyanglist"
            :key="index"
          >
            <div class="flex-1">{{ item.type }}</div>
            <div class="flex-1 text-center">{{ item.baohe }}亩</div>
            <div class="flex-1 text-center">{{ item.shiji }}亩</div>
            <div class="flex-1 text-right">
              {{ item.isadd_value == "Y" ? "↑" : "↓" }}
              {{ item.zengzhang }}%
            </div>
          </div>
        </div>
      </div>
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

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      village_id: "",
      zhongyanglist: [],
      circular: require("@/assets/circular.png"),
      back: require("@/assets/back.png"),
    };
  },
  created() {
    PageHelper.Init(this);

    HttpHelper.Post("member/info", {}).then((Member) => {
      console.log(Member.id, "当前的ID");

      if (Member.admin_value == "N") {
        this.allvillage = this.uploadpath + "village/" + Member.village_map;
      } else {
        this.allvillage = this.uploadpath + "resource/" + PageHelper.Res.map1;
      }

      this.village_id = Member.village_id;

      this.alllist();
    });
  },
  methods: {
    alllist() {
      HttpHelper.Post("village/zhongyanglist", {
        village_id: this.village_id,
      }).then((zhongyanglist) => {
        this.zhongyanglist = zhongyanglist;
        console.log(this.zhongyanglist, "--种养殖数据");
      });
    },
  },
};
</script>
<style scoped>
div {
  font-size: 36px;
}
.padding_1 {
  padding: 16px 5px 16px 5px;
}
.border-de {
  border-top: 1px dashed #00f6ff;
}
.block_1 {
  border-top: 1px solid #00f6ff;
  border-bottom: 1px solid #00f6ff;
}
</style>