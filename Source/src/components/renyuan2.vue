<template>
  <div class="padding-3x">
    <div class="small_block2" style="position: relative; height: 900px">
      <div class="flex-row flex-center margin" style="margin-bottom: 0">
        <img :src="circular" class="icon-10" />
        <div class="margin-left-1x h3 f-g">人员结构</div>
      </div>

<div class="flex-row flex-center " style="height:86%">

      <div style="height: 100%" class="flex-1" id="yicunyipin"></div>

     <div style="height: 100%"  class="flex-1" id="yicunyipin2"></div>  

</div>


      <!-- <div class="zuowu">
        <div class="zuowu_1 text-center">
          <div class="h4 margin-top-1x">果蔬作物占地</div>
          <div class="h4">84120亩</div>
        </div>

        <div class="zuowu_1 text-center margin-top">
          <div class="h4 margin-top-1x">本年度增长</div>
          <div class="h4">84120亩</div>
        </div>
      </div> -->
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
      bili1: 0,
      bili2: 0,
      bili3: 0,
      bili4: 0,
      bili5: 0,
      bili6: 0,
      bili7: 0,
      bili8: 0,
    //   renyuanjiegou: [],
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
 
    });
  },
  methods: {
    yicunyipin() {
      HttpHelper.Post("member/info", {}).then((Member) => {
         

     HttpHelper.Post("village/renyuanjiegou", {
        village_id: this.village_id,
      }).then((renyuanjiegou) => {
        var renyuanjiegou = renyuanjiegou[0];

        // this.bili1 = parseInt(
        //   (Number(renyuanjiegou.number1) / renyuanjiegou.zongshu) *
        //     100
        // );
        // this.bili2 = parseInt(
        //   (Number(renyuanjiegou.number2) / renyuanjiegou.zongshu) *
        //     100
        // );
        // this.bili3 = parseInt(
        //   (Number(renyuanjiegou.number3) / renyuanjiegou.zongshu) *
        //     100
        // );
        // this.bili4 = parseInt(
        //   (Number(renyuanjiegou.number4) / renyuanjiegou.zongshu) *
        //     100
        // );
         
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
              bottom: 0,
              itemWidth: 30,
              itemHeight: 30,
              width: 800,
              itemGap: 20,
              selectedMode: false,
              textStyle: {
                color: "white",
                fontSize: 30,
              },
            },
            series: [
              {
                name: "数量占比",
                type: "pie",
                center: ["50%", "40%"],
                radius: ["46%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "36",
                    color: "#E6E6E6",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [{
                    value:renyuanjiegou.number1,
                    name:'35岁以下'
                },{
                    value:renyuanjiegou.number2,
                    name:'35~45岁'
                },{
                    value:renyuanjiegou.number3,
                    name:'46~55岁'
                },{
                    value:renyuanjiegou.number4,
                    name:'55岁以上'
                }],
              },
            ],
          });
        });
      });
    },

    yicunyipin2() {
      HttpHelper.Post("member/info", {}).then((Member) => {
         

     HttpHelper.Post("village/renyuanjiegou", {
        village_id: Member.village_id,
      }).then((renyuanjiegou) => {
        var renyuanjiegou = renyuanjiegou[0];

        console.log(renyuanjiegou,'人员结构')
 
        // this.bili5 = parseInt(
        //   (Number(renyuanjiegou.number5) / renyuanjiegou.zongshu) *
        //     100
        // );
        // this.bili6 = parseInt(
        //   (Number(renyuanjiegou.number6) / renyuanjiegou.zongshu) *
        //     100
        // );
        // this.bili7 = parseInt(
        //   (Number(renyuanjiegou.number7) / renyuanjiegou.zongshu) *
        //     100
        // );
        // this.bili8 = parseInt(
        //   (Number(renyuanjiegou.number8) / renyuanjiegou.zongshu) *
        //     100
        // );

        console.log("这个多少人",this.bili5)

       
          var yicunyipin2 = this.$echarts.init(
            document.getElementById("yicunyipin2")
          );
          yicunyipin2.setOption({
               tooltip: {
           trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
            legend: {
              // orient: "vertical",
              left: 50,
              bottom: 0,
              itemWidth: 30,
              itemHeight: 30,
              width: 800,
              itemGap: 20,
              selectedMode: false,
              textStyle: {
                color: "white",
                fontSize: 30,
              },
            },
            series: [
              {
                name: "数量占比",
                type: "pie",
                center: ["50%", "40%"],
                radius: ["46%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "36",
                    color: "#E6E6E6",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [{
                    value:renyuanjiegou.number5,
                    name:'孤寡老人'
                },{
                    value:renyuanjiegou.number6,
                    name:'留守儿童'
                },{
                    value:renyuanjiegou.number7,
                    name:'贫困家庭'
                },{
                    value:renyuanjiegou.number8,
                    name:'残疾人群'
                }],
              },
            ],
          });
        });
      });
    },

      

    
  },
  mounted() {
    this.yicunyipin();
    this.yicunyipin2();
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