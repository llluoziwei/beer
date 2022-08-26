<template>
  <!-- 收料确定 -->
  <view class="body">
    <u--form labelWidth="60" labelAlign="right">
      <view style="display: flex; margin-left: 18.63rpx">
        <u-form-item label="" prop="productionLine">
          <view style="width: 149.11rpx">
            <u-input
              @confirm="searchbtn"
              prefixIcon="search"
              prefixIconStyle="color: #909399"
              v-model="form.productionLine"
              placeholder="请输入内容"
            />
          </view>
        </u-form-item>
      </view>
    </u--form>
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
    <view v-else class="tabel">
      <view class="tabel_row">
        <view class="header">
          <u-row style="">
            <u-col span="2"
              ><view class="head" style="text-align: center">序号</view></u-col
            >
            <u-col span="3"><view class="head">物料编码</view></u-col>
            <u-col span="3"><view class="head">物料名称</view></u-col>
            <u-col span="3"><view class="head">日期</view></u-col>
            <u-col span="1"
              ><view class="head" style="text-align: center">操作</view></u-col
            >
          </u-row>
        </view>
        <view class="main" v-if="list.length <= 0">
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
        <view class="main" v-if="list.length > 0">
          <u-list class="main-box" @scrolltolower="scrolltolower">
            <u-collapse
              @open="openCollapse"
              :value="'null'"
              @close="collapseCurrent = -1"
              accordion
            >
              <u-list-item v-for="(item, index) in list" :key="index">
                <u-collapse-item
                  :name="index"
                  style="position: relative"
                  :isLink="false"
                >
                  <view
                    slot="icon"
                    class="collapseIcon"
                    :class="
                      index == collapseCurrent
                        ? 'collapseIconBottom'
                        : 'collapseIconRight'
                    "
                  >
                    <u-icon name="arrow-right" size="13"></u-icon>
                  </view>
                  <view class="collapseTitle" slot="title">
                    <u-row>
                      <u-col span="2">
                        <view style="text-align: center">{{ index + 1 }}</view>
                      </u-col>
                      <u-col span="3">
                        <view>{{ item.goods_code }}</view>
                      </u-col>
                      <u-col span="3">
                        <view>{{ item.goods_name }}</view>
                      </u-col>
                      <u-col span="3">
                        <view>{{ item.receipt_date }}</view>
                      </u-col>
                      <u-col span="1" style="align-items: center !important"
                        ><view @click.stop="openDetail(1, item)" class="headBtn"
                          >确认</view
                        ></u-col
                      >
                    </u-row>
                  </view>
                  <view class="u-collapse-content">
                    <u-row>
                      <u-col span="1.5" style="min-height:100.65rpx">
                        <view class="collapseContent">
                          <view class="">日期</view>
                          <view class="">物料名称</view>
                          <view class="">批次号</view>
                          <view class="">备注</view>
                        </view>
                      </u-col>
                      <u-col span="4.5" style="min-height:100.65rpx">
                        <view class="collapseData">
                          <view class="">{{ item.receipt_date }}</view>

                          <view class="" style="white-space:nowrap;overflow:hidden">{{ item.goods_name }}</view>
                          <view class="">{{ item.batch_no }}</view>
                          <view class="">{{ item.note }}</view>
                        </view>
                      </u-col>
                      <u-col span="1.5" style="min-height:100.65rpx">
                        <view class="collapseContent">
                          <view class="">单据号</view>
                          <view class="">物料编码</view>
                          <view class="">数量</view>
                          <view class="">供应商</view>
                        </view>
                      </u-col>
                      <u-col span="4.5" style="min-height:100.65rpx">
                        <view class="collapseData">
                          <view class="">{{ item.slide_no }}</view>
                          <view class="" style="white-space:nowrap;overflow:hidden">{{ item.goods_name }}</view>
                          <view class="">{{ item.qu }}</view>
                          <view class="">{{ item.provider_name }}</view>
                        </view>
                      </u-col>
                    </u-row>
                  </view>
                </u-collapse-item>
              </u-list-item>
            </u-collapse>
          </u-list>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NET from "../../utils/request.js";
