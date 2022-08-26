<template>
  <view class="body">
    <view class="header-box"
      ><u-button
        color="#f9f8fe"
        icon="setting"
        iconColor="#000"
        text=""
      ></u-button
    ></view>
    <!-- 信息 -->
    <view class="menus-message">
      <view class="message-btn message-btn1">
        <text style="color: #606266">时间</text>
        <text style="color: #387bfc">：</text>
        2022年11月11日
      </view>
      <view class="message-btn message-btn2">
        <text style="color: #606266">生产线</text>
        <text style="color: #387bfc">：</text>
        {{ makeLineName }}
      </view>
      <view class="message-btn message-btn3">
        <text style="color: #606266">工位</text>
        <text style="color: #387bfc">：</text>
        {{ workPositionName }}
      </view>
      <view class="message-btn message-btn4">
        <text style="color: #606266">员工</text>
        <text style="color: #387bfc">：</text>
        {{ userName }}
      </view>
    </view>

    <!-- 流程图 -->
    <flow></flow>

    <!-- charts -->
    <view class="menus-chart">
      <!-- 设备编码 -->
      <view class="chart-content chart-code">
        <view class="chart-title">
          <view class="title-name">设备编码</view>
          <!-- <view class="title-more" @click="moreClick('code')"
            ><u-icon name="more-dot-fill" size="20"></u-icon
          ></view> -->
        </view>
        <view class="chart-shape">
          <view class="chart-one">
            <!-- 波浪圆 -->
            <view class="circle-1"><view class="circle-icon"></view></view>
            <view class="circle-2"></view>
            <view class="circle-3"></view>
            <view class="circle-4"></view>
            <!-- 编码 -->
            <view class="code">{{ device_code }}</view>
          </view>
        </view>
      </view>
      <!-- 运行状态 -->
      <view class="chart-content chart-state">
        <view class="chart-title">
          <view class="title-name">运行状态</view>
          <!-- <view class="title-more" @click="moreClick('state')"
            ><u-icon name="more-dot-fill" size="20"></u-icon
          ></view> -->
        </view>
        <!-- 仪表盘 -->
        <view class="chart-shape">
          <view class="chart-two">
            <qiun-data-charts
              type="gauge"
              :opts="{
                title: { offsetY: 0 },
                subtitle: {
                  name: '异常',
                  color: '#FD1800',
                  offsetY: -30,
                  fontSize: 14,
                },
                extra: {
                  gauge: {
                    type: 'default',
                    width: 10,
                    splitLine: { fixRadius: -10, width: 15 },
                    padding: ['46.59rpx', '18.63rpx', '9.31rpx', '18.63rpx'],
                  },
                },
              }"
              background="none"
              :chartData="chartsDataGauge2"
            />
          </view>
        </view>
      </view>
      <!-- LOE -->
      <view class="chart-content chart-loe">
        <view class="chart-title">
          <view class="title-name">LOE</view>
          <!-- <view class="title-more" @click="moreClick('loe')"
            ><u-icon name="more-dot-fill" size="20"></u-icon
          ></view> -->
        </view>
        <view class="chart-shape">
          <view class="chart-thr"
            ><qiun-data-charts
              type="gauge"
              :opts="opts"
              :chartData="chartsDataGauge1"
          /></view>
        </view>
      </view>
    </view>

    <!-- 消息 -->
    <view class="menus-info">
      <!-- 重要事项 -->
      <view class="info-content signify">
        <!-- title -->
        <view class="info-title">
          <view class="title-name">重要事项</view>
          <view class="title-more" @click="moreClick('important')"
            ><u-icon name="more-dot-fill" size="15"></u-icon
          ></view>
        </view>
        <!-- msg -->
        <view class="info-msg">
          <view
            class="msg-ranking"
            v-for="(importItem, importIdx) in importantMsg"
            :key="importIdx"
            @click="getDetailMsg(importItem, '重要消息')"
          >
            <view class="ranking-icon last-important-msg" :class="`imp${importIdx + 1}`">{{
              importIdx + 1
            }}</view>
            <view class="ranking-title">{{ importItem.message_content }}</view>
          </view>
        </view>
      </view>
      <!-- 通知消息 -->
      <view class="info-content inform">
        <!-- title -->
        <view class="info-title">
          <view class="title-name">通知消息</view>
          <view class="title-more" @click="moreClick('notify')"
            ><u-icon name="more-dot-fill" size="15"></u-icon
          ></view>
        </view>
        <!-- msg -->
        <view class="info-msg">
          <view
            class="msg-ranking"
            v-for="(notifyItem, notifyIdx) in notifyMsg"
            :key="notifyIdx"
            @click="getDetailMsg(notifyItem, '通知消息')"
          >
            <view class="ranking-icon"
              ><u-icon name="volume-fill" color="#5071FF" size="15"></u-icon
            ></view>
            <view class="ranking-title">{{ notifyItem.message_content }}</view>
          </view>
        </view>
      </view>
      <!-- 异常信息 -->
      <view class="info-content anomaly">
        <!-- title -->
        <view class="info-title">
          <view class="title-name">异常信息</view>
          <view class="title-more" @click="moreClick('abnormal')"
            ><u-icon name="more-dot-fill" size="15"></u-icon
          ></view>
        </view>
        <!-- msg -->
        <view class="info-msg">
          <view
            class="msg-ranking"
            v-for="(abnormalItem, abnormalIdx) in abnormalMsg"
            :key="abnormalIdx"
            @click="getDetailMsg(abnormalItem, '异常消息')"
          >
            <view class="ranking-icon"
              ><u-icon color="#FF739C" name="info-circle" size="15"></u-icon
            ></view>
            <view class="ranking-title">{{
              abnormalItem.message_content
            }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 历史消息弹出层 -->
    <u-popup
      :show="historyMsgShow"
      @close="historyMsgShow = false"
      @open="historyMsgShow = true"
      :round="20"
      mode="center"
    >
      <view class="msg-slot">
        <view class="msg-slot-title">
          <text>{{ historyTitle }}</text>
        </view>
        <!-- 历史消息列表 -->
        <template v-if="!loadingShow">
          <view class="msg-slot-content">
            <view class="table-header">
              <view class="table-content" style="width: 30%">消息时间</view>
              <view class="table-content" style="width: 40%">消息内容</view>
              <view class="table-content" style="text-align: center"
                >处理状态</view
              >
              <view class="table-content" style="text-align: center"
                >查看详情</view
              >
            </view>
            <view class="table-row">
              <u-list
                class="table-list-slot"
                @scrolltolower="pageNext(historyTitle)"
              >
                <u-list-item v-for="(item, idx) in historyMsg" :key="idx">
                  <view class="list-slot-row">
                    <!-- 消息时间 -->
                    <view class="table-content" style="width: 30%">{{
                      item.create_time
                    }}</view>
                    <!-- 消息内容 -->
                    <view
                      class="table-content content-hidden"
                      style="width: 40%"
                      >{{ item.message_content }}</view
                    >
                    <!-- 处理状态 -->
                    <view
                      class="table-content"
                      style="display: flex; justify-content: center"
                    >
                      <u-tag
                        v-if="item.deal_state == 0"
                        style="width: 62px"
                        text="未处理"
                        bgColor="#F4F4F5"
                        borderColor="#909399"
                        color="#909399"
                        plain
                        plainFill
                      ></u-tag>
                      <u-tag
                        v-else
                        style="width: 50px"
                        text="已处理"
                        type="success"
                        plain
                        plainFill
                      ></u-tag>
                    </view>
                    <!-- 查看详情 -->
                    <view
                      class="table-content"
                      style="
                        text-align: center;
                        color: #1b68fe;
                        text-decoration: underline;
                      "
                      @click="msgDetailClick(item)"
                    >
                      查看
                    </view>
                  </view>
                </u-list-item>
              </u-list>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="loading"
            ><u-loading-icon
              mode="circle"
              color="rgb(56, 123, 252)"
              size="28"
              text="加载中"
              duration="900"
            ></u-loading-icon
          ></view>
        </template>
      </view>
    </u-popup>

    <!-- 消息详情弹出层 -->
    <u-popup
      :show="msgDetailShow"
      @close="msgDetailShow = false"
      @open="msgDetailShow = true"
      closeable
      :closeOnClickOverlay="false"
      :round="20"
      mode="center"
    >
      <view class="msg-slot-detail">
        <view class="slot-detail-title">{{ newMsgTitle }}</view>
        <view class="slot-detail-content">
          <view class="content-info">
            <view class="content-text">消息时间</view>
            <view class="content-text">消息类型</view>
            <view class="content-text" v-if="isNewMsgIn">处理状态</view>
            <view class="content-text">消息内容</view>
          </view>
          <view class="content-main">
            <!-- 消息时间 -->
            <view class="content-text">{{ msgDetailTime }}</view>
            <!-- 消息类型 -->
            <view class="content-text" style="color: #409eff">{{
              msgDetailType
            }}</view>
            <!-- 处理状态 -->
            <template v-if="isNewMsgIn">
              <view class="content-text" v-if="msgDetailState == 0">
                <u-tag
                  style="width: 62px; height: 21px"
                  text="未处理"
                  bgColor="#F4F4F5"
                  borderColor="#909399"
                  color="#909399"
                  plain
                  plainFill
                ></u-tag>
              </view>
              <view class="content-text" v-if="msgDetailState == 1"
                ><u-tag
                  style="width: 62px; height: 21px"
                  text="已处理"
                  type="success"
                  plain
                  plainFill
                ></u-tag
              ></view>
            </template>
            <!-- 消息内容 -->
            <view class="content-text">{{ msgDetailContent }}</view>
            <!-- <view class="content-text">阿萨德奥术大师大所大所大所多奥术大师大所大所打算打打算奥术大师大所大所打算打打算奥术大师大所大所打算打打算</view> -->
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import flow from "./flow/flow.vue";
import NET from "../../utils/request.js";
import API from "../../config/api.js";

export default {
  components: { flow },
  data() {
    return {
      // 运行状态chart图配置
      opts: {
        title: {
          name: "98%",
          color: "#458EFD",
          fontSize: 25,
          offsetY: -5,
        },
        subtitle: {
          name: "实时值",
          color: "#458EFD",
          fontSize: 14,
          offsetY: 0,
        },
        extra: {
          gauge: {
            type: "progress",
            width: 10,
            startAngle: 0.75,
            endAngle: 0.25,
            splitLine: {
              splitNumber: 5,
              childNumber: 5,
              width: 1,
              childWidth: 12,
            },
          },
        },
      },
      chartsDataGauge1: {
        categories: [
          {
            value: 0.1,
          },
          {
            value: 1,
          },
        ],
        series: [
          {
            name: "",
            data: 0.98,
          },
        ],
      },
      chartsDataGauge2: {
        categories: [
          {
            value: 0.3,
            color: "#2CFF00",
          },
          {
            value: 0.7,
            color: "#EFFF00",
          },
          {
            value: 1,
            color: "#FD1800",
          },
        ],
        series: [
          {
            name: "",
            data: 0.98,
          },
        ],
      },
      // 设备编码
      device_code: "",

      // 标题上方生产线/工位/员工名称
      makeLineName: "",
      workPositionName: "",
      userName: "",

      // 最新重要消息/通知消息/异常消息
      importantMsg: [],
      notifyMsg: [],
      abnormalMsg: [],
      // 历史消息active显示
      historyMsg: [],
      historyTitle: "",
      // 历史记录数据加载中
      loadingShow: true,
      // 消息通知弹出
      historyMsgShow: false,

      // 消息详情
      msgDetailShow: false,
      // 消息详情时间/类型/状态/内容
      msgDetailTime: "",
      msgDetailType: "",
      msgDetailState: "",
      msgDetailContent: "",
      // 是否从最新消息点击进入/最新消息进入标题
      isNewMsgIn: true,
      newMsgTitle: "",

      // 分页
      currPage: 1,
      maxPageCount: 8,
      total: 1,
    };
  },
  mounted() {
    //获取设备信息
    this.getDeviceData();
    //获取当前工位的流转卡信息
    this.getWorkCardData();
    // 获取最新消息
    // this.getAllNewMsg();

    // 赋值生产线/工位/员工名称
    this.makeLineName = uni.getStorageSync("putStationArr")[0].name;
    this.workPositionName = uni.getStorageSync("putStationArr")[1].name;
    this.userName = uni.getStorageSync("userInfo").NAME;
  },
  methods: {
    //? =====交互逻辑=====
    // 点击更多查看消息历史
    moreClick(ident) {
      this.historyMsgShow = true;
      // 重置分页
      this.currPage = 1;
      this.historyMsg = [];
      switch (ident) {
        case "important":
          this.historyTitle = "历史重要消息";
          this.getHistoryMsg(2);
          break;
        case "notify":
          this.historyTitle = "历史通知消息";
          this.getHistoryMsg(1);
          break;

        case "abnormal":
          this.historyTitle = "历史异常消息";
          this.getHistoryMsg(3);
          break;
      }
    },

    // 历史消息列表触底
    pageNext(title) {
      console.log("触底", title);
      this.currPage = this.currPage + 1;
      if (title == "历史重要消息") {
        if (this.currPage > this.total) {
          return;
        }
        this.getHistoryMsg(2);
      } else if (title == "历史通知消息") {
        if (this.currPage > this.total) {
          return;
        }
        this.getHistoryMsg(1);
      } else if (title == "历史异常消息") {
        if (this.currPage > this.total) {
          return;
        }
        this.getHistoryMsg(3);
      }
    },

    // 查看消息详情点击
    msgDetailClick(item) {
      this.getDetailMsg(item);
    },

    //? =====数据处理=====
    //获取当前工位的流转卡信息 参数 work_position_id
    getWorkCardData() {
      NET.tempRequest(API.workOrder + "/1", {}, "GET").then((res) => {
        console.log(res);
      });
    },

    // 获取设备信息(编码/ID)
    getDeviceData() {
      NET.tempRequest(
        API.workPosition + "/5521fcc5c02443a5a6ada9581c9bda73",
        {}
      )
        .then((res) => {
          if (res.data.code == 200) {
            this.device_code = res.data.data.device_code;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    // 获取最新重要消息、通知消息、异常信息（1：通知消息，2：重要事项，3：异常信息）
    // getAllNewMsg() {
    //   NET.tempRequest(API.newImportantMessage + "/2", {}, "GET")
    //     .then((res) => {
    //       if (res.data.code == 200) {
    //         this.importantMsg = res.data.data;
    //       } else if (res.data.code == 204) {
    //         uni.showToast({
    //           title: res.data.msg,
    //           icon: "none",
    //           duration: 2000,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       uni.showToast({
    //         title: err.data.msg,
    //         icon: "none",
    //         duration: 2000,
    //       });
    //     });
    //   NET.tempRequest(API.newNoticeMessage + "/1", {}, "GET")
    //     .then((res) => {
    //       if (res.data.code == 200) {
    //         this.notifyMsg = res.data.data;
    //       } else if (res.data.code == 204) {
    //         uni.showToast({
    //           title: res.data.msg,
    //           icon: "none",
    //           duration: 2000,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       uni.showToast({
    //         title: err.data.msg,
    //         icon: "none",
    //         duration: 2000,
    //       });
    //     });
    //   NET.tempRequest(API.newAbnormalMessage + "/3", {}, "GET")
    //     .then((res) => {
    //       if (res.data.code == 200) {
    //         this.abnormalMsg = res.data.data;
    //       } else if (res.data.code == 204) {
    //         uni.showToast({
    //           title: res.data.msg,
    //           icon: "none",
    //           duration: 2000,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       uni.showToast({
    //         title: err.data.msg,
    //         icon: "none",
    //         duration: 2000,
    //       });
    //       console.log(err);
    //     });
    // },

    // 获取历史重要消息、通知消息、异常消息（1：通知消息，2：重要事项，3：异常信息）
    getHistoryMsg(type) {
      NET.tempRequest(
        API.historyImportantMessage,
        {
          maxPageCount: this.maxPageCount,
          currPage: this.currPage,
          message_type: type,
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            this.loadingShow = false;
            this.historyMsg = this.historyMsg.concat(res.data.data.list);
            this.total = res.data.data.total;
          }
        })
        .catch((err) => {
          this.loadingShow = false;
          console.log(err);
        });
    },

    // 获取点击的消息详情
    getDetailMsg(params, title) {
      this.msgDetailShow = true;
      this.newMsgTitle = title;
      NET.tempRequest(API.readMsg, { params: params }, "POST")
        .then((res) => {
          if (res.data.code == 200) {
            console.log(params);
            if (params.deal_state == 0 || params.deal_state == 1) {
              console.log("历史");
              this.isNewMsgIn = true;
              // 赋值消息详情
              this.msgDetailTime = res.data.data.params.create_time;
              if (res.data.data.params.message_type == 2) {
                this.msgDetailType = "重要消息";
              } else if (res.data.data.params.message_type == 1) {
                this.msgDetailType = "通知消息";
              } else if (res.data.data.params.message_type == 3) {
                this.msgDetailType = "异常消息";
              }
              this.msgDetailState = res.data.data.params.deal_state;
              this.msgDetailContent = res.data.data.params.message_content;
            } else {
              console.log("最新");
              this.isNewMsgIn = false;
              // 赋值消息详情
              this.msgDetailTime = res.data.data.params.create_time;
              if (res.data.data.params.message_type == 2) {
                this.msgDetailType = "重要消息";
              } else if (res.data.data.params.message_type == 1) {
                this.msgDetailType = "通知消息";
              } else if (res.data.data.params.message_type == 3) {
                this.msgDetailType = "异常消息";
              }
              this.msgDetailContent = res.data.data.params.message_content;
            }
          } else if (res.data.code == 204) {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes wave1 {
  0% {
    transform: scale(1);
    // -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1);
    opacity: 0.3;
  }
  75% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
@keyframes wave2 {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  25% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1);
    opacity: 0.3;
  }
  75% {
    transform: scale(1.3);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}
@keyframes wave3 {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  25% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1);
    opacity: 0.3;
  }
  75% {
    transform: scale(1.15);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.25);
    opacity: 0;
  }
}

.body {
  width: 100%;
  // height: 100%;
  background-color: #f9f8fe;
}

// 头部按钮
.header-box {
  position: absolute;
  right: 0;
  top: 9.31rpx;
  width: 38.21rpx;
  height: 38.21rpx;
  background-color: transparent;
}

// 信息
.menus-message {
  display: flex;
  width: 100%;
  height: 26.09rpx;
  .message-btn {
    margin-right: 10px;
    padding: 0 5px;
    line-height: 26.09rpx;
    text-align: center;
    border-radius: 7.45rpx;
    box-shadow: 0 2px 6px rgba(9, 50, 128, 0.2);
    background-color: #fff;
    font-size: 9.31rpx;
    width: 139.79rpx;
    max-width: 139.79rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .message-btn1 {
    width: 158.43rpx;
    margin-left: 9.31rpx;
  }
  .message-btn4 {
    width: 107.17rpx;
  }
}

// echarts
.menus-chart {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 177.07rpx;
  margin-bottom: 18.63rpx;
  .chart-content {
    flex: 1;
    width: 167.75rpx;
    max-width: 167.75rpx;
    background-color: #ffffff;
    // background-color: #d5d5d5;
    margin: 0 9.31rpx;
    border-radius: 12.11rpx;
  }
  .chart-code {
  }
  .chart-state {
  }
  .chart-loe {
  }
}
// title头部
.chart-title {
  height: 41rpx;
  padding: 0 9.31rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-name {
    color: #303233;
    font-size: 11.18rpx;
  }
  .title-more {
    width: 41rpx;
    height: 41rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
// 单个chrats
.chart-shape {
  height: calc(100% - 41rpx);
  display: flex;
  align-items: center;
  justify-content: center;
  .chart-one {
    width: 90%;
    height: 149.11rpx;
    position: relative;
    // 波浪
    .circle-1 {
      width: 74.55rpx;
      height: 74.55rpx;
      border-radius: 50%;
      background-image: linear-gradient(120deg, #77f4f7, #17cdc8);
      left: 0;
      right: 0;
      top: 18.63rpx;
      bottom: 0;
      margin: 0 auto;
      position: absolute;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      .circle-icon {
        width: 45%;
        height: 45%;
        background-image: url("../../static/icon/code.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .circle-2 {
      width: 74.55rpx;
      height: 74.55rpx;
      border-radius: 50%;
      background: #cefffa;
      left: 0;
      right: 0;
      top: 18.63rpx;
      bottom: 0;
      margin: 0 auto;
      position: absolute;
      z-index: 4;
      animation: wave1 3s ease-in-out infinite;
    }
    .circle-3 {
      width: 74.55rpx;
      height: 74.55rpx;
      border-radius: 50%;
      background: rgb(82, 255, 246);
      left: 0;
      right: 0;
      top: 18.63rpx;
      bottom: 0;
      margin: 0 auto;
      position: absolute;
      z-index: 3;
      animation: wave2 3s ease-in-out infinite;
    }
    .circle-4 {
      width: 74.55rpx;
      height: 74.55rpx;
      border-radius: 50%;
      background: rgb(0, 255, 242);
      left: 0;
      right: 0;
      top: 18.63rpx;
      bottom: 0;
      margin: 0 auto;
      position: absolute;
      z-index: 3;
      animation: wave3 3s ease-in-out infinite;
    }
    .code {
      position: absolute;
      bottom: 27.95rpx;
      left: 0;
      right: 0;
      margin: 0 auto;
      text-align: center;
      color: #3fdddc;
      font-weight: bold;
      font-size: 11.18rpx;
    }
  }
  .chart-two {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .chart-thr {
    width: 90%;
    height: 100%;
  }
}
.chart-two /deep/ canvas {
  margin-top: 46.59rpx !important;
}

// 消息/信息
.menus-info {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  height: 149.11rpx;
  .info-content {
    width: 167.75rpx;
    max-width: 167.75rpx;
    flex: 1;
    // min-width: 300px;
    // background-color: #d5d5d5;
    background-color: #ffffff;
    margin: 0 9.31rpx;
    border-radius: 12.11rpx;
  }
}
// title头部
.info-title {
  height: 41rpx;
  display: flex;
  justify-content: space-between;
  padding: 0 9.31rpx;
  align-items: center;
  .title-name {
    color: #303233;
    font-size: 11.18rpx;
  }
  .title-more {
    width: 41rpx;
    height: 41rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.info-msg {
  overflow-y: scroll;
  height: calc(100% - 41rpx);
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  padding: 0 8.38rpx;
  .msg-ranking {
    max-width: 186.39rpx;
		padding: 10.25rpx 0;
    display: flex;
    .ranking-icon {
      margin-right: 9.31rpx;
      width: 14.91rpx;
      min-width: 14.91rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 14.91rpx;
      line-height: 14.91rpx;
      border-radius: 50%;
      text-align: center;
      font-size: 11.18rpx;
      color: #ffffff;
    }
    .ranking-title {
			// height: 20px;
      font-size: 11.18rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .imp1 {
      background-color: #28c96d !important;
    }
    .imp2 {
      background-color: #ff903d !important;
    }
    .imp3 {
      background-color: #1574ff !important;
    }
		.last-important-msg{
			background-color: rgba(172, 172, 172, 0.945)
		}
  }
}

// 历史消息弹出层popup
.msg-slot {
  width: 512.58rpx;
  height: 372.78rpx;
  overflow-y: scroll;
  padding: 18.63rpx 37.27rpx 18.63rpx;
  .msg-slot-title {
    text-align: center;
    margin-bottom: 18.63rpx;
    font-size: 17.7rpx;
  }
  .msg-slot-content {
    height: calc(100% - 97.85rpx);
    padding: 18.63rpx 13.97rpx;
    border: 0.93rpx solid #ebeef5;
    border-radius: 10.25rpx;
    .table-header {
      display: flex;
      width: 100%;
      padding: 0 0 18.63rpx;
      color: #606266;
    }
    .table-row {
      height: calc(100% - 23.29rpx);
      .table-list-slot {
        height: 100% !important;
        .list-slot-row {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #606266;
          padding: 13.97rpx 0;
          border-top: 1px solid #ebeef5;
          font-size: 13.97rpx;
          .content-hidden {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
// 历史消息弹出层content
.table-content {
  width: 20%;
  font-size: 11.18rpx;
}
// 历史加载中
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
}

// 消息详情弹出层popup
.msg-slot-detail {
  width: 512.58rpx;
  height: 372.78rpx;
  overflow-y: scroll;
  padding: 37.27rpx 37.27rpx 0;
  .slot-detail-title {
    text-align: center;
    margin-bottom: 18.63rpx;
    font-size: 17.7rpx;
  }
  .slot-detail-content {
    font-size: 13.04rpx;
    display: flex;
    height: calc(100% - 116.49rpx);
    padding: 18.63rpx 13.97rpx;
    border: 0.93rpx solid #ebeef5;
    border-radius: 10.25rpx;
    .content-info {
      display: flex;
      flex-direction: column;
      width: 102.51rpx;
      text-align: center;
      color: #99a9bf;
    }
    .content-main {
      width: calc(100% - 102.51rpx);
      color: #606266;
    }
    .content-text {
      padding: 13.97rpx 18.63rpx;
    }
  }
}
</style>
