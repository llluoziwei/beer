<template>
  <view class="page">
    <!-- 左侧title -->
    <view class="title">
      <text v-if="title == '嘉威首页'">嘉威啤酒MES</text>
      <text v-if="title == '启动开班'">启动开班</text>
      <text v-if="title == '开班检查'">开班检查</text>
      <text v-if="title == '启动清场'">启动清场</text>
      <text v-if="title == '清场检查'">清场检查</text>
      <text v-if="title == '启动清单'">启动清单</text>
      <text v-if="title == '清单检查'">清单检查</text>
      <text v-if="title == '收料确认'">收料确认</text>
      <text v-if="title == '生产投料'">生产投料</text>
      <text v-if="title == '作业记录'">作业记录</text>
      <text v-if="title == '产出登记'">产出登记</text>
      <text v-if="title == 'E-SOP'">E-SOP</text>
      <text v-if="title == '生产巡线'">生产巡线</text>
      <text v-if="title == '专项检查'">专项检查</text>
      <text v-if="title == '停机记录'">停机记录</text>
      <!-- 右侧功能按钮 -->
      <!-- <view class="func-btn">
        <view class="idx" v-if="current == 0">
          <u-button
            color="#fff"
            icon="setting"
            iconColor="#000"
            text=""
          ></u-button>
        </view>
        <view class="history" v-if="current == 4 || current == 9">
          <u-button
            type="primary"
            style="width: 100%; height: 100%; box-shadow: 0px 2px 6px #387bfc"
            color="#387BFC"
            icon="clock"
            text="查看历史"
            @click="historyClick(current)"
          ></u-button>
        </view>
        <view
          class="mult"
          @click="multClick(current)"
          v-if="
            current == 2 ||
            current == 4 ||
            current == 6 ||
            current == 8 ||
            current == 9
          "
        >
          <u-button
            type="primary"
            style="width: 100%; height: 100%; box-shadow: 0px 2px 6px #387bfc"
            color="#387BFC"
            icon="play-circle"
            text="多媒体"
          ></u-button>
        </view>
        <view class="fetch" v-if="current == 7 || current == 10">
          <u-button
            type="primary"
            style="width: 100%; height: 100%; box-shadow: 0px 2px 6px #387bfc"
            color="#387BFC"
            icon="order"
            text="取数"
          ></u-button>
        </view>
      </view> -->
    </view>
    <!-- <view
      class="main"
      :style="{
        width: current == 0 ? '100%' : 'calc(100% - 20px)',
        height: current == 0 ? 'calc(100% - 55px)' : 'calc(100% - 74px)',
        padding: current == 0 ? '0' : '20px 10px 10px',
        background: current == 0 ? '#f9f8fe' : 'rgb(255,255,255)',
      }"
    > -->
    <view class="main">
      <menus v-if="title == '嘉威首页'"></menus>
      <start-class v-if="title == '启动开班'"></start-class>
      <class-check v-if="title == '开班检查'"></class-check>
      <start-clean v-if="title == '启动清场'"></start-clean>
      <clean-check v-if="title == '清场检查'"></clean-check>
      <start-list v-if="title == '启动清单'"></start-list>
      <list-check v-if="title == '清单检查'"></list-check>
      <receiving-affirm v-if="title == '收料确认'"></receiving-affirm>
      <prod-feed v-if="title == '生产投料'"></prod-feed>
      <work-record v-if="title == '作业记录'"></work-record>
      <output-register v-if="title == '产出登记'"></output-register>
      <e-sop v-if="title == 'E-SOP'"></e-sop>
      <prod-line v-if="title == '生产巡线'"></prod-line>
      <special-check v-if="title == '专项检查'"></special-check>
      <halt-record v-if="title == '停机记录'"></halt-record>
    </view>

    <!-- 多媒体遮罩层 -->
    <!-- <u-popup
      :show="showMult"
      @close="showMult = false"
      @open="open"
      closeable
      :closeOnClickOverlay="false"
      :round="20"
      mode="center"
    >
      <view class="mult-slot">
        <view style="display: flex; margin-bottom: 15px">
          <view
            class="mult-upload picture-load"
            style="width: 50px; height: 50px"
            @click="picUpload"
          ></view>
          <view
            class="mult-upload camera-load"
            style="width: 50px; height: 50px"
            @click="cameraUpload"
          ></view>
          <view
            class="mult-upload video-load"
            style="width: 50px; height: 50px"
            @click="videoUpload"
          ></view>
          <view
            class="mult-upload file-load"
            style="width: 50px; height: 50px"
            @click="fileUpload"
          ></view>
        </view>
        <view class="">
          <view class="upload-list">
            <view class="upload-explain">相片</view>
            <view>
              <image-upload
                :max="3"
                v-model="imgUploadData"
                :uploadSuccess="imgSuccess"
                action="http://XXX"
              ></image-upload>
            </view>
          </view>
          <view class="upload-list">
            <view class="upload-explain">录像</view>
            <view
              ><image-upload
                :max="3"
                v-model="videoUploadData"
                :uploadSuccess="imgSuccess"
                action="http://XXX"
              ></image-upload
            ></view>
          </view>
          <view class="upload-list" style="margin-top: 10px">
            <view class="upload-explain">文件</view>
            <view style="width: 100%; margin-left: 5px">
              <uni-file-picker
                v-model="fileValue"
                file-mediatype="all"
                @select="select"
                @progress="progress"
                @success="success"
                @fail="fail"
              >
                <u-button
                  type="primary"
                  :plain="true"
                  style="height: 30px; width: 110px"
                  >选择文件</u-button
                >
              </uni-file-picker>
            </view>
          </view>
        </view>
        <view class="mult-submit-btn">
          <u-button
            type="primary"
            style="height: 39px; width: 110px"
            color="#387BFC"
            @click="multSubmit"
            >上传</u-button
          >
        </view>
      </view>
    </u-popup> -->

    <!-- 查看历史遮罩层 -->
    <!-- <u-popup
      :show="showHistory"
      @close="showHistory = false"
      @open="open"
      :round="20"
      mode="center"
    >
      <view class="history-slot">
        <view class="time-pick">
          <view @click.stop="showTime = true" style="width: 200px">
            <u-input
              v-model="timePick"
              disabled
              disabledColor="#ffffff"
              placeholder="选择日期时间"
              prefixIcon="clock"
              prefixIconStyle="font-size: 14px;color: #CCD0D6"
            >
            </u-input>
          </view>
        </view>
        <view class="history-step">
          <YSteps
            :lineNum="0"
            color="#fff"
            backgroundColor="#E4E7ED"
            :infoList="list"
          ></YSteps>
        </view>
      </view>
    </u-popup> -->

    <!-- 查看历史时间选择器 -->
    <!-- <u-datetime-picker
      ref="datetimePicker"
      :show="showTime"
      v-model="timeModel"
      mode="datetime"
      :formatter="formatter"
      @confirm="timeConfirm"
      @cancel="showTime = false"
    ></u-datetime-picker> -->
  </view>
