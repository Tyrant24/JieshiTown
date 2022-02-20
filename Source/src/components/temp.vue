<template>
  <div>
    <div class="flex-row flex-center margin-3x padding bg" style="">
      <div class="padding flex-1 text-center">
        <div class="f-w f28">总人口数</div>
        <div class="txt-y">{{ fupininfo.zongpinkun }}人</div>
      </div>

      <div class="padding flex-1 text-center">
        <div class="f-w f28">已帮扶救助资金</div>
        <div class="txt-y">{{ fupininfo.bangfuzijin }}元</div>
      </div>

      <div class="padding flex-1 text-center">
        <div class="f-w f28">总贫困户</div>
        <div class="txt-y">{{ fupininfo.pinkunhu }}户</div>
      </div>

      <div class="padding flex-1 text-center">
        <div class="f-w f28">总贫困人数</div>
        <div class="txt-y">{{ fupininfo.pinkunshu }}人</div>
      </div>

      <div class="padding flex-1 text-center">
        <div class="f-w f28">帮扶救助总人数</div>
        <div class="txt-y">{{ fupininfo.bangfuzongshu }}人</div>
      </div>
    </div>

    <div class="flex-row margin-3x">
      <div class="left bg padding-3x f20 f-w bold">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @statechanged="playerStateChanged($event)"
          @ready="playerReadied"
        >
        </video-player>

        <div class="margin-top">最新资讯</div>
        <div class="margin-top" style="font-size: 24px;height: 60px; overflow: auto">
          {{ fupininfo.titile }}
        </div>
        <vue-seamless-scroll
          style="height: 400px; overflow: auto"
          class="margin-top"
          :data="fupininfo.zixun"
        >
          <!-- style="height: 460px; overflow: auto" -->
          <div class="h3">
            {{ fupininfo.zixun }}
          </div>
        </vue-seamless-scroll>
      </div>

      <div
        class="right bg margin-left padding"
        v-if="Member.admin_value == 'N'"
      >
        <div class="f20 f-w bold">各村帮扶救助统计</div>

        <div class="flex-row flex-center" style="width: 100%">
          <div class="flex-1"></div>
          <div class="h2 f-max">行政村</div>
          <div class="flex-1"></div>
          <div class="h2 f-max">户主姓名</div>
          <div class="flex-1"></div>
          <div class="h2 f-max">贫困人数</div>
          <div class="flex-1"></div>
          <div class="h2 f-max">
            <div>是否退出</div>
            <div>相对困难户</div>
          </div>
          <div class="flex-1"></div>
          <div class="h2 f-max">姓名</div>
          <div class="flex-1"></div>
          <div class="h2 f-max">与户主关系</div>
          <div class="flex-1"></div>
          <div class="h2 f-max">
            <div>务工企业</div>
            <div>名称</div>
          </div>
          <div class="flex-1"></div>
          <div class="h2 f-max">
            <div>务工所在</div>
            <div>省市</div>
          </div>
          <div class="flex-1"></div>
          <div class="h2 f-max">
            <div>帮扶干部</div>
            <div>姓名</div>
          </div>
          <div class="flex-1"></div>
          <div class="h2 f-max">
            <div>帮扶干部</div>
            <div>职称</div>
          </div>
          <div class="flex-1"></div>
          <div class="h2 f-max">
            <div>帮扶干部</div>
            <div>单位</div>
          </div>
          <div class="flex-1"></div>
        </div>

        <div class="margin-top">
          <vue-seamless-scroll class="seamless-warp" :data="bangfulist">
            <div
              class="flex-row flex-center margin-top"
              style="width: 100%"
              v-for="(item, index) of bangfulist"
              :key="index"
            >
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.village_name }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.huzhuname }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.pinkunshu }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.ispinkun }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.name }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.guanxi }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.qiye }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.chenshi }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.ganbu }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.zhiwu }}</div>
              <div class="flex-1"></div>
              <div class="h2 f-max">{{ item.danwei }}</div>
              <div class="flex-1"></div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>

      <div
        v-if="Member.admin_value=='Y'"
        class="mid_under_block padding margin-right margin-left-1x flex-1"
        style="position: relative; height: 770px"
      >
        <div class="f20" style="color: #ffde00">帮助扶贫</div>

        <div class="flex-row">
          <div class="flex-1 flex-row flex-column">
            <div class="fupin padding-05x margin-top-3x text-center">
              <div class="f20">已办理完成人数</div>
              <div class="f20" style="color: #ffde00">
                {{ fupininfo.yiban }}人<span class="h3">(0.8%)</span>
              </div>
            </div>

            <div class="padding-05x manyidu margin-top f20">满意度统计</div>

            <div style="width: 500px; height: 600px">
              <div id="fupin" style="width: 100%; height: 100%"></div>
            </div>
          </div>

          <div class="flex-1 flex-row flex-column">
            <div class="fupin padding-05x margin-top-3x text-center">
              <div class="f20">未办理完成人数</div>
              <div class="f20" style="color: #f2784d">
                {{ fupininfo.weibanli }}人<span class="h3">(0.8%)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="renshu f20">
          <div class="margin-top-4x">
            当前等待人数 {{ fupininfo.dengdai }}人
          </div>
          <div class="margin-top">已办人数累计 {{ fupininfo.wanchen }}人</div>
          <div class="margin-top">已办业务累计 {{ fupininfo.yewu }}人</div>
          <div class="margin-top">
            机器运行状态
            <span style="color: #f2784d">{{ fupininfo.yunxing_name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="padding-top icon_back margin-left-3x">
      <img :src="back" class="icon-3x" @click="goBack" />
    </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";
import infiniteScroll from "vue-infinite-scroll";

// Vue.use(vueiInfinite)

//"infinite-scroll": "./packages/infinite-scroll/index.js",

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      count: 0,
      data: [],
      busy: false,
      fupininfo: [],
      bangfulist: [],
      allvillage: require("@/assets/allvillage.png"),
      back: require("@/assets/back.png"),
      villagelist: [],
      playerOptions: {},
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    this.loadMore();
  },
  methods: {
    onLive(video, img) {
      this.playerOptions = {
        playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: video, // url地址
          },
        ],
        poster: img, // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      };
    },
    optionHover() {
      return {
        hoverStop: false,
      };
    },

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
              bottom: 40,
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

    loadMore() {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0, j = 50; i < j; i++) {
          this.data.push({ name: this.count++ });
        }
        console.log(this.data);
        this.busy = false;
      }, 1000);
    },

    check(index) {
      console.log("点击此处", index);
      var img = this.uploadpath + "village/" + this.villagelist[index].map;

      console.log(img);
      // return;
      document.getElementById("headerImg").src = img;
    },

    // 播放回调
    onPlayerPlay(player) {
      console.log("player play!");
    },
    // 暂停回调
    onPlayerPause(player) {
      console.log("player pause!");
    },
    // 视频播完回调
    onPlayerEnded($event) {
      console.log(player);
    },
    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting($event) {},
    // 已开始播放回调
    onPlayerPlaying($event) {},
    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {},
    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate($event) {},
    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },
    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      console.log("example player 1 readied");
    },
  },
  mounted() {
    HttpHelper.Post("member/info", {}).then((Member) => {
      if (Member.admin_value == "Y") {
        var village_id = "";
      } else {
        var village_id = Member.village_id;
      }
      console.log(village_id, "当前ID");

      HttpHelper.Post("village/fupin", { village_id: village_id }).then(
        (fupin) => {
          this.fupininfo = fupin[0];
          var video = this.uploadpath + "fupin/" + this.fupininfo.video;
          var img = this.uploadpath + "fupin/" + this.fupininfo.img;
          this.onLive(video, img);
          console.log(this.fupininfo, "--帮助扶贫");
          console.log(this.uploadpath + "fupin/" + this.fupininfo.video);
        }
      );

      HttpHelper.Post("village/bangfulist", {
        village_id: village_id,
      }).then((bangfulist) => {
        this.bangfulist = bangfulist;
      });
    });

    this.fupin();
  },
};
</script>
<style scoped>
div {
  color: white;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.btn {
  padding: 20px 60px 20px 60px;
  color: white;
  font-size: 30px;
  background: transparent;
  border-radius: 10px;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
.seamless-warp {
  height: 900px;
  overflow: hidden;
}

.f-max {
  width: 140px;
  text-align: center;
}
.bg {
  background: #afc7fc28;
  border-radius: 10px;
}
.left {
  width: 20%;
  height: 1050px;
}
.right {
  width: 80%;
}
.img {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  width: 700px;
  height: 940px;
}
.f28 {
  font-size: 32px;

  font-weight: bold;
}
.txt-y {
  color: #ffcc00;
  font-weight: bold;
  font-size: 36px;
  margin-top: 10px;
}
.f20 {
  font-size: 36px;
}
.f24 {
  font-size: 24px;
}

.mid_under_block {
  background: #afc7fc28;
  border-radius: 10px;
  /* border: 1px solid white; */
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