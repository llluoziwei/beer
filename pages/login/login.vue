<template>
  <view class="content">
    <view class="ball1"></view>
    <view class="ball2"></view>
    <view class="logo"></view>
    <!-- banner -->
    <view class="banner">
      <view class="title">Beer processing</view>
      <view class="banner-img"></view>
    </view>
    <!-- 登录模块 -->
    <view class="login">
      <view class="login-enter">
        <view class="input-box">
          <view class="title" style="padding-bottom: 18.63rpx">欢迎登录</view>
          <!-- 工位 -->
          <view class="enter station">
            <view @click.stop="showStation = true">
              <u-input
                v-model="station"
                border="none"
                shape="circle"
                placeholder="工位"
                disabled
                suffixIcon="arrow-down"
                disabledColor="#ffffff"
              >
                <view
                  class="station-pre"
                  slot="prefix"
                  margin="0 3px 0 0"
                  type="tips"
                ></view>
              </u-input>
            </view>
            <!-- 扫码 -->
            <view class="station-scan" @click="scanCode"
              ><view class="scan-icon"></view
            ></view>
          </view>
          <!-- 账号 -->
          <view class="enter account">
            <u-input
              border="none"
              shape="circle"
              v-model="account"
              clearable
              placeholder="用户"
              prefixIcon="account"
              prefixIconStyle="font-size: 20.5rpx;color: #DDDDDD"
            ></u-input>
          </view>
          <!-- 密码 -->
          <view class="enter password" style="padding-bottom: 9.31rpx">
            <u-input
              border="none"
              shape="circle"
              type="password"
              v-model="password"
              clearable
              placeholder="密码"
              prefixIcon="lock"
              prefixIconStyle="font-size: 20.5rpx;color: #DDDDDD"
            ></u-input>
          </view>
          <!-- 登录 -->
          <view>
            <u-button
              type="primary"
              shape="circle"
              text="登录"
              color="linear-gradient(88deg, #81ACFF 0%, #387BFC 100%)"
              customStyle="height: 36.34rpx;font-size:20.5rpx;"
              :loading="loading"
              loadingText="登陆中..."
              @click="getLogin"
            ></u-button>
          </view>
        </view>
        <!-- 设置 -->
        <view class="login-setting" @click="settingShow = true">设置</view>
      </view>
    </view>
    <!-- 工位选择 -->
    <u-picker
      :show="showStation"
      ref="uPicker"
      keyName="name"
      :columns="workColumns"
      @confirm="confirm"
      @cancel="showStation = false"
      @change="changeHandler"
    ></u-picker>
    <!-- 设置 -->
    <u-popup
      :show="settingShow"
      class="p-p"
      mode="center"
      @close="settingShow = false"
    >
      <view class="popup-server">
        <view class="text-box">
          <view class="text-c">服务器地址</view>
          <view class="input-box">
            <u-input
              border="none"
              shape="circle"
              placeholder="服务器"
              v-model="serverURL"
              disabledColor="#ffffff"
            >
              <view
                class="station-pre"
                slot="prefix"
                margin="0 3px 0 0"
                type="tips"
              ></view>
              <view
                class="arrow-down"
                slot="suffix"
                margin="0 3px 0 0"
                @click="Serverbtn"
                ><u-icon name="arrow-down" size="28"></u-icon
              ></view>
            </u-input>
          </view>
        </view>
        <view>
          <u-button
            type="primary"
            shape="circle"
            text="确定"
            color="linear-gradient(88deg, #81ACFF 0%, #387BFC 100%)"
            customStyle="height:46.59rpx;font-size:13.04rpx;"
            @click="Serverc"
          ></u-button>
        </view>
      </view>
    </u-popup>
    <u-picker
      :show="showServer"
      ref="uPicker"
      keyName="name"
      :columns="ServerColumns"
      @confirm="confirmServer"
      @cancel="cancelServer"
    ></u-picker>
    <!-- 登录成功/失败通知 -->
    <view class="aaaa"><u-toast ref="uToast"></u-toast></view>

    <!-- 更新提示 -->
    <u-modal
      width="260rpx"
      :show="updateShow"
      :title="modalTitle"
      :content="content"
      confirmText="更新"
      @confirm="doUpData"
    ></u-modal>
  </view>