</template>

<script>
import { timestamp } from "../../utils/timestamp";
import menus from "../../components/menus/menus.vue"; //主页
import startClass from "../../components/startClass/startClass.vue"; //启动开班
import classCheck from "../../components/classCheck/classCheck.vue"; //开班检查
import startList from "../../components/startList/startList.vue"; //启动清单
import listCheck from "../../components/listCheck/listCheck.vue"; //清单检查
import startClean from "../../components/startClean/startClean.vue"; //启动清场
import cleanCheck from "../../components/cleanCheck/cleanCheck.vue"; //清场检查
import receivingAffirm from "../../components/receivingAffirm/receivingAffirm.vue"; //收料确认
import prodFeed from "../../components/prodFeed/prodFeed.vue"; //生产投料
import workRecord from "../../components/workRecord/workRecord.vue"; //作业记录
import outputRegister from "../../components/outputRegister/outputRegister.vue"; //产出登记
import eSop from "../../components/eSop/eSop.vue"; //e-sop
import prodLine from "../../components/prodLine/prodLine.vue"; //生产巡线
import specialCheck from "../../components/specialCheck/specialCheck.vue"; //专项检查
import haltRecord from "../../components/haltRecord/haltRecord.vue"; //停机记录
// 外部插件
// import YSteps from "../../components/Y-Steps/Y-Steps.vue"; //进度条插件
// import imageUpload from "../../uni_modules/htz-image-upload/htz-image-upload.vue"; //图片/视频上传插件
export default {
  components: {
    menus,
    startClass,
    classCheck,
    startList,
    listCheck,
    startClean,
    cleanCheck,
    receivingAffirm,
    prodFeed,
    workRecord,
    outputRegister,
    eSop,
    prodLine,
    specialCheck,
    haltRecord,
    // history,

    // YSteps,
    // imageUpload,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 定义上方按钮点击
      // showHistory: false,
      // 时间选择
      // timePick: "",
      // showTime: false,
      // timeModel: Number(new Date()),
      // 历史记录列表
      // list: [
      //   {
      //     date: "2020-1-4",
      //     info: "的",
      //   },
      //   {
      //     date: "2020-1-4",
      //     info: "看见阿萨德和封口机撒的护肤科技撒地方即可撒地方就开始",
      //   },
      //   {
      //     date: "2020-1-4",
      //     info: "这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容",
      //   },
      //   {
      //     date: "2020-1-4",
      //     info: "这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容",
      //   },
      //   {
      //     date: "2020-1-4",
      //     info: "这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容",
      //   },
      //   {
      //     date: "2020-1-4",
      //     info: "这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容",
      //   },
      //   {
      //     date: "2020-1-4",
      //     info: "这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容",
      //   },
      //   {
      //     date: "2020-1-4",
      //     info: "这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容",
      //   },
      // ],
      // 多媒体选择
      // showMult: false,
      // imgUploadData: [],
      // videoUploadData: [],
      // fileValue: [],
      // imageStyles: {
      //   width: 64,
      //   height: 64,
      //   border: {
      //     color: "#ff5a5f",
      //     width: 2,
      //     style: "dashed",
      //     radius: "2px",
      //   },
      // },
    };
  },
  methods: {
    //? ======界面交互======
    // // 时间选择器
    // formatter(type, value) {
    //   if (type === "year") {
    //     return `${value}年`;
    //   }
    //   if (type === "month") {
    //     return `${value}月`;
    //   }
    //   if (type === "day") {
    //     return `${value}日`;
    //   }
    //   return value;
    // },
    // timeConfirm(e) {
    //   let commonTime = new Date(e.value);
    //   this.timePick = timestamp(commonTime, "Y-M-D H:m:s");
    //   this.showTime = false;
    // },
    //// 历史记录点击
    // historyClick(current) {
    //   this.showHistory = true;
    //   switch (current) {
    //     case 4:
    //       // 清单检查历史记录
    //       console.log("4h");
    //       break;
    //     case 9:
    //       //作业记录历史记录
    //       console.log("9h");
    //       break;
    //   }
    // },
    // // 多媒体点击
    // multClick(current) {
    //   this.showMult = true;
    //   switch (current) {
    //     case 2:
    //       // 开班检查多媒体
    //       console.log("2h");
    //       break;
    //     case 4:
    //       // 清单检查多媒体
    //       console.log("4h");
    //       break;
    //     case 6:
    //       // 清场检查多媒体
    //       console.log("6h");
    //       break;
    //     case 8:
    //       // 生产投料多媒体
    //       console.log("8h");
    //       break;
    //     case 9:
    //       // 作业记录多媒体
    //       console.log("9h");
    //       break;
    //   }
    // },
    // 图片上传
    picUpload() {},
    // 拍照上传
    cameraUpload() {},
    // 视频上传
    videoUpload() {},
    // 文件上传
    fileUpload() {},

    // 获取上传状态
    select(e) {
      console.log("选择文件：", e);
    },
    // 获取上传进度
    progress(e) {
      console.log("上传进度：", e);
    },
    // 上传成功
    success(e) {
      console.log("上传成功");
    },

    // 上传失败
    fail(e) {
      console.log("上传失败：", e);
    },

    //? ======数据逻辑======
    imgSuccess(res) {},
    // 多媒体提交
    multSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  // margin: 2% auto;
  margin-top: 0;
  border-radius: 13px;
  position: relative;
}

