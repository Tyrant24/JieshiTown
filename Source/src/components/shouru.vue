<template>
  <div class="padding-3x">
    <div class="small_block2" style="position: relative; height: 900px">
      <div class="flex-row flex-center margin" style="margin-bottom: 0">
        <img :src="circular" class="icon-10" />
        <div class="margin-left-1x h3 f-g">家庭收入年度统计</div>
      </div>

      <div id="shouru" style="width: 100%; height: 90%;margin-top:30px"></div>

      <div class="flex-row checkblock">
        <div class="nianlin2 h5" @click="checkyear('A')">上半年</div>
        <div class="nianlin2 h5 margin-left" @click="checkyear('B')">
          下半年
        </div>
      </div>
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
    HttpHelper.Post("member/info", {}).then((Member) => {
      this.village_id = Member.village_id;

      this.alllist();
    });
  },
  methods: {
    checkyear(type) {
      this.panduan = type;

      this.shouru();
    },

    shouru() {
      HttpHelper.Post("member/info", {}).then((Member) => {
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var yuefen = [];
        HttpHelper.Post("village/shouru", {
          village_id: Member.village_id,
        }).then((shouru) => {
          if (this.panduan == "B") {
            for (var i = 0; i < shouru.length; i++) {
              if (i > 5) {
                data1.push(Number(shouru[i].jiaqin));
                data2.push(Number(shouru[i].nongzuowu));
                data3.push(Number(shouru[i].other));
                yuefen.push(shouru[i].month_name);
              }
            }
          } else {
            for (var i = 0; i < shouru.length; i++) {
              if (i <= 5) {
                data1.push(Number(shouru[i].jiaqin));
                data2.push(Number(shouru[i].nongzuowu));
                data3.push(Number(shouru[i].other));
                yuefen.push(shouru[i].month_name);
              }
            }
          }

          var shouru = this.$echarts.init(document.getElementById("shouru"));

          shouru.setOption({
            legend: {
              // orient: "vertical",
              right: 20,
              top: 30,
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
              top: 130,
              x: 110,
              x2: 60,
              y2: 60,
            },

            tooltip: {
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
              },
            },
            // dataset: {
            //   source: [
            //     ["product", "家禽", "农作物", "其他"],
            //     ["一月", 43.3, 85.8, 93.7],
            //     ["二月", 83.1, 73.4, 55.1],
            //     ["三月", 86.4, 65.2, 82.5],
            //     ["四月", 72.4, 53.9, 39.1],
            //     ["五月", 86.4, 65.2, 82.5],
            //     ["六月", 86.4, 65.2, 82.5],
            //   ],
            // },
            xAxis: {
              type: "category",
              data: yuefen,
              axisTick: {
                //刻度
                show: false,
                alignWithLabel: true,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#E6E6E6", 
                fontSize:24,
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "white",
                },
              },
            },
            yAxis: {
              name: "单位：万",
              nameTextStyle: {
                color: "#FEFEFE",
                fontSize:24
              },
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

            series: [
              {
                type: "bar",
                name: "家禽",
                data: data1,
                barWidth: 10,
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
              },
              {
                type: "bar",
                name: "农作物",
                data: data2,
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: [20, 20, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      //柱状图颜色渐变
                      { offset: 0, color: "#39F8BB" },
                      { offset: 0.5, color: "#03AF18" },
                      { offset: 1, color: "#03AF18" },
                    ]),
                  },
                },
              },
              {
                type: "bar",
                name: "其他",
                data: data3,
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: [20, 20, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      //柱状图颜色渐变
                      { offset: 0, color: "#FFEB70" },
                      { offset: 0.5, color: "#E69201" },
                      { offset: 1, color: "#E69201" },
                    ]),
                  },
                },
              },
            ],
          });
        });
      });
    },

    alllist() {
      HttpHelper.Post("village/shouru", { village_id: this.village_id }).then(
        (shouru) => {
          this.shouruinfo = shouru;
          console.log(this.shouruinfo, "--收入");
        }
      );
    },
  },
  mounted() {
    this.shouru();
  },
};
</script>
<style scoped>
.checkblock {
  position: absolute;
  top: 10%;
  left: 30px;
  z-index: 10;
}
div {
  font-size: 36px;
  color: white;
}
.nianlin2 {
  width: 120px;
  text-align: center;
  padding: 8px 0 8px 0;
  border: 1px solid #88fffe;
  border-radius: 10px 0px 10px 0px;
  background: #84abff27;
}
</style>