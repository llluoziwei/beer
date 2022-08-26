<template>
  <view class="body">
    <view
      style="
        font-size: 13.04rpx;
        margin: 9.31rpx 0 9.31rpx 13.97rpx;
        color: #303233;
      "
      >物料信息</view
    >
    <view class="">
      <u--form
        labelWidth="90"
        :labelStyle="{ color: '#606266' }"
        labelAlign="right"
      >
        <view class="form">
          <view class="form-item">
            <u-form-item label="物料编码" prop="goods_code"
              ><u-input color="#C2C7CE" disabled v-model="form.goods_code"
            /></u-form-item>
          </view>
          <view class="form-item">
            <u-form-item label="物料名称" prop="goods_name"
              ><u-input color="#C2C7CE" disabled v-model="form.goods_name"
            /></u-form-item>
          </view>
          <view class="form-item">
            <u-form-item label="未投数" prop="no_in_qu"
              ><u-input color="#C2C7CE" disabled v-model="form.no_in_qu"
            /></u-form-item>
          </view>
          <view class="form-item">
            <u-form-item label="本次投料" prop="in_qu"
              ><u-input color="#C2C7CE" disabled v-model="form.in_qu"
            /></u-form-item>
          </view>
        </view>
      </u--form>
    </view>
    <view class="main">
      <view class="main-form">
        <u--form
          :labelStyle="{ color: '#606266' }"
          labelWidth="90"
          labelAlign="right"
        >
          <view
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
            "
          >
            <u-form-item solt="right" label="批次" prop="batch">
              <u--input
                class="input"
                readonly
                v-model="form.batch_no"
              ></u--input>
              <view
                solt="right"
                name="arrow-right"
                class="batch"
                @click="selectbtn()"
                >选择批次</view
              >
            </u-form-item>
            <view
              @click="scan"
              style="margin-left: 18.63rpx; width: 23.29rpx; height: 23.29rpx"
            >
              <image
                style="width: 23.29rpx; height: 23.29rpx"
                src="../../../static/icon/scan.png"
                mode="aspectFit"
              ></image>
            </view>
            <!-- </u--image> -->
          </view>
          <view style="width: calc(37% + 4px)">
            <u-form-item label="投料数" prop="throw_qu"
              ><u-input v-model="form.throw_qu" type="number"
            /></u-form-item>
          </view>
        </u--form>
      </view>
      <view class="main-form-btn">
        <view style="width: 74.55rpx; height: 28.89rpx"
          ><u-button
            style="height: 100%"
            @click="save"
            :loading="saveLoad"
            type="primary"
            text="保存"
          ></u-button
        ></view>
        <view style="width: 74.55rpx; height: 28.89rpx"
          ><u-button
            style="height: 100%"
            @click="close"
            :customStyle="{ color: '#8a8f90' }"
            text="取消"
          ></u-button
        ></view>
        <view style="width: 102.51rpx; height: 28.89rpx"
          ><u-button
            style="height: 100%"
            @click="openList()"
            type="primary"
            text="查看已投信息"
          ></u-button
        ></view>
      </view>
    </view>
    <!-- 弹框 -->
    <u-picker
      :show="select_show"
      :columns="batch"
      keyName="batch_no"
      @confirm="confirm"
      @cancel="cancel"
    ></u-picker>
  </view>
</template>

