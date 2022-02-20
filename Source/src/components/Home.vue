<template>
  <div>
    <div style="height: 90vh; width: 100%">
      <div class="flex-row" style="height: 100%">
        <!-- Left Block -->
        <div class="left_block">
          <!-- 种养殖数据 -->
          <div class="small_block">
            <div class="margin">
              <div class="flex-row flex-center">
                <img :src="circular" class="icon-10" />
                <div class="margin-left-1x h3 f-g flex-1">种养殖数据预警</div>
                <div class="padding-1x h3 f-g" @click="routeto('/Zhongyang')">
                  详情
                </div>
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

          <!-- 一村一品商城分析 -->
          <div class="small_block">
            <!-- <div style="height:10%"></div> -->
            <div class="flex-row flex-center margin">
              <img :src="circular" class="icon-10" />
              <div class="margin-left-1x h3 f-g flex-1">一村一品商城分析</div>
              <div class="padding-1x h3 f-g" @click="routeto('/Shangchen')">
                详情
              </div>
            </div>
            <div style="height: 60%" id="myChart"></div>
            <div class=" ">
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

          <!-- 农作物种类 -->
          <div class="small_block" style="position: relative">
            <div class="flex-row flex-center margin" style="margin-bottom: 0">
              <img :src="circular" class="icon-10" />
              <div class="margin-left-1x h3 f-g flex-1">农作物种类</div>
              <div class="padding-1x h3 f-g" @click="routeto('/Nongzuowu')">
                详情
              </div>
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
        </div>

        <!-- Mid Block -->
        <div class="mid_block" :style="bgurl">
          <div class="text-center">
            <img
              :src="allvillage"
              border="0"
              id="headerImg"
              usemap="#planetmap"
              alt="Planets"
              class="img"
            />

            <map name="planetmap" id="planetmap">
              <area
                shape="poly"
                v-for="(item, index) of villagelist"
                :key="index"
                :coords="item.miaodian"
                @click="check(index)"
                alt="Sun"
              />

              <area
                shape="poly"
                coords="137,340,151,336,169,329,174,331,176,335,175,341,164,342,148,357"
                @click="showmap()"
              />
            </map>
          </div>

          <div v-if="xianshi == true">
            <div class="fangda h1">
              <img :src="big" alt="" class="bigimg" />
            </div>

            <div class="f1 padding-1x" @click="check2(17)">包一村</div>

            <div class="f2 padding-1x" @click="check2(18)">包二村</div>

            <div class="f3 padding-1x" @click="check2(19)">红卫村</div>
          </div>

          <div class="mid_1 margin-3x">
            <div class="flex-row flex-center">
              <img :src="circular" class="icon-10" />
              <div class="margin-left-1x h3 f-g">简介</div>
            </div>

            <div class="mid_1_block margin-top padding h4">
              <div class="chaochu" @click="routeto('/detail')">
                {{ Member.village_summary }}
              </div>
              <!-- <div class="flex-row flex-center">
                <div>
                  <img :src="circular" class="icon-10" /> 当月 系统入驻
                  {{ huizong.dangyueruzhu }}人
                </div>
                <div>当月 认证人口 {{ huizong.renkou }}人</div>
              </div>

              <div class="flex-row flex-center margin-top-1x">
                <div>
                  <img :src="circular" class="icon-10" /> 当月 系统覆盖
                  {{ huizong.fugaizhen }}镇
                </div>
                <div>当月 系统覆盖 {{ huizong.fugaicun }}村</div>
              </div> -->
            </div>
          </div>

          <div class="mid_2 text-center">
            <div class="nianlin">整体占比</div>

            <div class="" id="zhanbi" style="width: 100%; height: 100%"></div>
          </div>

          <div class="mid_3 text-center">
            <div class="nianlin">人口增长</div>

            <div class="" id="renkou" style="width: 100%; height: 80%"></div>
          </div>

          <div class="mid_4">
            <div class="topright">
              <div>农作物种植（亩）</div>

              <div class="flex-row flex-center">
                <div class="h2 flex-1" style="color: #3afaf9">
                  {{ huizong.zhongzhi }}
                </div>
                <div>
                  <div class="">本季度：+{{ huizong.zuowujia }}%↑</div>
                  <div class="" style="color: #f2784d">
                    本季度：+{{ huizong.zuowujia }}%↓
                  </div>
                </div>
              </div>
            </div>

            <div class="topright margin-top">
              <div>本月增长指数</div>

              <div class="flex-row flex-center">
                <div class="h2 flex-1" style="color: #3afaf9">
                  {{ huizong.zhishu }}
                </div>
                <div>
                  <div class="">上升</div>
                  <div class="" style="color: #f2784d">
                    平均数量：{{ huizong.pingjun }}亩
                  </div>
                </div>
              </div>
            </div>

            <div class="topright margin-top">
              <div>人员增长</div>

              <div class="flex-row flex-center">
                <div class="h2 flex-1" style="color: #3afaf9">
                  {{ huizong.renyuanzeng }}
                </div>
                <div>
                  <div class="">上半年：+{{ huizong.shangbannian }}%↑</div>
                  <div class="" style="color: #f2784d">
                    下半年：+{{ huizong.xiabannian }}%↓
                  </div>
                </div>
              </div>
            </div>

            <div class="topright margin-top">
              <div>本月增长指数（人）</div>

              <div class="flex-row flex-center">
                <div class="h2 flex-1" style="color: #3afaf9">
                  {{ huizong.zengzhangren }}
                </div>
                <div>
                  <div class="margin-left-1x" style="color: #f2784d">
                    上月人口：+{{ huizong.shangyuerenkou }}%↑
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MID UNDER -->
          <div class="flex-row" style="margin-top: -20px">
            <!-- 人员结构 -->
            <div
              class="mid_under_block padding margin-left margin-right-1x flex-1"
            >
              <!-- <div class="h2" style="color: #ffde00">人员结构</div> -->
              <div class="flex-row flex-center">
                <div class="h2 flex-1" style="color: #ffde00">人员结构</div>
                <div class="padding-1x h3 f-g" @click="routeto('/Renyuan2')">
                  详情
                </div>
              </div>

              <div class="flex-row flex-center margin-top-3x">
                <img :src="human" alt="" class="icon-2x" />
                <div class="margin-left-1x">
                  总数
                  <span class="h3" style="color: #ffde00">
                    {{ renyuanjiegou.zongshu }}</span
                  >
                  人
                </div>

                <div class="flex-1"></div>

                <img :src="human" alt="" class="icon-2x" />
                <div class="margin-left-1x">
                  男性
                  <span class="h3" style="color: #ffde00">
                    {{ renyuanjiegou.man }}</span
                  >
                  人
                </div>

                <div class="flex-1"></div>

                <img :src="human" alt="" class="icon-2x" />
                <div class="margin-left-1x">
                  女性
                  <span class="h3" style="color: #ffde00">
                    {{ renyuanjiegou.woman }}</span
                  >
                  人
                </div>
              </div>

              <div class="flex-row margin-top-4x">
                <div class="flex-1"></div>
                <div>
                  <div class="nianlin h3">年龄区间</div>
                  <div class="h4">
                    <div class="margin-top">
                      35岁以下
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number1 }}人 ({{ bili1 }}%)</span
                      >
                    </div>
                    <div class="margin-top-1x">
                      35~45岁
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number2 }}人 ({{ bili2 }}%)</span
                      >
                    </div>
                    <div class="margin-top-1x">
                      36~55岁
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number3 }}人 ({{ bili3 }}%)</span
                      >
                    </div>
                    <div class="margin-top-1x">
                      55岁以下
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number4 }}人 ({{ bili4 }}%)</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex-1"></div>
                <div>
                  <div class="nianlin h3">人口类型</div>
                  <div class="h4">
                    <div class="margin-top">
                      孤寡老人
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number5 }}人 ({{ bili5 }}%)</span
                      >
                    </div>
                    <div class="margin-top-1x">
                      留守儿童
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number6 }}人 ({{ bili6 }}%)</span
                      >
                    </div>
                    <div class="margin-top-1x">
                      贫困家庭
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number7 }}人 ({{ bili7 }}%)</span
                      >
                    </div>
                    <div class="margin-top-1x">
                      残疾人群
                      <span class="margin-left-1x"
                        >{{ renyuanjiegou.number8 }}人 ({{ bili8 }}%)</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex-1"></div>
              </div>
            </div>

            <!-- 帮助扶贫 -->
            <div
              class="mid_under_block padding margin-right margin-left-1x flex-1"
              style="position: relative"
            >
              <div class="flex-row flex-center">
                <div class="h2 flex-1" style="color: #ffde00">碣石帮扶</div>
                <!-- <div v-if="Member.admin_value=='Y'" class="padding-1x h3 f-g" @click="routeto('/Renyuan')">
                  详情
                </div> -->

                <div class="padding-1x h3 f-g" @click="routeto('/temp')">
                  详情
                </div>
              </div>

              <div class="flex-row">
                <div class="flex-1 flex-row flex-column">
                  <div class="fupin padding-05x margin-top-3x text-center">
                    <div class="h3">已办理完成人数</div>
                    <div class="h3" style="color: #ffde00">
                      {{ fupininfo.yiban }}人<span class="h6">(0.8%)</span>
                    </div>
                  </div>

                  <div class="padding-05x h4 manyidu margin-top">
                    满意度统计
                  </div>

                  <!-- <div id="bangfupin" style="height:100%"></div> -->
                  <div id="fupin" style="width: 100%; height: 100%"></div>
                </div>

                <!-- <div class="fupin padding-1x flex-1 text-center">
                  <div class="h3">未办理完成人数</div>
                  <div class="h3" style="color: #f2784d">
                    3200人<span class="h6">(0.8%)</span>
                  </div>
                </div> -->

                <div class="flex-1 flex-row flex-column">
                  <div class="fupin padding-05x margin-top-3x text-center">
                    <div class="h3">未办理完成人数</div>
                    <div class="h3" style="color: #f2784d">
                      {{ fupininfo.weibanli }}人<span class="h6">(0.8%)</span>
                    </div>
                  </div>

                  <!-- <div class="padding-05x h3  manyidu margin-top ">满意度统计</div> -->
                </div>
              </div>

              <div class="renshu">
                <div class="margin-top-4x">
                  当前等待人数 {{ fupininfo.dengdai }}人
                </div>
                <div class="margin-top">
                  已办人数累计 {{ fupininfo.wanchen }}人
                </div>
                <div class="margin-top">
                  已办业务累计 {{ fupininfo.yewu }}人
                </div>
                <div class="margin-top">
                  机器运行状态 {{ fupininfo.yunxing_name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Block -->
        <div class="right_block">
          <!-- 家庭收入年度统计 -->
          <div class="small_block" style="position: relative">
            <div class="flex-row flex-center margin" style="margin-bottom: 0">
              <img :src="circular" class="icon-10" />
              <div class="margin-left-1x h3 f-g flex-1">视频</div>
              <div class="padding-1x h3 f-g" @click="routeto('/Videolist')">
                详情
              </div>
            </div>

            <div class="padding-3x" style="padding-top: 0">
              <div class="h3">{{ titlename }}</div>

              <div style=" width:360px; object-fit: fill">
                <video-player
                  class="video-player vjs-custom-skin margin-top-1x"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                >
                </video-player>
              </div>
            </div>

            <!-- <div class="flex-row flex-center margin" style="margin-bottom: 0">
              <img :src="circular" class="icon-10" />
              <div class="margin-left-1x h3 f-g flex-1">家庭收入年度统计</div>
              <div class="padding-1x h3 f-g" @click="routeto('/Shouru')">
                详情
              </div>
            </div>

            <div id="shouru" style="width: 100%; height: 94%"></div>

            <div class="flex-row checkblock">
              <div class="nianlin2 h5" @click="checkyear('A')">上半年</div>
              <div class="nianlin2 h5 margin-left" @click="checkyear('B')">
                下半年
              </div>
            </div> -->
          </div>

          <!-- 土地使用面积 -->
          <div class="small_block">
            <div class="flex-row flex-center margin" style="margin-bottom: 0">
              <img :src="circular" class="icon-10" />
              <div class="margin-left-1x h3 f-g flex-1">土地使用面积</div>
              <div class="padding-1x h3 f-g" @click="routeto('/Tudi')">
                详情
              </div>
            </div>

            <div id="tudi" style="width: 100%; height: 80%"></div>
          </div>

          <!-- 家禽养殖分析 -->
          <div class="small_block" style="position: relative">
            <div class="flex-row flex-center margin" style="margin-bottom: 0">
              <img :src="circular" class="icon-10" />
              <div class="margin-left-1x h3 f-g flex-1">家禽养殖分析</div>
              <div class="padding-1x h3 f-g" @click="routeto('/Bangfupin')">
                详情
              </div>
            </div>

            <div class="bili margin-left-4x margin-top">家禽增长比例</div>

            <div class="bili2">
              <div class="bili">家禽增长数量分析</div>
              <div class="bili margin-top-1x">
                NO.1 牛 <span class="f-r">{{ jiaqininfo.niu }}↑</span>
              </div>
              <div class="bili margin-top-1x">
                NO.2 羊 <span class="f-r">{{ jiaqininfo.yang }}↑</span>
              </div>
              <div class="bili margin-top-1x">
                NO.3 猪 <span class="f-r">{{ jiaqininfo.zhu }}↑</span>
              </div>
              <div class="bili margin-top-1x">
                NO.4 鸡 <span class="f-r">{{ jiaqininfo.ji }}↑</span>
              </div>
              <div class="bili margin-top-1x">
                NO.5 其他 <span class="f-r">{{ jiaqininfo.qita }}↑</span>
              </div>
            </div>

            <div id="jiaqin" style="width: 100%; height: 70%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="loginout h2 padding-3x" @click="home">退出登录</div>
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
      Member: null,
      allvillage: null,
      human: require("@/assets/human.png"),
      circular: require("@/assets/circular.png"),
      big: require("@/assets/big.png"),
      villagelist: [],
      village_id: "",
      playerOptions: {},
      zhongyanglist: [],
      yicun: [],
      nongzuowu: [],
      zhandi: "",
      nianzeng: "",
      checkname: "",
      fupininfo: [],
      panduan: "A",
      bili1: 0,
      bili2: 0,
      bili3: 0,
      bili4: 0,
      bili5: 0,
      bili6: 0,
      bili7: 0,
      bili8: 0,
      renyuanjiegou: [],
      yicuntoday: 0,
      yicunweek: 0,
      yicunmonth: 0,
      huizong: [],
      xianshi: false,
      shouruinfo: [],
      jiaqininfo: [],
      checkimg: "",
      checkvideo: "",
      titlename: "",
      bgurl: {
        backgroundImage: "url(" + require("@/assets/mid.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundSize:'100% 100%'
      },
    };
  },
  created() {
    PageHelper.Init(this);

    HttpHelper.Post("village/videolist", {}).then((ret) => {
      console.log(ret, "视频");
      this.list = ret;
      this.checkimg = this.uploadpath + "video/" + this.list[0].img;
      this.checkvideo = this.uploadpath + "video/" + this.list[0].video;
      this.titlename = this.list[0].name;
      this.onLive(this.checkvideo, this.checkimg);
    });

    HttpHelper.Post("village/villagelist", {}).then((villagelist) => {
      this.villagelist = villagelist;
      console.log(this.villagelist, "--村庄列表数据");
    });

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

    // document.getElementById("headerImg").src = this.allvillage;
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

    showmap() {
      console.log("点了没", PageHelper.Member.admin_value);
      // this.xianshi = false;
      if (PageHelper.Member.admin_value == "Y") {
        if (this.xianshi == true) {
          this.xianshi = false;
          document.getElementById("headerImg").src =
            this.uploadpath + "resource/" + PageHelper.Res.map1;
        } else {
          this.xianshi = true;
          document.getElementById("headerImg").src =
            this.uploadpath + "resource/" + PageHelper.Res.map2;
        }
      }

      console.log(this.xianshi, "当前显示否");
    },

    check(index) {
      console.log("点击此处", index);

      // console.log(this.village_id, "===", this.villagelist[index].id);
      //   return;

      // if(index==100){

      //   this.villagelist[index].id=100;

      // }
      console.log(this.villagelist[index].id, "再瞅瞅");

      // return;

      if (PageHelper.Member.admin_value == "Y") {
        if (Number(this.village_id) == Number(this.villagelist[index].id)) {
          HttpHelper.Post("member/info", {}).then((Member) => {
            this.village_id = Member.village_id;

            (this.yicuntoday = 0), (this.yicunweek = 0), (this.yicunmonth = 0);

            this.alllist();

            document.getElementById("headerImg").src =
              this.uploadpath + "village/" + Member.village_map;
          });
        } else {
          var img = this.uploadpath + "village/" + this.villagelist[index].map;
          document.getElementById("headerImg").src = img;

          (this.yicuntoday = 0), (this.yicunweek = 0), (this.yicunmonth = 0);
          this.village_id = this.villagelist[index].id;

          PageHelper.VillageName = this.villagelist[index].name;

          this.alllist();
        }
      }
    },

    check2(index) {
      console.log("点击此处", index);

      console.log(this.villagelist[index].id, "再瞅瞅");
      (this.yicuntoday = 0), (this.yicunweek = 0), (this.yicunmonth = 0);
      this.village_id = this.villagelist[index].id;
      // PageHelper.VillageName = this.villagelist[index].name;
      this.alllist();
    },

    alllist() {
      console.log("回来没", this.village_id);

      HttpHelper.Post("village/zhongyanglist", {
        limit: 5,
        village_id: this.village_id,
      }).then((zhongyanglist) => {
        this.zhongyanglist = zhongyanglist;
        console.log(this.zhongyanglist, "--种养殖数据");
      });

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

      HttpHelper.Post("village/nongzuowu", {
        village_id: this.village_id,
      }).then((nongzuowu) => {
        this.nongzuowu = nongzuowu;
        console.log(this.nongzuowu, "--农作物");
      });

      HttpHelper.Post("village/renyuanjiegou", {
        village_id: this.village_id,
      }).then((renyuanjiegou) => {
        this.renyuanjiegou = renyuanjiegou[0];

        this.bili1 = parseInt(
          (Number(this.renyuanjiegou.number1) / this.renyuanjiegou.zongshu) *
            100
        );
        this.bili2 = parseInt(
          (Number(this.renyuanjiegou.number2) / this.renyuanjiegou.zongshu) *
            100
        );
        this.bili3 = parseInt(
          (Number(this.renyuanjiegou.number3) / this.renyuanjiegou.zongshu) *
            100
        );
        this.bili4 = parseInt(
          (Number(this.renyuanjiegou.number4) / this.renyuanjiegou.zongshu) *
            100
        );
        this.bili5 = parseInt(
          (Number(this.renyuanjiegou.number5) / this.renyuanjiegou.zongshu) *
            100
        );
        this.bili6 = parseInt(
          (Number(this.renyuanjiegou.number6) / this.renyuanjiegou.zongshu) *
            100
        );
        this.bili7 = parseInt(
          (Number(this.renyuanjiegou.number7) / this.renyuanjiegou.zongshu) *
            100
        );
        this.bili8 = parseInt(
          (Number(this.renyuanjiegou.number8) / this.renyuanjiegou.zongshu) *
            100
        );

        console.log(this.renyuanjiegou, "--人员结构");
      });
      //  return;
      HttpHelper.Post("village/fupin", { village_id: this.village_id }).then(
        (fupin) => {
          this.fupininfo = fupin[0];
          console.log(this.fupininfo, "--帮助扶贫");
        }
      );

      HttpHelper.Post("village/shouru", { village_id: this.village_id }).then(
        (shouru) => {
          this.shouruinfo = shouru;
          console.log(this.shouruinfo, "--收入");
        }
      );
    },

    checkyear(type) {
      this.panduan = type;

      this.shouru();
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
                axisLine: { show: false },
                splitArea: {
                  show: false,
                },
                center: ["50%", "50%"],
                radius: 60,
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
                name: "访问来源",
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
              left: 0,
              bottom: 0,
              itemWidth: 10,
              itemHeight: 10,
              width: 200,
              itemGap: 15,
              selectedMode: false,
              textStyle: {
                color: "white",
                fontSize: 13,
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
                    fontSize: "12",
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
              itemWidth: 10,
              itemHeight: 10,
              // width: 200,
              // itemGap: 15,
              selectedMode: false,
              textStyle: {
                color: "white",
                fontSize: 13,
              },
            },
            grid: {
              top: 90,
              x: 50,
              x2: 20,
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
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#E6E6E6",
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
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            // series: [{ type: "bar",radius:'50%' }, { type: "bar" }, { type: "bar" }],

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

    tudi() {
      HttpHelper.Post("member/info", {}).then((Member) => {
        var year = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        HttpHelper.Post("village/tudi", { village_id: Member.village_id }).then(
          (tudi) => {
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
                top: 10,
                // bottom: 0,
                itemWidth: 10,
                itemHeight: 10,
                // width: 200,
                // itemGap: 15,
                selectedMode: false,
                textStyle: {
                  color: "white",
                  fontSize: 13,
                },
              },
              grid: {
                top: 80,
                x: 20,
                x2: 20,
                y2: 0,
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
                  },
                  min: 0,
                  max: 10000,
                  interval: 2000,
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "white",
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
                  },
                  min: 0,
                  max: 100,
                  interval: 20,
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#E6E6E6",
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
                  barWidth: 10,
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
          }
        );
      });
    },

    jiaqin() {
      var dataBJ = [[1, 20]];
      var dataGZ = [[30, 30]];
      var dataSH = [[20, 40]];
      var dataSH2 = [[10, 60]];
      var dataSH3 = [[1, 60]];

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
          left: 60,
          right: 240,
          top: 70,
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
            symbolSize: 70,
            name: "牛",
            type: "scatter",
            itemStyle: itemStyle,
            emphasis: {
              label: {
                show: true,
                color: "white",
                formatter: function (param) {
                  return "牛";
                },
                position: "top",
              },
            },
            data: dataBJ,
          },
          {
            symbolSize: 50,
            name: "羊",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
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
            symbolSize: 70,
            name: "猪",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
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
            symbolSize: 50,
            name: "鸡",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
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
            symbolSize: 65,
            name: "其他",
            type: "scatter",
            emphasis: {
              label: {
                show: true,
                color: "white",
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

    zhengtizhanbi() {
      HttpHelper.Post("member/info", {}).then((Member) => {
        HttpHelper.Post("village/huizong", {
          village_id: Member.village_id,
        }).then((huizong) => {
          var zhenjibi = Number(huizong[0].zhenjibi);
          var shijibi = Number(huizong[0].shijibi);
          var cunjibi = Number(huizong[0].cunjibi);
          this.huizong = huizong[0];
          //  console.log(huizong.zhenjibi,'镇级比')

          var zhanbi = this.$echarts.init(document.getElementById("zhanbi"));
          zhanbi.setOption({
            // tooltip: {
            //   trigger: "item",
            //   formatter: "{a} <br/>{b}: {c} ({d}%)",
            // },
            legend: {
              // orient: "vertical",
              left: 0,
              bottom: 40,

              itemWidth: 10,
              itemHeight: 10,
              width: 200,
              itemGap: 10,
              selectedMode: false,
              textStyle: {
                color: "white",
                fontSize: 13,
              },
              data: ["镇级", "市级", "村级"],
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                center: ["30%", "38%"],
                radius: ["36%", "52%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },

                itemStyle: {
                  normal: {
                    color: function (params) {
                      //自定义颜色
                      var colorList = ["#55CFFF", "#2E4EFF", "#8A31F8"];
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
                    fontSize: "12",
                    color: "#E6E6E6",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [
                  { value: zhenjibi, name: "镇级" },
                  { value: shijibi, name: "市级" },
                  { value: cunjibi, name: "村级" },
                ],
              },
            ],
          });
        });
      });
    },

    renkouzengzhang() {
      HttpHelper.Post("member/info", {}).then((Member) => {
        var data = [];
        HttpHelper.Post("village/huizong", {
          village_id: Member.village_id,
        }).then((huizong) => {
          data.push(
            Number(huizong[0].renkou1),
            Number(huizong[0].renkou2),
            Number(huizong[0].renkou3),
            Number(huizong[0].renkou4),
            Number(huizong[0].renkou5),
            Number(huizong[0].renkou6)
          );

          var renkou = this.$echarts.init(document.getElementById("renkou"));
          renkou.setOption({
            grid: {
              top: 40,
              x: 30,
              x2: 22,
              y2: 20,
            },

            xAxis: {
              type: "category",
              boundaryGap: false,
              data: ["一月", "二月", "三月", "四月", "五月", "六月"],
              axisTick: {
                //刻度
                show: false,
                alignWithLabel: true,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#E6E6E6",
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#058E8C",
                },
              },
            },
            yAxis: {
              name: "单位：人",
              nameTextStyle: {
                color: "#FEFEFE",
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#E6E6E6",
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
                data: data,
                type: "line",
                smooth: true,
                symbol: "none",
                color: "#55CFFF",
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      //柱状图颜色渐变
                      { offset: 0, color: "#058E8C" },
                      { offset: 0.5, color: "#55CFFF" },
                      { offset: 1, color: "#55CFFF" },
                    ]),

                    lineStyle: {
                      color: "#55CFFF", //改变折线颜色
                    },
                  },
                },
                areaStyle: {},
              },
            ],
          });
        });
      });
    },
  },
  mounted() {
    this.initCharts();

    this.yicunyipin();
    this.fupin();

    this.shouru();
    this.tudi();
    this.jiaqin();
    this.zhengtizhanbi();
    this.renkouzengzhang();
  },
};
</script>
<style scoped>
div {
  color: #e6e6e6;
}
.loginout {
  position: fixed;
  left: 30px;
  top: 0;
}
.checkblock {
  position: absolute;
  top: 16%;
  left: 30px;
  z-index: 10;
}
.mid_under_block {
  background: #afc7fc54;
  border-radius: 10px;
  border: 1px solid white;
  /* width: 450px;
  height: 308px; */
}
.img {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  width: 700px;
  height: 940px;
}
.bintu {
  width: 196px;
  height: 196px;
}

.left_block {
  width: 25%;
  height: 100%;
  padding-left: 2%;
}
.mid_block {
  width: 50%;
  height: 97.4%;
  margin: 1%;
  border-radius: 10px;
  border: 1px solid white;
  position: relative;
}
.mid_1 {
  position: absolute;
  top: 0;
  left: 0;
}
.mid_1_block {
  width: 400px;
  border: 1px solid #00f6ff;
  border-radius: 10px 0px 10px 0px;
  background: #00f7ff1a;
}
.mid_2 {
  position: absolute;
  bottom: 32%;
  left: 6%;
  width: 300px;
  height: 300px;
}

.mid_3 {
  position: absolute;
  bottom: 31%;
  right: 1%;
  width: 360px;
  height: 300px;
}
.mid_4 {
  position: absolute;
  top: 4%;
  right: 40px;
}
.topright {
  min-width: 200px;
  padding: 4px 40px 4px 10px;
  border: 1px solid #00f6ff;
  background: #00f7ff15;
  border-radius: 5px 0px 0px 0px;
}

.right_block {
  width: 25%;
  height: 100%;
  padding-right: 2%;
}
.small_block {
  height: 31%;
  margin-top: 4.4%;
  width: 100%;
  background: #2b8bda27;
  border: 1px solid #00f6ff;
  border-radius: 10px;
}
.block_1 {
  border-top: 1px solid #00f6ff;
  border-bottom: 1px solid #00f6ff;
}
.border-de {
  border-top: 1px dashed #00f6ff;
}
.padding_1 {
  padding: 16px 5px 16px 5px;
}
.fenxi_block {
  width: 30%;
  height: 68px;
  border: 1px solid #00f6ff;
  border-radius: 10px 0px 10px 0px;
  background: #00f7ff2d;
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
  width: 190px;
  height: 70px;
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
.block_bg {
  background: #88fffd1a;
}
.fupin {
  width: 90%;
  border: 1px solid #88fffe;
  border-radius: 10px 0px 10px 0px;
}
.manyidu {
  width: 140px;
  text-align: center;
  border: 1px solid #00f6ff;
  border-radius: 10px 0px 10px 0px;
}
.bili {
  width: 180px;
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

.renshu {
  position: absolute;
  z-index: 10;
  right: 70px;
  bottom: 10%;
}
.fangda {
  position: absolute;
  left: 50px;
  top: 24%;
}
.bigimg {
  width: 250px;
  height: 200px;
}
.f1 {
  position: absolute;
  left: 50px;
  top: 25.5%;
  font-size: 24px;
}

.f2 {
  position: absolute;
  left: 130px;
  top: 22%;
  font-size: 24px;
}

.f3 {
  position: absolute;
  left: 200px;
  top: 20%;
  font-size: 24px;
}
</style>