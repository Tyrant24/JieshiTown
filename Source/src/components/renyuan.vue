 <template>
 <div class="padding-3x">
  <div
    class="mid_under_block padding margin-right margin-left-1x flex-1"
    style="position: relative; height: 900px"
  >
    <div class="h2" style="color: #ffde00">帮助扶贫</div>

    <div class="flex-row">
      <div class="flex-1 flex-row flex-column">
        <div class="fupin padding-05x margin-top-3x text-center">
          <div class="h3">已办理完成人数</div>
          <div class="h3" style="color: #ffde00">
            {{ fupininfo.yiban }}人<span class="h3">(0.8%)</span>
          </div>
        </div>

        <div class="padding-05x h4 manyidu margin-top">满意度统计</div>

        <div style="width: 500px; height: 600px">
          <div id="fupin" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="flex-1 flex-row flex-column">
        <div class="fupin padding-05x margin-top-3x text-center">
          <div class="h3">未办理完成人数</div>
          <div class="h3" style="color: #f2784d">
            {{ fupininfo.weibanli }}人<span class="h3">(0.8%)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="renshu">
      <div class="margin-top-4x">当前等待人数 {{ fupininfo.dengdai }}人</div>
      <div class="margin-top">已办人数累计 {{ fupininfo.wanchen }}人</div>
      <div class="margin-top">已办业务累计 {{ fupininfo.yewu }}人</div>
      <div class="margin-top">机器运行状态 <span style="color:#F2784D">{{ fupininfo.yunxing_name }}</span></div>
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
      jiaqininfo: [],
            fupininfo: [],
      circular: require("@/assets/circular.png"),
      back:require("@/assets/back.png"),
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
    fupin() {
      HttpHelper.Post("member/info", {}).then((Member) => {
        HttpHelper.Post("village/fupin", {
          village_id: Member.village_id,
        }).then((fupin) => {
          var manyi = Number(fupin[0].manyi);
          var bumanyi = Number(fupin[0].bumanyi);
          var weipinjia = Number(fupin[0].weipinjia);

          var fupin = this.$echarts.init(document.getElementById("fupin"));
          fupin.setOption({
            // tooltip: {
            //   trigger: "item",
            //   formatter: "{a} <br/>{b}: {c} ({d}%)",
            // },
            legend: {
              // orient: "vertical",
              left: 80,
              bottom: 0,
              itemWidth: 24,
              itemHeight: 24,
              width: 400,
              itemGap: 30,
              selectedMode: false,
              textStyle: {
                color: "white",
                fontSize: 24,
              },
              // data: ["满意", "不满意", "未评价"],
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                center: ["50%", "40%"],
                radius: ["36%", "66%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },

                itemStyle: {
                  normal: {
                    color: function (params) {
                      //自定义颜色
                      var colorList = ["#2E4EFF", "#F2784D", "#FFDE00"];
                      return colorList[params.dataIndex];
                    },
                  },

                  emphasis: {
                    shadowBlur: 10,

                    shadowOffsetX: 0,

                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "24",
                    color: "#E6E6E6",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [
                  { value: manyi, name: "满意" },
                  { value: bumanyi, name: "不满意" },
                  { value: weipinjia, name: "未评价" },
                ],
              },
            ],
          });
        });
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
    this.fupin();
  },
};
</script>
<style scoped>
div {
  font-size: 36px;
  color: white;
}
.mid_under_block {
  background: #afc7fc28;
  border-radius: 10px;
  border: 1px solid white;
  /* width: 450px;
  height: 308px; */
}
.renshu {
  position: absolute;
  z-index: 10;
  right: 17%;
  top: 20%;
}
.nianlin {
  width: 150px;
  text-align: center;
  border: 1px solid #88fffe;
  padding: 8px 0 8px 0;
  border-radius: 10px 0px 10px 0px;
  background: #84abff27;
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