<script>
import NET from "../../../utils/request.js";
import API from "../../../config/api.js";
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return new Object();
      },
    },
    prevCurrent: {
      type: Number,
      default: 1,
    },
    card_info: {
      type: Object,
      default: Object,
    },
  },
  data() {
    return {
      work_position_id: null,
      // 弹框 批次 列表选择
      batch: [],
      // 得到的列表
      list: [],
      // 弹框
      select_show: false,
      // 点击请选择按钮的下标
      select_key: 0,

      saveLoad: false, //保存按钮加载
      form: {
        goods_code: "",
        goods_name: "",
        in_qu: "",
        no_in_qu: "",
        batch: "", //批次
        batch_no: "", //批次号
        throw_qu: "", //投料数
      },
    };
  },
  created() {
    let putStationArr = uni.getStorageSync("putStationArr");
    this.beltlineInfo = putStationArr;
    this.work_position_id = putStationArr[1].work_position_id;
    this.form = this.data.item;
    console.log(this.form);
  },
  mounted() {
    // 获取批次
    this.findBatch();
    console.log(this.data, "sdfsf");
  },
  methods: {
    // 取消弹框
    cancel() {
      this.select_show = false;
    },
    // 确定选择
    confirm(e) {
      console.log(e);
      this.form.batch_no = e.value[0].batch_no;
      this.$forceUpdate();
      console.log(this.form.batch_no, "this.form.batch_no");
      this.select_show = false;
    },
    // 打开批次 弹框
    selectbtn() {
      this.select_show = !this.select_show;
    },
    // 查看已投信息
    openList() {
      let data = {
        current: 2,
        work_card_info: this.card_info,
      };
      this.$emit("openList", data);
    },
    //扫码
    scan() {
      uni.scanCode({
        success: function (res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
        },
      });
    },
    //返回上个界面
    close() {
      let data = {
        current: this.prevCurrent,
        work_card_info: this.card_info,
      };
      this.$emit("openList", data);
    },
    //保存 当前数据
    save() {
      console.log(this.form);
      this.saveLoad = true;
      let data = {
        work_card_id: this.card_info.work_card_id,
        goods_id: this.form.goods_id,
        batch_no: this.form.batch_no,
        work_position_id: this.work_position_id,
        qu: this.form.throw_qu,
        work_order_bom_id: this.form.work_order_bom_id,
      };
      this.SaveProdFeed(data);
    },
    //获取批次
    findBatch() {
      NET.request(API.findBatch, {}, "POST").then((res) => {
        if (res.data.code == 200) {
          this.batch = [res.data.data];
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
    //保存投料数量 参数 用户信息+流程卡信息 + 当前行信息+投料数量 +批次
    SaveProdFeed(data) {
      NET.request(API.SaveProdFeed, data, "POST").then((res) => {
        if (res.data.code == 200) {
          setTimeout(() => {
            let data = {
              current: this.prevCurrent,
            };
            this.saveLoad = false;
            this.$emit("openList", data);
          }, 1000);
        } else {
          this.saveLoad = false;
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
  width: 100%;
  height: 100%;
}
.form {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .form-item {
    width: 45%;
  }
}
.main {
  border: 0.93rpx solid #ebeef5;
  border-radius: 9.31rpx;
  margin-top: 18.63rpx;
  height: calc(100% - 158.43rpx);
  .main-form {
    margin-top: 18.63rpx;
    padding-left: 13.97rpx;
    .batch {
      width: 65.23rpx;
      height: 24.23rpx;
      line-height: 24.23rpx;
      text-align: center;
      font-size: 11.18rpx;
      background-color: #f5f7fa;
      border: 0.93rpx solid #dadada;
      color: #909399;
      margin-left: -0.93rpx;
      zz-index: 999;
      border-top-right-radius: 3.72rpx;
      border-bottom-right-radius: 3.72rpx;
    }
    /deep/ .input {
      border-radius: 0;
      border-top-left-radius: 3.72rpx;
      border-bottom-left-radius: 3.72rpx;
    }
  }
  .main-form-btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 55.91rpx;
    margin-top: 37.27rpx;
    view {
      margin-right: 18.63rpx;
    }
  }
}

// 生产投料表单输入框高度
/deep/ .u-input {
  height: 13.04rpx;
}

// 生产投料表单内字体大小
/deep/ .u-form-item__body__left__content__label {
  font-size: 11.18rpx;
}

// 保存/取消/已投信息按钮字体大小
/deep/ .u-button__text {
  font-size: 10.25rpx !important;
}
/deep/ .u-button__loading-text {
  font-size: 10.25rpx !important;
}
</style>
