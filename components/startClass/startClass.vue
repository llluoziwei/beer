<template>
  <!-- 启动开班 -->
  <view class="body">
    <u--form labelWidth="60" labelAlign="right">
      <view style="display: flex">
        <u-form-item label="班次" prop="class">
          <view @click="classShow = true" style="width: 149.11rpx">
            <u-input
              suffixIcon="arrow-down"
              inputAlign="center"
              readonly
              suffixIconStyle="color: #909399"
              v-model="form.class"
              placeholder="请选择"
            />
          </view>
          <u-picker
            @cancel="classShow = false"
            @confirm="classConfirm"
            closeOnClickOverlay
            :show="classShow"
            :columns="classColumns"
            keyName="work_time_name"
          ></u-picker>
        </u-form-item>
      </view>
    </u--form>

    <view :class="[ladingmore == false ? 'tabel' : 'tabel-n']">
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
      <view class="tabel_row" v-if="ladingmore == false">
        <view class="header">
          <u-row style="">
            <u-col span="2"
              ><view class="head" style="text-align: center">序号</view></u-col
            >
            <u-col span="3"><view class="head">流转卡号</view></u-col>
            <u-col span="3"><view class="head">产品编码</view></u-col>
            <u-col span="3"><view class="head">计划开工日</view></u-col>
            <u-col span="1">
              <!-- {{bools===true?'状态':'操作'}} -->
              <view class="head" style="text-align: center">{{
                bools === true ? "状态" : "操作"
              }}</view>
            </u-col>
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
              :value="openIndx"
              @close="collapseCurrent = -1"
              accordion
            >
              <u-collapse-item
                v-for="(item, index) in list"
                :key="index"
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
                      <view>{{ item.work_card_no }}</view>
                    </u-col>
                    <u-col span="3">
                      <view>{{ item.goods_code }}</view>
                    </u-col>
                    <u-col span="3">
                      <view>{{ item.start_date }}</view>
                    </u-col>
                    <u-col span="1" style="align-items: center !important">
                      <view
                        v-if="item.make_line_process != 1"
                        @click.stop="openDetail(1, item)"
                        class="headBtn"
                        >启动</view
                      >
                      <view
                        v-if="item.make_line_process == 1"
                        style="color: red"
                        >已启动</view
                      >
                    </u-col>
                  </u-row>
                </view>
                <view class="u-collapse-content">
                  <u-row
                    justify="space-between"
                    customStyle="margin-bottom: 9.31rpx"
                  >
                    <u-col span="3"
                      ><view style="color: #606266">流转卡号</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.work_card_no }}</view>
                    </u-col>
                    <u-col span="3"
                      ><view style="color: #606266">生产订单号</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.work_order_slide_no }}</view>
                    </u-col>
                  </u-row>
                  <u-row
                    justify="space-between"
                    customStyle="margin-bottom: 9.31rpx"
                  >
                    <u-col span="3"
                      ><view style="color: #606266">产品编码</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.goods_code }}</view>
                    </u-col>
                    <u-col span="3"
                      ><view style="color: #606266">生产线</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.make_line_name }}</view>
                    </u-col>
                  </u-row>
                  <u-row
                    justify="space-between"
                    customStyle="margin-bottom: 9.31rpx"
                  >
                    <u-col span="3"
                      ><view style="color: #606266">产品名称</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.goods_name }}</view>
                    </u-col>
                    <u-col span="3"
                      ><view style="color: #606266">计划开工日期</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.start_date }}</view>
                    </u-col>
                  </u-row>
                  <u-row
                    justify="space-between"
                    customStyle="margin-bottom: 9.31rpx"
                  >
                    <u-col span="3"
                      ><view style="color: #606266">数量</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.qu }}</view>
                    </u-col>
                    <u-col span="3"
                      ><view style="color: #606266">计划完工日期</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.end_date }}</view>
                    </u-col>
                  </u-row>
                  <u-row
                    justify="space-between"
                    customStyle="margin-bottom: 9.31rpx"
                  >
                    <u-col span="3"
                      ><view style="color: #606266">客户</view></u-col
                    >
                    <u-col span="3"><view class=""></view></u-col>
                    <u-col span="3"
                      ><view style="color: #606266">下达日期</view></u-col
                    >
                    <u-col span="3">
                      <view class="">{{ item.receipt_date }}</view>
                    </u-col>
                  </u-row>
                </view>
              </u-collapse-item>
            </u-collapse>
          </u-list>
        </view>
        <!-- <page-pagination :total="total" :pageSize="10" :currentPage="current_page" @change="change"
					:showAround="true" :btnText="true"></page-pagination> -->
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
      bools: false,
      // 一条数据默认展开
      openIndx: null,
      // 生产线信息
      beltlineInfo: [],
      // 工位ID
      work_position_id: "",
      collapseCurrent: -1,
      classShow: false, //产线picker选择器
      classColumns: [], //班次选择内容
      form: {
        class: "",
      },
      // 列表数据
      list: [],
      currPage: 1,
      // 生产线id
      make_line_id: "",
      current_page: 1,
      total: 0,
      maxPageCount: 10,
      // 班次ID
      work_time_id: null,
      now_work_time_id: "",
    };
  },
  created() {
    let putStationArr = uni.getStorageSync("putStationArr");
    this.beltlineInfo = putStationArr;

    this.work_position_id = putStationArr[1].work_position_id;
    this.make_line_id = putStationArr[0].make_line_id;
  },
  mounted() {
    // 默认班次
    this.pubGetDefaultWorkTime();
    // 返回所有班次接口
    this.getclassesList();
    // 可启动流转卡接口
    this.getWorkCardInfo();
  },
  methods: {
    scrolltolower() {
      if (this.currPage > this.total) {
        return;
      }
      console.log("触底看");
      this.currPage = this.currPage + 1;
      console.log(this.currPage, "触底看");
      this.getWorkCardInfo();
    },
    changeb(e) {
      console.log(e, "sdfsd");
    },
    // 默认班次
    pubGetDefaultWorkTime() {
      NET.request(API.pubgDefaultWorkTime, "POST").then((res) => {
        if (res.data.code == 200) {
          this.form.class = res.data.data.work_time_name;
          this.work_time_id = res.data.data.work_time_id;
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },

    // 页码改变时触发
    change(nowPage, type) {
      this.currPage = nowPage;
    },
    //返回所有班次接口
    getclassesList() {
      // 参数 工位id work_position_id
      NET.request(
        API.getWorkTimeList,
        {
          work_position_id: this.work_position_id,
        },
        "POST"
      ).then((res) => {
        console.log(res, "sdfs");
        if (res.data.code == 200) {
          this.classColumns = [res.data.data];
        } else {
          uni.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
    // 获取班次 动流转卡 列表
    getWorkCardInfo() {
      if (this.currPage == 1) {
        this.ladingmore = true;
      }

      // 参数 生产线ID  make_line_id
      NET.request(
        API.openWorkWorkCard,
        {
          make_line_id: this.make_line_id,
          maxPageCount: this.maxPageCount,
          currPage: this.currPage,
        },
        "POST"
      ).then((res) => {
        this.ladingmore = false;
        console.log(res, "动流转卡");
        if (res.data.code == 200) {
          this.list = this.list.concat(res.data.data.list);
          this.openIndx = this.list.length == 1 ? 0 : null;
          this.total = res.data.data.total;
          this.bools = this.enabled(this.list);
          console.log(this.bools, "fanhui");
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
    enabled(data) {
      let bool = data.some((item) => {
        return item.make_line_process == 1;
      });
      return bool;
    },
    // 选择班次弹框
    classConfirm(e) {
      console.log(e, "选择班次弹框");
      this.form.class = e.value[0].work_time_name;
      this.work_time_id = e.value[0].work_time_id;
      this.classShow = false;
    },
    // 是否展示
    openCollapse(e) {
      console.log(e, "sfd");
      this.collapseCurrent = e;
    },
    // 启动 确定
    openDetail(current, data) {
      if (this.form.class == "") {
        uni.showToast({
          title: "请选择班次",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      let that = this;
      uni.showModal({
        content: "确定此操作吗？",
        success: function (res) {
          if (res.confirm) {
            that.setOpenWorkBegin(data);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    //设置生产线开班接口
    setOpenWorkBegin(data) {
      // console.log(data);
      // 流转卡号 work_card_no  班次idwork_time_id  生产线id make_line_id
      NET.request(
        API.openWorkBegin,
        {
          work_card_no: data.work_card_no,
          work_card_id: data.work_card_id,
          work_order_id: data.work_order_id,
          work_order_slide_no: data.work_order_slide_no,
          work_time_id: this.work_time_id,
          make_line_id: this.make_line_id,
        },
        "POST"
      ).then((res) => {
        if (res.data.code == 200) {
          this.list = [];
          this.currPage = 1;
          this.getWorkCardInfo();
          uni.setStorageSync("work_card_id", data.work_card_id);
          uni.showToast({
            title: "开班启动成功",
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
  width: calc(100% - 13.04rpx);
  height: calc(100% - 13.04rpx);
}
.main-box {
  height: 100% !important;
}
.h-40 {
  height: 37.27rpx;
}
.tabel-n {
  height: 86.5%;

  overflow: hidden;
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
    height: calc(100% - 46.59rpx);
    // height: calc(100% - 40px - 50px);
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
  transition: 0.3s;
}

/deep/ .uicon-arrow-right {
  top: 0 !important;
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
  padding: 9.31rpx 0;
  color: #99a9bf;
  font-size: 9.31rpx;
}

.collapseData view {
  padding: 9.31rpx 0;
  color: #606266;
}

//启动开班详情字体大小
/deep/ .u-collapse-item__content__text {
  font-size: 9.31rpx !important;
}
</style>
