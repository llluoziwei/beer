<template>
  <view class="body" :style="{ 'padding-top': statusHeight }">
    <!-- 左侧菜单 -->
    <view
      class="menu"
      :style="{
        width: packUp ? '139.79rpx' : '74.55rpx',
      }"
    >
      <!-- logo -->
      <view class="logo" v-if="packUp">
        <view class="logo-img"></view>
      </view>
      <!-- 职员信息 -->
      <view class="clerk">
        <view class="clerk-img" style="margin-top: 5px">
          <u--image
            :showLoading="true"
            :src="clerkImg"
            shape="circle"
            width="41.93rpx"
            height="41.93rpx"
          ></u--image>
        </view>
        <view class="clerk-post"> {{ userName }} </view>
        <view class="clerk-line"></view>
      </view>
      <!-- 菜单 -->
      <view class="options">
        <!-- 正常菜单 -->
        <template v-if="packUp">
          <view
            class="options-check"
            :class="{ 'clerk-active': current == menuIndex }"
            @click="optionClick(menuItem.title, menuIndex)"
            v-for="(menuItem, menuIndex) in menuOptions"
            :key="menuIndex"
          >
            <view :class="{ child: current == menuIndex }"></view>
            <!-- 当激活时显示激活图标 -->
            <view
              v-if="current == menuIndex"
              class="menu-icon"
              :style="'background-image:url(' + menuItem.menuIconClick + ')'"
            ></view>
            <view
              v-else
              class="menu-icon"
              :style="'background-image:url(' + menuItem.menuIcon + ')'"
            ></view>
            <view class="menu-title" :class="menuOne[menuIndex]">{{
              menuItem.title
            }}</view>
          </view>
        </template>
        <!-- 缩小菜单 -->
        <template v-else>
          <view
            class="options-check-ret"
            :class="{ 'clerk-active': current == menuIndex }"
            @click="optionClick(menuItem.title, menuIndex)"
            v-for="(menuItem, menuIndex) in menuOptions"
            :key="menuIndex"
          >
            <view :class="{ child: current == menuIndex }"></view>
            <!-- 当激活时显示激活图标 -->
            <view
              v-if="current == menuIndex"
              class="menu-icon-ret"
              :style="'background-image:url(' + menuItem.menuIconClick + ')'"
            ></view>
            <view
              v-else
              class="menu-icon-ret"
              :style="'background-image:url(' + menuItem.menuIcon + ')'"
            ></view>
          </view>
        </template>
      </view>
      <!-- 功能 -->
      <view class="func">
        <!-- 正常 -->
        <template v-if="packUp">
          <view class="pack-up func-btn" @click="packUpClick">
            <text class="packup-icon func-icon"></text>
            <text>收起</text>
          </view>
          <view class="quit func-btn" @click="quitClick">
            <text class="quit-icon func-icon"></text>
            <text>退出</text>
          </view>
        </template>
        <!-- 缩起 -->
        <template v-else>
          <view class="pack-up-ret func-btn" @click="packUpClick">
            <text class="packup-icon func-icon-ret"></text>
          </view>
          <view class="quit-ret func-btn" @click="quitClick">
            <text class="quit-icon func-icon-ret"></text>
          </view>
        </template>
      </view>
    </view>
    <!-- 右侧组件 -->
    <view
      class="content"
      :style="{ width: packUp ? '610.43rpx' : 'calc(100% - 74.55rpx)' }"
    >
      <home-page :title="String(title)"></home-page>
    </view>
  </view>
</template>

