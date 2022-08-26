<template>
  <view class="body">
    <view style="font-size: 13.04rpx; margin: 9.31rpx 0 9.31rpx 13.97rpx"
      >当前工单信息</view
    >
    <view
      v-if="ladingmore == true"
      style="
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <u-loading-icon
        inactive-color="#387bfc"
        size="28"
        mode="circle"
        :show="ladingmore"
        :vertical="true"
        text="加载中"
      ></u-loading-icon>
    </view>

    <u--form
      v-if="ladingmore == false"
      labelWidth="80"
      labelAlign="right"
      :labelStyle="{
        color: '#606266',
        fontSize: '10.25rpx',
      }"
    >
      <view
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-right: 6.52rpx;
        "
      >
        <view style="width: 30%">
          <u-form-item label="流转卡号" prop="work_card_id"
            ><u--input disabled v-model="work_card_info.work_card_no"></u--input
          ></u-form-item>
        </view>
        <view style="width: 30%">
          <u-form-item label="生产订单号" prop="work_card_no"
            ><u--input
              disabled
              v-model="work_card_info.work_order_slide_no"
            ></u--input
          ></u-form-item>
        </view>
        <view style="width: 30%">
          <u-form-item label="产品编码" prop="goods_code"
            ><u--input disabled v-model="work_card_info.goods_code"></u--input
          ></u-form-item>
        </view>
        <view style="width: 30%">
          <u-form-item label="产品名称" prop="goods_name"
            ><u--input disabled v-model="work_card_info.goods_name"></u--input
          ></u-form-item>
        </view>
        <view style="width: 30%">
          <u-form-item label="领料单" prop="good_single"
            ><u--input disabled v-model="work_card_info.good_single"></u--input
          ></u-form-item>
        </view>
        <view style="width: 30%">
          <u-form-item label="客户" prop="client"
            ><u--input disabled v-model="work_card_info.client"></u--input
          ></u-form-item>
        </view>
        <view style="width: 30%">
          <u-form-item label="领料信息" prop="good_info"
            ><u--input disabled v-model="work_card_info.good_info"></u--input
          ></u-form-item>
        </view>
        <view style="width: 30%">
          <view class="btn"
            ><u-button
              @click="openList()"
              type="primary"
              text="查看已投信息"
            ></u-button
          ></view>
        </view>
      </view>
    </u--form>
    <view v-if="ladingmore == false" class="tabel">
      <view class="tabel-header">
        <view style="width: 121.15rpx; padding-left: 9.31rpx">物料编码</view>
        <view style="width: 177.07rpx">物料名称</view>
        <view style="width: 83.87rpx">需求数</view>
        <view style="width: 83.87rpx">已投料</view>
        <view style="">未投数</view>
      </view>
      <view class="tabel-row" v-if="good_list.length <= 0">
        <view
          style="
            height: 100%;
            color: #cccccc;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          暂无数据
        </view>
      </view>
      <view class="tabel-row" v-if="good_list.length > 0">
        <u-list
          class="main-box"
          @scrolltolower="pageNext"
          :lowerThreshold="10"
          :upperThreshold="-10"
        >
          <u-list-item v-for="(item, index) in good_list" :key="index">
            <view
              class="tabel-row-item"
              @click="openDetail(item, index)"
              :style="index == current ? 'background-color: #F5F7FA;' : ''"
            >
              <view style="width: 121.15rpx; padding-left: 9.31rpx">{{
                item.goods_code
              }}</view>
              <view style="width: 177.07rpx">{{ item.goods_name }}</view>
              <view style="width: 83.87rpx">{{ item.qu }}</view>
              <view style="width: 83.87rpx">{{ item.in_qu }}</view>
              <view style="">{{ item.no_in_qu }}</view>
            </view>
          </u-list-item>
        </u-list>
      </view>
      <!-- <page-pagination :total="total" :pageSize="10" :currentPage="current_page" @change="change"
				:showAround="true" :btnText="true">
			</page-pagination> -->
    </view>
  </view>
</template>

