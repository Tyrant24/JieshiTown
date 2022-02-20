<template>
  <div class="flex-row flex-center ">
    <div class="flex-1 h-100"></div>
    <div class="padding-4x border">
      <div class=" ">
       
        <!-- <div class="h4 margin-top f-g text-center">
          欢迎使用{{ Inst.name }}
        </div> -->
       
        <div class="flex-row flex-center margin-top">
          <div class="width-1x h2 f-w">登录名</div>
          <div class="width-3x">
            <!-- <el-input v-model="account" placeholder="请输入登录名"></el-input> -->
             
              <input type="text" class="h3" v-model="account" placeholder="请输入登录名" style="width:200px;height:30px">
          </div>
        </div>

        <div class="flex-row flex-center margin-top">
          <div class="width-1x  h2 f-w">密码</div>
          <div class="width-3x">
     
            <input type="password" class="h3" v-model="password" placeholder="请输入密码" style="width:200px;height:30px">
             
          </div>
         
        </div>

        <div class="text-center margin-top">
          <button
            type="primary"
            round
            class="width-1x  h2 "
            @click="login"
            :disabled="  account == '' || password == ''"
            >登 录</button>
        </div>

      </div>
    </div>
    <div class="flex-1 h-100"></div>
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
      account: "",
      password: "", 
    };
  },
  created() {
    PageHelper.Init(this);
      
     
  },
  methods: {
    login() {
      
      HttpHelper.Post("member/login", { 
        account: this.account,
        password: this.password,
      }).then((ret) => {
        if (ret.code != 0) {
           
        } else {
 
         window.localStorage.setItem("account",this.account);
         window.localStorage.setItem("token",ret.return);
         window.localStorage.setItem("member_id",ret.result);
         console.log(ret.return,'返回值')
         //window.localStorage.setItem("member_id",ret.result);

          // window.localStorage.setItem("store_id",store_id);
       this.routeto("/");
        }
      });
    },
  },
};
</script>
<style scoped>
.logo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}
</style>