import API from "../../config/api.js";
export default {
  components: {
    NET,
    API,
  },
  name: "contractor",
  data() {
    return {
      ladingmore: false,
      // 生产线信息
      beltlineInfo: "",
      // 工位
      work_position_id: null,
      // 是否展开
      collapseCurrent: -1,
      // 搜索参数
      form: {
        productionLine: "",
      },
      // 收料确认 列表
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    let putStationArr = uni.getStorageSync("putStationArr");
    this.beltlineInfo = putStationArr;
    this.work_position_id = putStationArr[1].work_position_id;
  },
  mounted() {
    this.getList();
  },
  methods: {
    scrolltolower() {
      console.log("触底");
      this.page = this.page + 1;
      if (this.page > this.total) {
        return;
      }
      this.getList();
    },
    // 搜索
    searchbtn() {
      this.getList();
    },
    // 得到收料列表数据
    getList() {
      if (this.page == 1) {
        this.ladingmore = true;
      }
      // maxPageCount 行数    currPage 页码
      NET.request(
        API.empInOtherFindList,
        {
          maxPageCount: this.pageSize,
          currPage: this.page,
          goods_name: this.form.productionLine,
        },
        "POST"
      ).then((res) => {
        this.ladingmore = false;
        if (res.data.code == 200) {
          if (res.data.data.list.length > 0) {
            this.list = this.list.concat(res.data.data.list);
            this.total = res.data.data.total;
          } else {
            this.list = [];
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
    openDetail(current, data) {
      let that = this;
      uni.showModal({
        content: "确定此操作吗？",
        success: function (res) {
          if (res.confirm) {
            that.requstConfirm(data);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    // 收料 确定
    requstConfirm(data) {
      console.log(data, "确定数据");
      // in_other_body_id 收料体ID   work_position_id工位
      NET.request(API.empInOtherSave, data, "POST").then((res) => {
        if (res.data.code == 200) {
          this.list = [];
          this.page = 1;
          this.getList();
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
    // 是否 展开
    openCollapse(e) {
      this.collapseCurrent = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  width: calc(100% - 13.04rpx);
  height: calc(100% - 13.04rpx);
}
.main-box {
  height: 100% !important;
}
.tabel {
  height: 86.5%;
  border: 0.93rpx solid #e3e3e3;
  overflow: hidden;
}

.tabel_row {
  height: 96%;
  width: 96%;
  margin: 2% 2% 1% 2%;
  overflow-y: scroll;

  .header {
    font-size: 12.11rpx;
    overflow: hidden;
    padding-left: 30.75rpx;

    .head {
      padding: 0 0 13.97rpx 0;
      color: #909399;
    }
  }

  .main {
    height: calc(100% - 55.91rpx) !important;
    overflow-y: scroll;
    margin-bottom: 9.31rpx;
  }
}

/deep/ .u-cell__left-icon-wrap {
  margin-right: 0;
}

/deep/ .u-cell__body {
  padding: 0 !important;
}

.collapseIconBottom {
  transform: rotate(90deg);
}

.collapseIcon {
  position: absolute;
  left: 18.63rpx;
  top: 18.63rpx;
  transition: 0.3s;
}

.collapseTitle {
  color: #909399;
  word-break: break-all;
  padding: 9.31rpx 0 9.31rpx 29.82rpx;
  font-size: 10.25rpx;
  .headBtn {
    width: 37.27rpx;
    height: 24.23rpx;
    line-height: 24.23rpx;
    text-align: center;
    color: white;
    background-color: #387bfc;
    border-radius: 2.79rpx;
    font-size: 9.31rpx;
  }
}

.collapseContent view {
  margin-bottom: 9.31rpx;
  color: #99a9bf;
  font-size: 9.31rpx;
}

.collapseData view {
  margin-bottom: 9.31rpx;
  color: #606266;
}

//收料确认详情字体大小
/deep/ .u-collapse-item__content__text {
  font-size: 9.31rpx !important;
}
</style>