<script>
import NET from "../../../utils/request.js";
import API from "../../../config/api.js";
export default {
  data() {
    return {
      ladingmore: false,
      // 生产线信息
      beltlineInfo: [],
      // 生产线id
      make_line_id: "",
      total: 0,
      current_page: 1,
      page: 1,
      current: -1, //点击表格中某一行下标
      item: {}, //点击选中某一行过后把某一行的数据存在此处
      // 当前工单信息
      work_card_info: {
        work_card_id: "", //流转卡id
        work_card_no: "", //流转卡号
        work_order_slide_no: "", //生产订单号
        goods_code: "", //产品编码
        goods_name: "", //产品名称
        good_single: "", //领料单
        client: "", //客户
        good_info: "", //领料信息
      },
      // 领料列表
      good_list: [],
    };
  },
  created() {
    let putStationArr = uni.getStorageSync("putStationArr");
    this.beltlineInfo = putStationArr;
    this.make_line_id = putStationArr[1].make_line_id;
  },
  mounted() {
    this.getFinfworkCardInfo();
  },
  methods: {
    pageNext() {
      if (this.page > this.total) {
        return;
      }
      console.log("触底看");
      this.page = this.page + 1;
      console.log(this.currPage, "触底看");
      this.getGoodsList();
    },
    // 页码改变时触发
    change(nowPage, type) {
      this.page = nowPage;
    },
    // 得到当前流转卡信息  参数 生产线id make_line_id
    getFinfworkCardInfo() {
      this.ladingmore = true;
      NET.request(API.findProdFeed + "/" + this.make_line_id, "POST")
        .then((res) => {
          console.log("当前流转卡信息:", res);
          if (res.data.code == 200) {
            this.work_card_info = res.data.data;
            uni.setStorageSync("work_card_info", res.data.data);
            this.getGoodsList();
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
            this.ladingmore = false;
          }
        })
        .catch((err) => {
          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
          this.ladingmore = false;
        });
    },
    // 获取领料单明细信息列表 参数 // 流转卡id work_card_id 生产工单id work_order_id
    getGoodsList() {
      NET.request(
        API.findProdFeedBom,
        {
          maxPageCount: 10,
          currPage: this.page,
          work_card_id: this.work_card_info.work_card_id,
          work_order_id: this.work_card_info.work_order_id,
        },
        "POST"
      ).then((res) => {
        this.ladingmore = false;
        if (res.data.code == 200) {
          this.good_list = this.good_list.concat(res.data.data.list);
          this.total = res.data.data.total;
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
    openList() {
      let data = {
        current: 2,
        item: this.item,
        work_card_info: this.work_card_info,
      };
      this.$emit("openList", data);
    },
    openDetail(item, index) {
      this.current = index;
      let data = {
        current: 3,
        item: item,
        work_card_info: this.work_card_info,
      };
      this.$emit("openDetail", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
}
.main-box {
  height: 100% !important;
}
.btn {
  float: right;
  width: 93.19rpx;
}

.tabel {
  border: 0.93rpx solid #ebeef5;
  border-radius: 9.31rpx;
  // width: calc(100% - 20px);
  height: calc(100% - 153.77rpx);
  margin-top: 9.31rpx;
  padding: 0 9.31rpx 9.31rpx 9.31rpx;
  overflow-x: scroll;
  overflow-y: hidden;

  .tabel-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 0.93rpx solid #ebeef5;
    padding: 9.31rpx 4.65rpx;

    view {
      color: #909399;
      text-align: left;
      // font-size: 11.18rpx;
      font-size: 10.25rpx;
    }

    view:last-child {
      // width: calc(100% - 680px);???
    }
  }

  .tabel-row {
    overflow-y: scroll;
    height: calc(100% - 27.95rpx);
    width: 100%;
    margin-bottom: 9.31rpx;

    .tabel-row-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #606266;
      padding: 9.31rpx 4.65rpx;
      border-bottom: 0.93rpx solid #ebeef5;
      font-size: 10.25rpx;
    }
  }
}

// 生产投料工单信息输入框高度
/deep/ .u-input {
  height: 13.04rpx;
}

// 查看已投信息按钮/字体
/deep/ .u-reset-button {
  height: 25.16rpx;
}
/deep/ .u-button__text {
  font-size: 10.25rpx !important;
}
</style>
