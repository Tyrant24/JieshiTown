<template>
  <div class="padding-3x">
    <!-- <div
      class="mid_under_block padding margin-right margin-left-1x flex-1"
      style="position: relative; height: 900px"
    >
      <div class="h2" style="color: #ffde00">帮助扶贫</div>

      <div class="flex-row">
        <div class="flex-1 flex-row flex-column">
          <div class="fupin padding-05x margin-top-3x text-center">
            <div class="h3">已办理完成人数</div>
            <div class="h3" style="color: #ffde00">
              {{ fupininfo.yiban }}人<span class="h6">(0.8%)</span>
            </div>
          </div>

          <div class="padding-05x h4 manyidu margin-top">满意度统计</div>
 

          <div style="width:500px; height: 600px">
            <div id="fupin" style="width: 100%; height: 100%"></div>
          </div>
        </div>

        <div class="flex-1 flex-row flex-column">
          <div class="fupin padding-05x margin-top-3x text-center">
            <div class="h3">未办理完成人数</div>
            <div class="h3" style="color: #f2784d">
              {{ fupininfo.weibanli }}人<span class="h6">(0.8%)</span>
            </div>
          </div>
 
        </div>
      </div>

      <div class="renshu">
        <div class="margin-top-4x">当前等待人数 {{ fupininfo.dengdai }}人</div>
        <div class="margin-top">已办人数累计 {{ fupininfo.wanchen }}人</div>
        <div class="margin-top">已办业务累计 {{ fupininfo.yewu }}人</div>
        <div class="margin-top">机器运行状态 {{ fupininfo.yunxing_name }}</div>
      </div>
    </div> -->

    <div class="small_block2" style="position: relative; height: 900px">
      <div class="flex-row flex-center margin" style="margin-bottom: 0">
        <img :src="circular" class="icon-10" />
        <div class="margin-left-1x h3 f-g">家禽养殖分析</div>
      </div>

      <div class="bili margin-left-4x margin-top">家禽增长比例</div>

      <div class="bili2">
        <div class="bili">家禽增长数量分析</div>
        <div class="bili margin-top">
          NO.1 牛 <span class="f-r">{{ jiaqininfo.niu }}↑</span>
        </div>
        <div class="bili margin-top">
          NO.2 羊 <span class="f-r">{{ jiaqininfo.yang }}↑</span>
        </div>
        <div class="bili margin-top">
          NO.3 猪 <span class="f-r">{{ jiaqininfo.zhu }}↑</span>
        </div>
        <div class="bili margin-top">
          NO.4 鸡 <span class="f-r">{{ jiaqininfo.ji }}↑</span>
        </div>
        <div class="bili margin-top">
          NO.5 其他 <span class="f-r">{{ jiaqininfo.qita }}↑</span>
        </div>
      </div>

      <div id="jiaqin" style="width: 900px; height: 500px"></div>
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
      jiaqininfo: [],
      circular: require("@/assets/circular.png"),
      back: require("@/assets/back.png"),
      village_id: "",
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
    jiaqin() {
      var dataBJ = [[1, 120]];
      var dataGZ = [[130, 230]];
      var dataSH = [[210, 140]];
      var dataSH2 = [[106, 100]];
      var dataSH3 = [[250, 160]];

      HttpHelper.Post("member/info", {}).then((Member) => {
        HttpHelper.Post("village/jiaqin", {
          village_id: Member.village_id,
        }).then((jiaqin) => {
          this.jiaqininfo = jiaqin[0];
          console.log(jiaqin, "--收入");
        });
      });
      // var schema = [{ name: "date", index: 0, text: "日" }];

      var itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      };

      var jiaqin = this.$echarts.init(document.getElementById("jiaqin"));

      jiaqin.setOption({
        // backgroundColor: "#404a59",
        color: ["#10A0E3", "#F2784D", "#2E4EFF", "#D7CB06", "#8A31F8"],

        grid: {
          left: 160,
          right: 240,
          top: 170,
          bottom: 30,
        },

        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            symbolSize: 200,
            name: "牛",
            type: "scatter",
            itemStyle: itemStyle,
            emphasis: {
              label: {
                show: true,
                color: "white",
                fontSize: 34,
                formatter: function (param) {
                  return "牛";
                },
                position: "top",
              },
            },
            data: dataBJ,
          },
          {
            symbolSize: 160,
            name: "羊",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
                fontSize: 34,
                formatter: function (param) {
                  return "羊";
                },
                position: "top",
              },
            },
            itemStyle: itemStyle,
            data: dataSH2,
          },
          {
            symbolSize: 200,
            name: "猪",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
                fontSize: 34,
                formatter: function (param) {
                  return "猪";
                },
                position: "top",
              },
            },
            itemStyle: itemStyle,
            data: dataSH3,
          },
          {
            symbolSize: 160,
            name: "鸡",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
                fontSize: 34,
                formatter: function (param) {
                  return "鸡";
                },
                position: "top",
              },
            },
            itemStyle: itemStyle,
            data: dataSH,
          },
          {
            symbolSize: 170,
            name: "其他",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
                fontSize: 34,
                formatter: function (param) {
                  return "其他";
                },
                position: "top",
              },
            },
            itemStyle: itemStyle,
            data: dataGZ,
          },
        ],
      });
    },

    alllist() {
      HttpHelper.Post("village/fupin", { village_id: this.village_id }).then(
        (fupin) => {
          this.fupininfo = fupin[0];
          console.log(this.fupininfo, "--帮助扶贫");
        }
      );
    },
  },
  mounted() {
    this.jiaqin();
  },
};
</script>
<style scoped>
div {
  font-size: 36px;
  color: white;
}

.bili {
  width: 320px;
  text-align: center;
  padding: 8px 0 8px 0;
  border: 1px solid #88fffe;
  border-radius: 10px 0px 10px 0px;
  background: #88fffd1a;
}
.bili2 {
  position: absolute;
  z-index: 10;
  right: 50px;
  top: 70px;
}
</style>