</template>

<script>
import { login } from "../../config/login.js";
import NET from "../../utils/request.js";
import API from "../../config/api.js";

import autoUpdater from "../../update/autoUpdater.min.js";
export default {
  data() {
    return {
      // 更新显示
      updateShow: false,
      modalTitle: "",
      content: "检测到有新的版本,请更新",
      // 更新地址
      appUrl: "",

      menuOptions: [
        {
          title: "嘉威首页",
          // 未激活图标
          menuIcon: "../../static/icon/zu1-click.png",
          // 激活图标
          menuIconClick: "../../static/icon/zu1.png",
          isShow: true,
          name: "index",
          state: 1,
        },
        {
          title: "启动开班",
          menuIcon: "../../static/icon/zu2-click.png",
          menuIconClick: "../../static/icon/zu2.png",
          isShow: false,
          name: "work_card_process:list",
          state: 2,
        },
        {
          title: "开班检查",
          menuIcon: "../../static/icon/zu3-click.png",
          menuIconClick: "../../static/icon/zu3.png",
          isShow: false,
          name: "check_open_work:list",
          state: 3,
        },
        {
          title: "启动清场",
          menuIcon: "../../static/icon/zu6-click.png",
          menuIconClick: "../../static/icon/zu6.png",
          isShow: false,
          name: "check_clear_line:list",
          state: 4,
        },
        {
          title: "清场检查",
          menuIcon: "../../static/icon/zu7-click.png",
          menuIconClick: "../../static/icon/zu7.png",
          isShow: false,
          name: "check_clear_line:list",
          state: 5,
        },
        {
          title: "启动清单",
          menuIcon: "../../static/icon/zu4-click.png",
          menuIconClick: "../../static/icon/zu4.png",
          isShow: false,
          name: "start_clear_work:list",
          state: 6,
        },
        {
          title: "清单检查",
          menuIcon: "../../static/icon/zu5-click.png",
          menuIconClick: "../../static/icon/zu5.png",
          isShow: false,
          name: "check_clear_card:list",
          state: 7,
        },

        {
          title: "收料确认",
          menuIcon: "../../static/icon/zu8-click.png",
          menuIconClick: "../../static/icon/zu8.png",
          isShow: false,
          name: "erp_transfer_direct:list",
          state: 8,
        },
        {
          title: "生产投料",
          menuIcon: "../../static/icon/zu9-click.png",
          menuIconClick: "../../static/icon/zu9.png",
          isShow: false,
          name: "out_make:list",
          state: 9,
        },
        {
          title: "作业记录",
          menuIcon: "../../static/icon/zu10-click.png",
          menuIconClick: "../../static/icon/zu10.png",
          isShow: false,
          name: "work_card_exec:list",
          state: 10,
        },
        {
          title: "产出登记",
          menuIcon: "../../static/icon/zu11-click.png",
          menuIconClick: "../../static/icon/zu11.png",
          isShow: false,
          name: "work_card_emp_work:list",
          state: 11,
        },
        {
          title: "E-SOP",
          menuIcon: "../../static/icon/zu12-click.png",
          menuIconClick: "../../static/icon/zu12.png",
          isShow: false,
          name: "e-sop:list",
          state: 12,
        },
        {
          title: "生产巡线",
          menuIcon: "../../static/icon/zu13-click.png",
          menuIconClick: "../../static/icon/zu13.png",
          isShow: false,
          name: "check_loop_line:list",
          state: 13,
        },
        {
          title: "专项检查",
          menuIcon: "../../static/icon/zu14-click.png",
          menuIconClick: "../../static/icon/zu14.png",
          isShow: false,
          name: "check_special_items:list",
          state: 14,
        },
        {
          title: "停机记录",
          menuIcon: "../../static/icon/zu15-click.png",
          menuIconClick: "../../static/icon/zu15.png",
          isShow: false,
          name: "device_stop_log:list",
          state: 15,
        },
      ],
      // 服务器选择列表
      ServerColumns: [],
      // 服务器弹框
      showServer: false,
      // 服务器 地址
      serverURL: "",

      // 获取登录人名称
      userName: "",

      // 工位
      station: "",
      // 账号
      account: "admin",
      // 密码
      password: "123456",
      // 工位选择
      showStation: false,
      // 工位数据
      workColumns: [[], []],
      workColumnChild: [],
      // 存储要传入的工位信息
      putStationArr: [],

      // 设置
      settingShow: false,
      // 界面宽高
      windowHeight: "",
      windowWidth: "",
      // 登录时按钮loading
      loading: false,
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: function (res) {
        // 获取状态栏高度
        console.log(res);
      },
    });
  },
  mounted() {
    this.getStationData();
    this.getAppVersion();
  },
  methods: {
    // 确定服务器
    Serverc() {},
    // 服务器弹框
    Serverbtn() {
      this.showServer = true;
      this.settingShow = false;
    },
    // 服务器地址选择确定
    confirmServer(e) {
      console.log(e, "sdfsdf");
      this.settingShow = true;
      this.showServer = false;
    },
    // 关闭服务器选择弹框地址
    cancelServer() {
      this.settingShow = true;
      this.showServer = false;
    },
    //? =========页面交互===========
    // 点击工位选择
    confirm(event) {
      this.putStationArr = event.value;

      this.station = event.value[1].name;
      this.showStation = false;
    },
    // 工位选择change
    changeHandler(event) {
      const {
        columnIndex,
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.uPicker,
      } = event;
      // 当第一列值发生变化时，变化第二列(后一列)对应的选项
      if (columnIndex === 0) {
        // picker为选择器this实例，变化第二列对应的选项
        picker.setColumnValues(1, this.workColumnChild[index]);
      }
    },

    //? =========数据处理===========
    // 获取工位信息列表
    getStationData() {
      NET.workRequest(API.workInfo, {}, "POST")
        .then((res) => {
          let tempArr = res.data.data;
          // 生产线赋值
          tempArr.forEach((item) => {
            this.workColumns[0].push(item);
          });
          // 工位赋值
          tempArr.forEach((child) => {
            this.workColumnChild.push(child.children);
          });
          this.workColumns[1] = this.workColumnChild[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 登录
    getLogin() {
      // 首先验证必填
      if (!this.station || !this.account || !this.password) {
        if (!this.station) {
          uni.showToast({
            title: "工位不能为空!",
            icon: "error",
            duration: 2000,
          });
        } else if (!this.account) {
          uni.showToast({
            title: "账号不能为空!",
            icon: "error",
            duration: 2000,
          });
        } else {
          uni.showToast({
            title: "密码不能为空!",
            icon: "error",
            duration: 2000,
          });
        }
        return;
      }

      this.loading = true;
      login({
        username: this.account,
        password: this.password,
      })
        .then((res) => {
          if (res.code == 200) {
            this.loading = false;
            this.getUserInfo();
            this.isFPPosition();
          }
        })
        .catch((err) => {
          this.loading = false;
          //其他错误码
          uni.showToast({
            title: err.msg || "登录失败！",
            icon: "none",
            duration: 2500,
          });
          console.log(err);
        });
    },
    // ???判定是否服务器连通接口
    // ConnectTest() {
    //   NET.tempRequest(
    //     API.useConnectTest,
    //     {
    //       url: this.serverURL,
    //     },
    //     "POST"
    //   )
    //     .then((res) => {
    //       if (res.data.code == 200) {
    //         let that = this;
    //         this.$refs.uToast.show({
    //           type: "success",
    //           message: "登录成功！",
    //           duration: 1000,
    //           complete() {

    //             uni.setStorageSync("putStationArr", that.putStationArr);
    //             uni.reLaunch({
    //               url: "../index/index",
    //             });
    //           },
    //         });
    //       } else {
    //         uni.showToast({
    //           title: res.data.msg,
    //           icon: "none",
    //           duration: 2500,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 1.点击登录后调用1：获取菜单权限及用户
    getUserInfo() {
      NET.tempRequest(API.workerInfo, {})
        .then((res) => {
          this.loading = false;
          // 赋值权限
          uni.setStorageSync("rights", res.data.data.rights);
          res.data.data.rights.forEach((item) => {
            this.menuOptions.forEach((menu) => {
              if (item.rights == menu.name) {
                menu.isShow = true;
              }
            });
          });

          // 保存菜单信息
          uni.setStorageSync("menuOptions", this.menuOptions);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    //  2.点击登录后调用2：判断该有用户是否有该工位
    isFPPosition() {
      NET.tempRequest(
        API.isFPPosition,
        {
          user_id: this.account,
          work_position: this.putStationArr[1].work_position_id,
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.getInfo();
            console.log("====!!");
            let that = this;
            that.$refs.uToast.show({
              type: "success",
              message: "登录成功！",
              duration: 1000,
              complete() {
                // 保存工位信息
                uni.setStorageSync("putStationArr", that.putStationArr);
                uni.reLaunch({
                  url: "../index/index",
                });
              },
            });
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2500,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 获取用户信息并保存
    getInfo() {
      NET.tempRequest(API.getInfo, {}, "POST")
        .then((res) => {
          if (res.statusCode == 200) {
            let userInfo = res.data;
            // 保存用户信息
            uni.setStorageSync("userInfo", userInfo);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 扫码
    scanCode() {
      // 只允许通过相机扫码
      uni.scanCode({
        onlyFromCamera: true,
        success: function (res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
        },
      });
    },

    // 获取版本信息
    getAppVersion() {
      const lave = API.edition; //版本号  这个是每次打包的时候必须保存  需要与manifest.json里面的版本号一致
      console.log("当前版本lave:", lave);
      uni.showToast({
        title: lave,
        icon: "none",
        duration: 2000,
      });
      NET.workRequest(API.getAppVersion, {}, "POST")
        .then((res) => {
          console.log("当前接口返回的版本:", res.data.data.version);
          console.log("当前接口返回的路径:", res.data.data.filepath);

          if (res.data.code == 200) {
            if (res.data.data.version > lave) {
              this.updateShow = true;
              // 赋值url
              this.appUrl = res.data.data.filepath;
              console.log(this.appUrl);
            }
          } else {
            console.log("获取版本失败！204");
            return;
          }
        })
        .catch((err) => {
          uni.showToast({
            title: err.data.message,
            icon: "none",
          });
        });
    },
    // 下载新的版本
    doUpData() {
      NET.workRequest(API.getAppVersion, {}, "POST")
        .then((res) => {
          console.log(res, "更新请求");
          if (res.data.code == 200) {
            // debugger
            autoUpdater.init({
              packageUrl: res.data.data.filepath,
              content:
                res.data.data.content ||
                "发现新版本，升级后体验更流畅！不升级当前版本不可使用！",
              contentAlign: "left",
              cancel: "取消",
              cancelColor: "#007fff",
              // logo: "/static/logo_updata.png",
              logo: "",
            });
            autoUpdater.show();
          } else {
            uni.showToast({
              title: "系统错误,请联系管理员",
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.text-c {
  font-size: 18.63rpx;
  font-family: douyu;
  font-weight: normal;
  color: #333333;
}

.input-box {
  width: 100%;
  height: 65.23rpx;
  margin-top: 46.59rpx;
}

.text-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  // width: 7.45rpx;
}

.p-p /deep/ .u-popup__content {
  background-color: #f0f0f0;
  border-radius: 40px !important;
  padding: 37.27rpx 18.63rpx 37.27rpx 18.63rpx;
}

.popup-server {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 410.06rpx;
  height: 279.58rpx;
}

.content {
  height: 100vh;
  width: 100vw;
  // background-color: #387bfc;
  display: flex;
  position: relative;
  overflow: hidden;

  .ball1 {
    position: absolute;
    background: url("../../static/image/left-bottom.png");
    height: 257.22rpx;
    width: 257.22rpx;
    background-size: 100% 100%;
    bottom: -93.19rpx;
    left: -55.91rpx;
    z-index: 1;
  }
  .ball2 {
    position: absolute;
    background: url("../../static/image/left-bottom.png");
    height: 257.22rpx;
    width: 257.22rpx;
    background-size: 100% 100%;
    top: -93.19rpx;
    right: -83.87rpx;
    z-index: 1;
  }

  .logo {
    position: absolute;
    left: 46.59rpx;
    top: 46.59rpx;
    width: 89.46rpx;
    height: 27.95rpx;
    background: url("../../static/icon/logo.png") no-repeat;
    background-size: 100%;
  }
}

.banner {
  background-color: #ffffff;
  width: 363.46rpx;
  height: 344.82rpx;
  position: absolute;
  bottom: 46.59rpx;
  left: 46.59rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 40.07rpx;
  box-shadow: 3.72rpx 0rpx 36.34rpx rgba(56, 123, 252, 0.1);
  z-index: 5;

  .banner-img {
    background: url("../../static/image/login-beer.png");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 65%;
    width: 70%;
    margin: 0 auto;
    // margin-bottom: 50px;
  }
}

.login {
  background-color: #f0f0f0;
  width: 363.46rpx;
  height: 344.82rpx;
  position: absolute;
  bottom: 46.59rpx;
  right: 46.59rpx;
  border-radius: 40.07rpx;
  z-index: 4;

  .login-enter {
    height: 100%;
    margin-left: 69.89rpx;
    position: relative;

    .input-box {
      width: 80%;
      // height: 50px;
      margin: 0 auto;
      margin-bottom: 22.36rpx;

      .enter {
        margin-bottom: 20px;
      }
    }

    // 工位
    .station {
      display: flex;
      position: relative;

      .station-scan {
        min-width: 36.34rpx;
        min-height: 36.34rpx;
        margin-left: 9.31rpx;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .scan-icon {
          height: 50%;
          width: 50%;
          background: url("../../static/icon/scan.png");
          background-size: 100%;
          background-repeat: no-repeat;
        }
      }
    }

    .login-btn {
      border-radius: 50px;
      background: linear-gradient(88deg, #81acff 0%, #387bfc 100%);
      font-size: 17px;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      letter-spacing: 5px;
      cursor: pointer;
    }

    .login-btn:hover {
      background: #74a5ff;
    }

    // 设置
    .login-setting {
      position: absolute;
      bottom: 15.84rpx;
      right: 32.61rpx;
      color: #3c7dfc;
      font-size: 12.11rpx;
    }
  }
}

.title {
  font-size: 16.78rpx;
  font-family: douyu;
  font-weight: normal;
  line-height: 44.73rpx;
  color: #333333;
  text-align: center;
  padding-top: 18.63rpx;
}

.station-pre {
  background: url("../../static/icon/station.png");
  height: 19.57rpx;
  width: 20.5rpx;
  background-repeat: no-repeat;
  background-size: 100%;
}

// 覆盖样式
/deep/ .u-input {
  background: #fff;
  height: 35.41rpx;
  border-radius: 40.07rpx;
  font-size: 33.55rpx;
  padding: 0px !important;

  .u-input__content {
    padding-left: 18.63rpx;
  }
}

// 图标插槽
/deep/ .u-input__content__field-wrapper__field {
  height: 46.59rpx;
  line-height: 48.46rpx;
  font-size: 13.04rpx !important;
}

/deep/ .u-input__content__clear {
  margin-right: 18.63rpx;
}

/deep/ .u-input__content__subfix-icon {
  margin-right: 9.31rpx;
}

// 登录按钮
/deep/ .u-button__text {
  font-size: 13.04rpx !important;
}
</style>
