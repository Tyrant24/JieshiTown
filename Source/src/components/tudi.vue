<template>
  <div class="padding-3x">
    <div class="small_block2" style="position: relative; height: 900px">
      <div class="flex-row flex-center margin" style="margin-bottom: 0">
        <img :src="circular" class="icon-10" />
        <div class="margin-left-1x h3 f-g">土地使用面积</div>
      </div>

      <div id="tudi" style="width: 100%; height: 90%;margin-top:30px"></div>

      
    </div>
<div class=" padding-top icon_back"> 
      <img :src="back" class="icon-3x"  @click="goBack" >
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
      back:require("@/assets/back.png"),
      village_id: "",
      panduan: "A",
    };
  },
  created() {
    PageHelper.Init(this);
    // HttpHelper.Post("member/info", {}).then((Member) => {
    //   this.village_id = Member.village_id;

    //   this.alllist();
    // });
  },
  methods: {
    checkyear(type) {
      this.panduan = type;

      this.shouru();
    },

    tudi() {

        HttpHelper.Post("member/info", {}).then((Member) => {
      var year = [];
      var data1 = [];
      var data2 = [];
      var data3 = [];
      HttpHelper.Post("village/tudi", {village_id:Member.village_id}).then((tudi) => {
        for (var i = 0; i < tudi.length; i++) {
          data1.push(Number(tudi[i].gengdi));
          data2.push(Number(tudi[i].zhongzhidi));
          data3.push(Number(tudi[i].tudi));
          year.push(tudi[i].year);
        }

        console.log(data3, "土地三");

        var tudi = this.$echarts.init(document.getElementById("tudi"));
        tudi.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          legend: {
            data: ["耕地面积", "种植地面积", "土地变动"],
            // orient: "vertical",
            right: 20,
            top: 0,
            // bottom: 0,
            itemWidth: 24,
            itemHeight: 24,
            // width: 200,
            // itemGap: 15,
            selectedMode: false,
            textStyle: {
              color: "white",
              fontSize: 24,
            },
          },
          grid: {
            top: 100,
            x: 20,
            x2: 20,
            y2: 20,
            containLabel: true,
          },

          // legend: {
          //     data: ['耕地面积', '种植地面积', '土地变动']
          // },
          xAxis: [
            {
              type: "category",
              data: year,
              axisPointer: {
                type: "shadow",
              },
              axisTick: {
                //刻度
                show: false,
                alignWithLabel: true,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#E6E6E6",
                  fontSize:24
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "white",
                },
              },
            },
          ],

          yAxis: [
            {
              type: "value",
              name: "单位：万平米",
              nameTextStyle: {
                color: "#FEFEFE",
                fontSize:24
              },
              min: 0,
              max: 10000,
              interval: 2000,
              axisLabel: {
                show: true,
                textStyle: {
                  color: "white",
                  fontSize:24
                },
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "white",
                  type: "dashed",
                  width: 1,
                },
              },
            },
            {
              type: "value",
              name: "单位：%",
              nameTextStyle: {
                color: "#FEFEFE",
                fontSize:24
              },
              min: 0,
              max: 100,
              interval: 20,
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#E6E6E6",
                  fontSize:24
                },
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "white",
                  type: "dashed",
                  width: 1,
                },
              },
            },
          ],
          series: [
            {
              name: "耕地面积",
              type: "bar",
              barWidth: 30,
              itemStyle: {
                normal: {
                  barBorderRadius: [20, 20, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //柱状图颜色渐变
                    { offset: 0, color: "#F388EF" },
                    { offset: 0.5, color: "#8A31F8" },
                    { offset: 1, color: "#8A31F8" },
                  ]),
                },
              },
              data: data1,
            },
            {
              name: "种植地面积",
              type: "bar",
              barWidth: 30,
              itemStyle: {
                normal: {
                  barBorderRadius: [20, 20, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //柱状图颜色渐变
                    { offset: 0, color: "#55CFFF" },
                    { offset: 0.5, color: "#2E4EFF" },
                    { offset: 1, color: "#2E4EFF" },
                  ]),
                },
              },
              data: data2,
            },

            {
              name: "土地变动",
              type: "line",
              symbolSize: 12,
              color: ["#03AF18"],
              yAxisIndex: 1,
              data: data3,
            },
          ],
        });
      });
  
        })
  
  },

    // alllist() {
    //   HttpHelper.Post("village/shouru", { village_id: this.village_id }).then(
    //     (shouru) => {
    //       this.shouruinfo = shouru;
    //       console.log(this.shouruinfo, "--收入");
    //     }
    //   );
    // },
  },
  mounted() {
    this.tudi();
  },
};
</script>
<style scoped>
 
div {
  font-size: 36px;
  color: white;
}
 
</style>