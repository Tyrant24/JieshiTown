<template>
  <div class="padding-3x flex-row">
    <div class="left_block bg">
      <div class="padding-3x">
        <div style="font-size: 30px">视频列表</div>
        <div class="margin-top" style="height:810px;overflow:auto">

 <div
          class=""
          v-for="(item, index) in list"
          :key="index"
          @click="check(index)"
        >
          <div>{{ item.name }}</div>
          <img
            :src="uploadpath + 'video/' + item.img"
            class="img margin-top-1x"
          />
        </div>

        </div>
       
      </div>
    </div>
    <div class="right_block bg">
      <div class="padding-3x">
          <div style="font-size: 30px">视频详情</div>
        <video-player
          class="video-player vjs-custom-skin margin-top-3x"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions" 
        >
        </video-player>
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

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Staff: null,
      checkimg: "",
      checkvideo: "",
      playerOptions: {},
       back: require("@/assets/back.png"),
      list: [],
    };
  },
  created() {
    PageHelper.Init(this);

    HttpHelper.Post("village/videolist", {}).then((ret) => {
      console.log(ret, "视频");
      this.list = ret;
      this.checkimg = this.uploadpath + "video/" + this.list[0].img;
      this.checkvideo = this.uploadpath + "video/" + this.list[0].video;

      console.log(this.checkvideo, "选中");

      this.onLive(this.checkvideo, this.checkimg);
    });
  },
  methods: {
    check(i) {
      console.log("当前选择", this.list[i]);
      this.checkimg = this.uploadpath + "video/" + this.list[i].img;
      this.checkvideo = this.uploadpath + "video/" + this.list[i].video;
       this.onLive(this.checkvideo, this.checkimg);
    },

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

 
  },
};
</script>
<style scoped>
div {
  color: white;
  font-size: 36px;
}
.left_block {
  width: 20%;
  height: 500px;
  height: 1320px;
}
.right_block {
  width: 78%;
  margin-left: 2%;
  height: 1320px;
}
.bg {
  background: #afc7fc28;
  border-radius: 10px;
}
.img {
  width: 100%;
  height: 260px;
}
</style>