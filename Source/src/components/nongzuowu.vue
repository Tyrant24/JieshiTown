<template>
  <div class="padding-3x">
    <div class="small_block2" style="position: relative; height: 900px">
      <div class="flex-row flex-center margin" style="margin-bottom: 0">
        <img :src="circular" class="icon-10" />
        <div class="margin-left-1x h3 f-g">农作物种类</div>
      </div>

      <div style="height: 86%" id="yicunyipin"></div>

      <div class="zuowu">
        <div class="zuowu_1 text-center">
          <div class="h4 margin-top-1x">{{ checkname }}作物占地</div>
          <div class="h4">{{ zhandi }}亩</div>
        </div>

        <div class="zuowu_1 text-center margin-top">
          <div class="h4 margin-top-1x">本年度增长</div>
          <div class="h4">{{ nianzeng }}亩</div>
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
      nongzuowu: [],
      zhandi: "",
      nianzeng: "",
      checkname: "",
      circular: require("@/assets/circular.png"),
      back: require("@/assets/back.png"),
      village_id: "",
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
    yicunyipin() {
      HttpHelper.Post("member/info", {}).then((Member) => {
        var data = [];
        HttpHelper.Post("village/nongzuowu", {
          village_id: Member.village_id,
        }).then((nongzuowu) => {
          console.log(nongzuowu, "看看");
          this.nongzuowu = nongzuowu;

          this.zhandi = this.nongzuowu[0].zhandi;
          this.nianzeng = this.nongzuowu[0].thisyear;
          this.checkname = this.nongzuowu[0].type_name;
          for (var i = 0; i < nongzuowu.length; i++) {
            data.push({
              value: nongzuowu[i].zhandi,
              name: nongzuowu[i].type_name,
            });
          }
          console.log(data, "看看");

          var yicunyipin = this.$echarts.init(
            document.getElementById("yicunyipin")
          );
          yicunyipin.setOption({
              tooltip: {
           trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
            legend: {
              // orient: "vertical",
              left: 50,
              bottom: 20,
              itemWidth: 10,
              itemHeight: 10,
              width: 400,
              itemGap: 20,
              selectedMode: false,
              textStyle: {
                color: "white",
                fontSize: 13,
              },
            },
            series: [
              {
                name: "数量占比",
                type: "pie",
                center: ["35%", "40%"],
                radius: ["46%", "66%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "20",
                    color: "#E6E6E6",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: data,
              },
            ],
          });

          yicunyipin.on("click", this.pieConsole);
        });
      });
    },

    pieConsole(param) {
      console.log(param.dataIndex, "看看");
      this.zhandi = this.nongzuowu[param.dataIndex].zhandi;
      this.nianzeng = this.nongzuowu[param.dataIndex].thisyear;
      this.checkname = this.nongzuowu[param.dataIndex].type_name;
    },
    alllist() {
      HttpHelper.Post("village/nongzuowu", {
        village_id: this.village_id,
      }).then((nongzuowu) => {
        this.nongzuowu = nongzuowu;
        console.log(this.nongzuowu, "--农作物");
      });
    },
  },
  mounted() {
    this.yicunyipin();
  },
};
</script>
<style scoped>
div {
  font-size: 36px;
  color: white;
}
.zuowu {
  position: absolute;
  right: 50px;
  top: 100px;
}
.zuowu_1 {
  border: 1px solid #00f6ff;
  border-radius: 10px 0px 10px 0px;
  background: #00f7ff2d;
  width: 390px;
  height: 120px;
}
</style>