<script>
import NET from "../../utils/request.js";
import API from "../../config/api.js";
import homePage from "../../components/homepage/homePage.vue";
export default {
  components: { homePage },
  data() {
    return {
      // 状态栏高度
      statusHeight: "",
      // 职员照片
      // clerkImg: "https://cdn.uviewui.com/uview/album/1.jpg",
      clerkImg: "../../static/img/avatar-2.jpg",
      // 菜单选项
      menuOptions: [],
      // 菜单title的class
      menuOne: [
        "option1",
        "option2",
        "option3",
        "option4",
        "option5",
        "option6",
        "option7",
        "option8",
        "option9",
        "option10",
        "option11",
        "option12",
        "option13",
        "option14",
        "option15",
      ],
      // 点击到的菜单class
      isClerkActive: false,
      current: 0,
      title: "嘉威首页",
      // 收起
      packUp: true,
      // 获取登录时传递的工位与账号
      putStationArr: [],
      account: "",
      // 获取登录人的权限及名称
      permission: [],
      userName: "",
    };
  },
  onLoad() {
    // 取出账户与工位信息
    this.account = uni.getStorageSync("account");
    this.putStationArr = uni.getStorageSync("putStationArr");
    uni.getSystemInfo({
      success: (res) => {
        console.log(res.safeAreaInsets);
        // 获取状态栏高度
        this.statusHeight = res.statusBarHeight + "px";
      },
    });
  },
  mounted() {
    let tempArr = uni.getStorageSync("menuOptions");
    this.menuOptions = tempArr.filter((item) => {
      return item.isShow;
    });

    this.account = uni.getStorageSync("userInfo").NAME;

    this.getUserInfo();
    this.checkOpenSocket();
  },
  methods: {
    //? ======界面交互======
    // 点击菜单
    optionClick(title, idx) {
      this.current = idx;
      this.title = title;
    },
    // 收起
    packUpClick() {
      this.packUp = !this.packUp;
    },
    // 退出
    quitClick() {
      uni.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: function (res) {
          if (res.confirm) {
            // 删除菜单与权限
            uni.removeStorageSync("menuOptions");
            uni.removeStorageSync("rights");

            uni.reLaunch({
              url: "../login/login",
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },

    //? ======数据处理======
    // 获取用户信息(权限及用户)
    getUserInfo() {
      NET.tempRequest(API.workerInfo, {})
        .then((res) => {
          this.permission = res.data.data.rights;
          this.userName = res.data.data.position[0].position_name;
          uni.setStorageSync("userName", this.userName);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //? ======WebSocket======
    // 判断是否已连接
    checkOpenSocket() {
      uni.sendSocketMessage({
        data: "ping",
        success: (res) => {
          return;
        },
        fail: (err) => {
          // 未连接打开websocket连接
          this.openConnection();
        },
      });
    },
    openConnection() {
      // 打开连接
      // uni.closeSocket(); // 确保已经关闭后再重新打开
      let userName = uni.getStorageSync("tokenInfo").userName;
      let station = uni.getStorageSync("putStationArr")[1];
      let websocketUrl = API.websocketUrl;
      uni.connectSocket({
        url:
          websocketUrl +
          "/pad" +
          "/" +
          userName +
          "/" +
          station.make_line_id +
          "/" +
          station.work_position_id,
        success(res) {
          console.log("连接成功 res=", res);
        },
        fail(err) {
          console.log("连接失败 ERR=", err);
        },
      });
      uni.onSocketOpen((res) => {
        console.log("连接成功");
      });
      this.onSocketMessage(); // 打开成功监听服务器返回的消息
    },
    //	打开成功监听服务器返回的消息
    onSocketMessage() {
      this.timeout = 30000;
      this.timeoutObj = null;
      uni.onSocketMessage((res) => {
        this.getSocketMsg(res.data); // 监听到有新服务器消息
      });
    },
    // 监听到有新服务器消息
    getSocketMsg(reData) {
      this.msgtitle = reData;
      this.modalshow = true;
      // 监听到服务器消息

      console.log("1111111收到服务器消息:", reData);
      this.reset(); // 检测心跳reset,防止长时间连接导致连接关闭
    },
    // 检测心跳reset
    reset() {
      clearInterval(this.timeoutObj);
      this.start(); // 启动心跳
    },
    // 启动心跳 start
    start() {
      this.timeoutObj = setInterval(function () {
        uni.sendSocketMessage({
          success: (res) => {
            console.log("连接中....");
          },
          fail: (err) => {
            console.log("连接失败重新连接....");
            this.openConnection();
          },
        });
      }, this.timeout);
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  height: calc(100vh - 18.63rpx - var(--status-bar-height));
  // height:  100vh;
  width: 100vw;
  background-color: #387bfc;

  display: flex;
  padding-bottom: 18.63rpx;
}

// 菜单
.menu {
  height: 100%;
  max-width: 139.79rpx;
  margin-left: 10.25rpx;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.84, 0.21, 0.19, 0.76);
  .logo {
    // flex: 1;
    min-height: 23.29rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4.65rpx;
    // 使收缩菜单居中
    padding-right: 9.31rpx;
    .logo-img {
      height: 100%;
      width: 50%;
      // min-height: 38px;
      background: url("../../static/icon/logo.png");
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  .clerk {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // 使收缩菜单居中
    padding-right: 9.31rpx;
    .clerk-post {
      width: 75%;
      height: 23.29rpx;
      max-height: 23.29rpx;
      line-height: 23.29rpx;
      margin-top: 9.31rpx;
      background: rgba(134, 164, 250, 1);
      border-radius: 3.72rpx;
      color: #ffffff;
      font-size: 11.18rpx;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .clerk-line {
      height: 0.93rpx;
      width: 75%;
      background-color: rgba(237, 237, 241, 0.39);
      margin-top: 9.31rpx;
      margin-bottom: 9.31rpx;
    }
  }
  // 菜单目录
  .options {
    flex: 11;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 11.18rpx;
    position: relative;
    overflow-y: scroll;
    // 正常菜单
    .options-check {
      width: 100%;
      display: flex;
      padding-bottom: 6.52rpx;
      padding-top: 6.52rpx;
      color: #ffffff;
      // transition: all .5s;
      .menu-icon {
        height: 14.91rpx;
        width: 14.91rpx;
        margin-left: 18.63rpx;
        margin-right: 9.31rpx;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .menu-title {
        width: calc(70% - 19.57rpx);
        // text-align-last: justify;
        // text-align: justify;
        // text-justify: inter-ideograph; // 这行必加，兼容ie浏览
        white-space: nowrap;
        letter-spacing: 1.86rpx;
      }
      .option1 {
        // letter-spacing: 35px !important;
      }
      .option12 {
        // letter-spacing: 4px !important;
      }
    }
    // 缩小菜单
    .options-check-ret {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-bottom: 7.45rpx;
      padding-top: 7.45rpx;
      .menu-icon-ret {
        height: 14.91rpx;
        width: 14.91rpx;
        background-repeat: no-repeat;
        background-size: 100%;
        // 使收缩菜单居中
        margin-right: 9.31rpx;
      }
    }
  }
  .func {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    // 使收缩菜单居中
    padding-right: 9.31rpx;
    // 正常
    .pack-up {
      width: 70%;
      margin-bottom: 9.31rpx;
      .packup-icon {
        background-image: url("../../static/icon/pack-up.png");
      }
    }
    .quit {
      width: 70%;
      .quit-icon {
        background-image: url("../../static/icon/quit.png");
      }
    }
    // 缩起
    .pack-up-ret {
      width: 26.09rpx;
      height: 26.09rpx;
      border-radius: 50%;
      margin-bottom: 9.31rpx;
      background-color: #fff;
      .packup-icon {
        background-image: url("../../static/icon/zu-packup.png");
      }
    }
    .quit-ret {
      width: 26.09rpx;
      height: 26.09rpx;
      border-radius: 50%;
      .quit-icon {
        background-image: url("../../static/icon/quit.png");
      }
    }
  }
}
// 正常func按钮
.func-icon {
  display: inline-block;
  height: 14.91rpx;
  width: 14.91rpx;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: 9.31rpx;
}
.func-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17.7rpx;
  font-size: 11.18rpx;
  color: #fff;
  border: 0.93rpx solid #ffffff;
  min-height: 25.16rpx;
  white-space: nowrap;
}
// 缩起func按钮
.func-icon-ret {
  display: inline-block;
  height: 13.04rpx;
  width: 13.04rpx;
  background-repeat: no-repeat;
  background-size: 100%;
}

// 激活时的菜单class
.clerk-active {
  background-color: #f9f8fe;
  border-radius: 18.63rpx 0 0 18.63rpx;
  color: #387bfc !important;
  position: relative;
}
// 伪类创建圆角
.clerk-active::before {
  content: "";
  position: absolute;
  top: -18.63rpx;
  right: 0;
  width: 18.63rpx;
  height: 18.63rpx;
  z-index: 50;
  background-color: #f9f8fe;
}
.clerk-active::after {
  content: "";
  position: absolute;
  top: -18.63rpx;
  right: 0;
  width: 18.63rpx;
  height: 18.63rpx;
  z-index: 51;
  border-radius: 0 0 10.25rpx 0;
  background-color: #387bfc;
}
// 伪类创建圆角2
.child {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  // background-color: rgb(219, 34, 34);
  z-index: 50;
}
.child::before {
  content: "";
  position: absolute;
  bottom: -18.63rpx;
  right: 0;
  z-index: 50;
  width: 18.63rpx;
  height: 18.63rpx;
  background-color: #f9f8fe;
}
.child::after {
  content: "";
  position: absolute;
  bottom: -18.63rpx;
  right: 0;
  z-index: 501;
  width: 18.63rpx;
  height: 18.63rpx;
  border-radius: 0 10.25rpx 0 0;
  background-color: #387bfc;
}

// 内容页
.content {
  height: 100%;
  margin-right: 27.95rpx;
  background-color: #f9f8fe;
  border-radius: 12.11rpx;
  overflow: hidden;
}
</style>