// 上方title与按钮
.title {
  font-family: douyu;
	font-size: 13.98rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9.31rpx 18.63rpx;
  height: 41rpx;
  color: #387bfc;
}
.func-btn {
  display: flex;
  // width: auto;
  height: 37px;
  .mult {
    width: 85px;
    height: 37px;
  }
  .history {
    width: 110px;
    height: 37px;
    margin-right: 10px;
  }
  .fetch {
    width: 80px;
    height: 37px;
  }
}

// 下方主体内容
.main {
  border-radius: 9.31rpx;
  // width: calc(100% - 20px);
  height: calc(100% - 74.55rpx);
  margin: 7.45rpx;
  overflow-y: scroll;
  background-color: #fff;
}

//查看历史slot
.history-slot {
  width: 1000px;
  height: 700px;
  overflow-y: scroll;
  padding: 20px;
}

//多媒体slot
.mult-slot {
  width: 800px;
  height: 600px;
  overflow-y: scroll;
  padding: 20px;
  padding-top: 40px;
  .mult-upload {
    margin-right: 20px;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  // 上传文字说明
  .upload-explain {
    min-width: 32px;
    line-height: 32px;
    color: #606266;
    font-size: 15px;
  }
  .picture-load {
    background-image: url("../../static/image/upload/1pic.png");
  }
  .camera-load {
    background-image: url("../../static/image/upload/2camer.png");
  }
  .video-load {
    background-image: url("../../static/image/upload/3video.png");
  }
  .file-load {
    background-image: url("../../static/image/upload/4file.png");
  }
  // 上传list
  .upload-list {
    display: flex;
  }
  // 提交按钮
  .mult-submit-btn {
    width: 180px;
    margin-top: 40px;
    height: 39px;
  }
}

// 多媒体日期选择框
/deep/.u-input__content__field-wrapper__field {
  font-size: 11.18rpx !important;
}

// 多媒体文件选择按钮
/deep/.files-button {
  width: 110px;
  height: 30px;
}
</style>
