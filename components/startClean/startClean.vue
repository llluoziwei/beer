<template>
  <!-- 启动清场 -->
  <view class="body">
    <view class="">
      <view
        style="
          color: #606266;
          font-size: 13.04rpx;
          margin: 9.31rpx 0 9.31rpx 13.97rpx;
        "
      >
        当前生产线情况：
      </view>
      <u--form
        labelWidth="100"
        labelAlign="right"
        :labelStyle="{ color: '#606266', fontSize: '10.25rpx' }"
      >
        <view
          style="
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
          "
        >
          <view style="width: 47%">
            <u-form-item label="生产线" prop="make_line_name"
              ><u--input readonly v-model="form.make_line_name"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="流转卡号" prop="work_card_no"
              ><u--input readonly v-model="form.work_card_no"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="生产订单号" prop="work_order_slide_no"
              ><u--input readonly v-model="form.work_order_slide_no"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="产品编码" prop="goods_code"
              ><u--input readonly v-model="form.goods_code"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="产品名称" prop="goods_name"
              ><u--input readonly v-model="form.goods_name"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="客户" prop="client"
              ><u--input readonly v-model="form.client"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="数量" prop="qu"
              ><u--input readonly v-model="form.qu"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="已完工数" prop="in_ok_qu"
              ><u--input readonly v-model="form.in_ok_qu"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="完工率" prop="complete_rate"
              ><u--input readonly v-model="form.complete_rate"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="班次" prop="work_time_nmae"
              ><u--input readonly v-model="form.work_time_nmae"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="开始时间" prop="beg_time"
              ><u--input readonly v-model="form.beg_time"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%">
            <u-form-item label="关班时间" prop="end_time"
              ><u--input readonly v-model="form.end_time"></u--input
            ></u-form-item>
          </view>
          <view style="width: 47%"></view>
        </view>
      </u--form>
      <view class="btn">
        <u-button
          type="primary"
          :disabled="form.make_line_process == 3 ? true : false"
          :loading="loading"
          loadingText="清场启动中..."
          text="清场启动"
          @click="clearbtn"
        ></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import NET from "../../utils/request.js";
import API from "../../config/api.js";
export default {
  data() {
    return {
      loading: false,
      // 生产线信息
      beltlineInfo: "",
      form: {
        make_line_process: "",
        beg_time: "",
        end_time: "",
        work_time_nmae: "",
        work_card_id: "", //流转卡id
        make_line_name: "", //生产线
        work_card_no: "", //流转卡号
        work_order_slide_no: "", //生产订单号
        goods_code: "", //产品编码
        goods_name: "", //产品名称
        client: "", //客户
        qu: "", //数量
        in_ok_qu: "", //已完工数
        complete_rate: "", //完工率
      },
    };
  },
  created() {
    let putStationArr = uni.getStorageSync("putStationArr");
    this.beltlineInfo = putStationArr;
    console.log(this.beltlineInfo, "得到的信息");
  },
  mounted() {
    // 获取可清场流转卡信息
    this.getWorkCardInfo();
  },
  methods: {
    //获取可清场流转卡信息
    getWorkCardInfo() {
      // 参数 生产线id make_line_id
      NET.request(
        API.findStartCheckLine + "/" + this.beltlineInfo[0].make_line_id,
        "POST"
      ).then((res) => {
        console.log(res, "res");
        if (res.data.code == 200) {
          if (res.data.data != null) {
            this.form = res.data.data;
          }
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
    // 点击操作时弹框
    clearbtn() {
      let that = this;
      uni.showModal({
        content: "确定此操作吗？",
        success: function (res) {
          if (res.confirm) {
            that.beginCleanLine();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    // 调用清场保存接口
    beginCleanLine() {
      this.loading = true;
      let data = this.form;
      //启动清场 参数 当前行数据
      NET.request(API.beginCleanLine, data, "POST").then((res) => {
        this.loading = false;
        if (res.data.code == 200) {
          this.getWorkCardInfo();
          uni.showToast({
            title: "启动清场成功",
            icon: "none",
            duration: 2000,
          });
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  // width: 88%;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.haltType {
  width: 65.23rpx;
  height: 33.73rpx;
  line-height: 33.73rpx;
  text-align: center;
  background-color: #f5f7fa;
  border: 0.93rpx solid #dadada;
  color: #909399;
  margin-left: -0.93rpx;
  zz-index: 999;
  border-top-right-radius: 3.72rpx;
  border-bottom-right-radius: 3.72rpx;
}
.btn {
  width: 121.15rpx;
  margin: 18.63rpx 0 0 100.65rpx;
}

/deep/ .input {
  border-radius: 0;
  border-top-left-radius: 3.72rpx;
  border-bottom-left-radius: 3.72rpx;
}
// 输入框高度
/deep/ .u-input {
  height: 16.77rpx;
}
</style>
