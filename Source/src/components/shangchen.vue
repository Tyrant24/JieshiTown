<template>
  <div class="padding-3x">
    <div class="small_block2" style="height:900px">
      <!-- <div style="height:10%"></div> -->
      <div class="flex-row flex-center margin">
        <img :src="circular" class="icon-10" />
        <div class="margin-left-1x h3 f-g">一村一品商城分析</div>
      </div>
      <div style="height: 60%" id="myChart"></div>
      <div class="margin-top-1x">
        <div class="flex-row flex-center">
          <div class="flex-1"></div>
          <div class="fenxi_block text-center">
            <div class="h4 margin-top-1x">今日成交量</div>
            <div class="h4">{{ yicuntoday }}笔</div>
          </div>
          <div class="flex-1"></div>
          <div class="fenxi_block text-center">
            <div class="h4 margin-top-1x">本周成交量</div>
            <div class="h4">{{ yicunweek }}笔</div>
          </div>
          <div class="flex-1"></div>
          <div class="fenxi_block text-center">
            <div class="h4 margin-top-1x">本月成交量</div>
            <div class="h4">{{ yicunmonth }}笔</div>
          </div>
          <div class="flex-1"></div>
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

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      yicun: [],
      yicuntoday: 0,
      yicunweek: 0,
      yicunmonth: 0,
      circular: require("@/assets/circular.png"),
      back:require("@/assets/back.png"),
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
    alllist() {
      HttpHelper.Post("village/yicunyipin", {
        village_id: this.village_id,
      }).then((yicun) => {
        this.yicun = yicun;

        // this.yicuntoday
        for (var i = 0; i < yicun.length; i++) {
          this.yicuntoday += Number(yicun[i].today);
          this.yicunweek += Number(yicun[i].thisweek);
          this.yicunmonth += Number(yicun[i].thismonth);
        }

        console.log(this.yicun, "--一村一品");
      });
    },

    initCharts() {
      var data = [];
      var value = [];
      var sum = 0;

      HttpHelper.Post("member/info", {}).then((Member) => {
        HttpHelper.Post("village/yicunyipin", {
          village_id: Member.village_id,
        }).then((yicun) => {
          for (var i = 0; i < yicun.length; i++) {
            sum += Number(yicun[i].thismonth);
            value.push(Number(yicun[i].thismonth));
            data.push({
              text: yicun[i].type_name,
              max: sum,
            });
          }

          var myChart = this.$echarts.init(document.getElementById("myChart"));

          myChart.setOption({
            // title: {
            //   text: "多雷达图",
            // },

            tooltip: {
              trigger: "axis",
            },
            // legend: {
            //   left: "center",
            //   data: ["某软件", "某主食手机", "某水果手机", "降水量", "蒸发量"],
            // },

            color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#06B6F8", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#2E4EFF", // 100% 处的颜色
                  },
                ],
                global: false,
              },
            ],

            radar: [
              {
                indicator: data,
                splitLine: {
                  // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
                  lineStyle: {
                    color: "#2E4EFF",
                    // 分隔线颜色
                    width: 2,
                    // 分隔线线宽
                  },
                },
                name: { // (圆外的标签)雷达图每个指示器名称的配置项。
            formatter: '{value}',
            textStyle: {
                fontSize: 30,
                color: 'white'
            }
        },
                axisLine: { show: false },
                splitArea: {
                  show: false,
                },
                center: ["50%", "50%"],
                radius: 200,
              },
            ],
            series: [
              {
                type: "radar",
                tooltip: {
                  trigger: "item",
                },
                symbol: "none",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: "#2E4EFF", // 图表中各个图区域的边框线颜色
                    },
                  },
                },
                areaStyle: {},
                data: [
                  {
                    // value: [150, 280, 490, 0, 200],
                    value: value,
                    name: "统计",
                  },
                ],
              },
            ],
          });

          console.log(data, "出来吧", value);
        });
      });
    },
  },
  mounted() {
    this.initCharts();
  },
};
</script>
<style scoped>
div{
    font-size: 36px;
    color: white;
}
</style>