<template>
  <!-- 产出登记 -->
  <view class="body">
    <view class="header-box">
      <u-button
        color="#387BFC"
        style="border-radius: 0.93rpx; width: 78.28rpx; height: 33.55rpx"
        :icon="header_box_icon"
        iconColor="#fff"
        :text="header_box_text"
        @click="historyBtnClick"
      ></u-button>
    </view>

    <template v-if="!showHistory">
      <template v-if="isFormData">
        <view
          style="
            color: #606266;
            font-size: 13.04rpx;
            margin: 9.31rpx 0 9.31rpx 13.97rpx;
          "
        >
          工位报工数量
        </view>
        <template v-if="!loadingShow">
          <u--form
            labelPosition="left"
            :model="formModel"
            :rules="formRules"
            ref="form1"
            :borderBottom="false"
            labelAlign="right"
            labelWidth="55"
          >
            <view class="form">
              <view class="form-item">
                <u-form-item
                  label="流转卡号"
                  prop="work_card_no"
                  :borderBottom="false"
                >
                  <view class="item-input" style="width: 186.39rpx">
                    <u--input
                      v-model="formModel.work_card_no"
                      style="height: 27.95rpx"
                    >
                      <template slot="suffix">
                        <!-- 扫码 -->
                        <u-button
                          icon="scan"
                          iconColor="#387BFC"
                          style="font-size: 18.63rpx"
                        ></u-button>
                      </template>
                    </u--input>
                  </view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="工位"
                  prop="work_position_name"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.work_position_name"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="产品"
                  prop="goods_name"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.goods_name"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="卡数量"
                  prop="work_card_qu"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.work_card_qu"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="上序"
                  prop="pre_work_procedure_name"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.pre_work_procedure_name"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="上序号报工数"
                  prop="pre_qu"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.pre_qu"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="本工序"
                  prop="work_procedure_name"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.work_procedure_name"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="本序已报工数"
                  prop="bg_qu"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.bg_qu"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="可报数"
                  prop="not_ok_qu"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.not_ok_qu"
                      style="height: 27.95rpx"
                      disabled
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item label="合格数" prop="ok_qu" :borderBottom="false">
                  <view class="item-input">
                    <u--input
                      v-model="formModel.ok_qu"
                      type="number"
                      style="height: 27.95rpx"
                    >
                      <template slot="suffix" v-if="is_can_fetch">
                        <!-- 合格数取数 -->
                        <u-button
                          text="取数"
                          color="#F5F7FA"
                          style="color: #606266; border: 0.93rpx solid #dcdfe6"
                          type="number"
                          @click="fetchClick"
                        ></u-button>
                      </template>
                    </u--input>
                  </view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item label="工废数" prop="gf_qu" :borderBottom="false">
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.gf_qu"
                      style="height: 27.95rpx"
                      type="number"
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item label="废料数" prop="lf_qu" :borderBottom="false">
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.lf_qu"
                      style="height: 27.95rpx"
                      type="number"
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="不良数"
                  prop="not_bad_qu"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.not_bad_qu"
                      style="height: 27.95rpx"
                      type="number"
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="其他数"
                  prop="other_qu"
                  :borderBottom="false"
                >
                  <view class="item-input"
                    ><u--input
                      v-model="formModel.other_qu"
                      style="height: 27.95rpx"
                      type="number"
                    ></u--input
                  ></view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="工废原因"
                  prop="gf_reason"
                  :borderBottom="false"
                >
                  <view class="item-input">
                    <u--input
                      v-model="formModel.gf_reason"
                      style="height: 27.95rpx"
                      disabled
                      disabledColor="#ffffff"
                    >
                      <template slot="suffix">
                        <!-- 选择工废原因 -->
                        <u-button
                          text="选择"
                          color="#F5F7FA"
                          style="color: #606266; border: 0.93rpx solid #dcdfe6"
                          @click="abolishCauseClick(true)"
                        ></u-button>
                      </template>
                    </u--input>
                  </view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="废料原因"
                  prop="lf_reason"
                  :borderBottom="false"
                >
                  <view class="item-input">
                    <u--input
                      v-model="formModel.lf_reason"
                      style="height: 27.95rpx"
                      disabled
                      disabledColor="#ffffff"
                    >
                      <template slot="suffix">
                        <!-- 选择工废原因 -->
                        <u-button
                          text="选择"
                          color="#F5F7FA"
                          style="color: #606266; border: 0.93rpx solid #dcdfe6"
                          @click="abolishCauseClick(false)"
                        ></u-button>
                      </template>
                    </u--input>
                  </view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="作业开始时间"
                  prop="start_time"
                  :borderBottom="false"
                >
                  <view class="item-input">
                    <view style="width: 186.39rpx"
                      ><uni-datetime-picker
                        type="datetime"
                        v-model="formModel.start_time"
                        @change="changeLog"
                    /></view>
                  </view>
                </u-form-item>
              </view>
              <view class="form-item">
                <u-form-item
                  label="作业结束时间"
                  prop="end_time"
                  :borderBottom="false"
                >
                  <view class="item-input">
                    <view style="width: 186.39rpx"
                      ><uni-datetime-picker
                        type="datetime"
                        v-model="formModel.end_time"
                        @change="changeLog"
                    /></view>
                  </view>
                </u-form-item>
              </view>
              <view class="form-item" style="width: 96.5%">
                <u-form-item label="备注" prop="note" :borderBottom="false">
                  <view class="item-input-note" style="height: 59.64rpx"
                    ><u--textarea
                      count
                      v-model="formModel.note"
                      placeholder="备注填写"
                      style="height: 59.64rpx"
                    ></u--textarea
                  ></view>
                </u-form-item>
              </view>
            </view>
            <view class="save"
              ><u-button
                type="primary"
                text="保存"
                style="width: 93.19rpx"
                color="#387BFC"
                @click="save"
              ></u-button
            ></view>
          </u--form>
        </template>
        <!-- 加载中 -->
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
      </template>
      <u-empty
        v-else
        mode="list"
        text="暂无生产信息"
        :icon="img"
        width="300"
        height="200"
        marginTop="160"
      ></u-empty>
    </template>

    <template v-else>
      <view>筛选</view>

      <view class="history-table">
        <view class="table-header">
          <view class="table-content">流转卡号</view>
          <view class="table-content">商品名称</view>
          <view class="table-content">工序</view>
          <view class="table-content" style="width: 15%">总数</view>
          <view class="table-content" style="width: 25%">创建时间</view>
        </view>
        <view class="table-row" v-if="!loadingHistoryShow">
          <u-list
            v-if="historyData.length"
            class="table-list-slot"
            @scrolltolower="pageNext"
            lowerThreshold="80"
            style="height: 100% !important"
          >
            <u-collapse
              @change="change"
              @close="collapseCurrent = -1"
              @open="collapseOpen"
            >
              <u-collapse-item
                v-for="(item, index) in historyData"
                :key="index"
                :name="index"
                :isLink="false"
              >
                <!-- 折叠面板标题 -->
                <view
                  slot="icon"
                  class="table-main-icon"
                  :class="
                    index == collapseCurrent
                      ? 'main-icon-change'
                      : 'table-main-icon'
                  "
                >
                  <u-icon name="arrow-right" size="13"></u-icon>
                </view>
                <view slot="title" class="table-main">
                  <view class="table-content">{{ item.work_card_no }}</view>
                  <view class="table-content">{{ item.goods_name }}</view>
                  <view class="table-content">{{
                    item.work_procedure_name
                  }}</view>
                  <view class="table-content" style="width: 15%">{{
                    item.bg_qu
                  }}</view>
                  <view class="table-content" style="width: 25%">{{
                    item.create_time
                  }}</view>
                </view>
                <!-- 折叠面板内部内容 -->
                <view class="u-collapse-content" @click="collapseClick(item)">
                  <u-row
                    customStyle="margin-bottom:18.63rpx ;margin-left:18.63rpx;"
                  >
                    <u-col span="4">
                      <view class="demo-layout bg-purple"
                        >工位：{{ item.work_position_name }}</view
                      >
                    </u-col>
                    <u-col span="4">
                      <view class="demo-layout bg-purple-light"
                        >合格数：{{ item.ok_qu }}</view
                      >
                    </u-col>
                    <u-col span="4">
                      <view class="demo-layout bg-purple-dark"
                        >工废数：{{ item.gf_qu }}</view
                      >
                    </u-col>
                  </u-row>
                  <u-row
                    customStyle="margin-bottom: 18.63rpx;margin-left:18.63rpx;"
                  >
                    <u-col span="4">
                      <view class="demo-layout bg-purple"
                        >废料数：{{ item.lf_qu }}</view
                      >
                    </u-col>
                    <u-col span="4">
                      <view class="demo-layout bg-purple-light"
                        >返修数：{{ item.not_bad_qu }}</view
                      >
                    </u-col>
                    <u-col span="4">
                      <view class="demo-layout bg-purple-dark"
                        >其他数：{{ item.other_qu }}</view
                      >
                    </u-col>
                  </u-row>
                  <u-row
                    customStyle="margin-bottom: 18.63rpx;margin-left:18.63rpx;"
                  >
                    <u-col span="4">
                      <view class="demo-layout bg-purple"
                        >工废原因：{{ item.gf_reason }}</view
                      >
                    </u-col>
                    <u-col span="4">
                      <view class="demo-layout bg-purple-light"
                        >料废原因：{{ item.lf_reason }}</view
                      >
                    </u-col>
                    <u-col span="4">
                      <view class="demo-layout bg-purple-dark"
                        >开始时间：{{ item.start_time }}</view
                      >
                    </u-col>
                  </u-row>
                  <u-row
                    customStyle="margin-bottom: 18.63rpx;margin-left:18.63rpx;"
                  >
                    <u-col span="12">
                      <view class="demo-layout bg-purple"
                        >结束时间：{{ item.end_time }}</view
                      >
                    </u-col>
                  </u-row>
                </view>
              </u-collapse-item>
            </u-collapse>
          </u-list>
          <view v-else class="no-data">暂无数据</view>
        </view>
        <view class="history-loading" v-else
          ><u-loading-icon
            mode="circle"
            color="rgb(56, 123, 252)"
            size="28"
            text="加载中"
            duration="900"
          ></u-loading-icon
        ></view>
      </view>
    </template>
    <!-- 原因选择 -->
    <u-picker
      :show="causeShow"
      ref="uPicker"
      :columns="causeColumns"
      keyName="bad_reason_name"
      @confirm="confirm"
      @cancel="causeShow = false"
      @change="changeHandler"
    ></u-picker>
  </view>
</template>

<script>
import NET from "../../utils/request.js";
import API from "../../config/api.js";
export default {
  data() {
    return {
      // 表单是否有数据
      isFormData: true,
      // 为空的图片提示
      img: "../../static/img/none.png",

      // 查看历史按钮文本
      header_box_text: "查看历史",
      header_box_icon: "clock",
      // 查看历史与模板页面切换
      showHistory: false,
      // 加载中
      loadingShow: true,

      // 合格数是否显示采集按钮
      is_can_fetch: 1,
      formModel: {
        work_card_no: "", //流转卡号
        goods_name: "", //产品
        work_card_qu: "", //卡数量
        pre_work_procedure_name: "", //上序
        pre_qu: "", //上序号报工数
        work_procedure_name: "", //本工序
        bg_qu: "", //本工序已报工数
        not_ok_qu: "", //可报数
        ok_qu: "", //合格数
        gf_qu: "", //工废数
        lf_qu: "", //废料数
        not_bad_qu: "", //不良数
        other_qu: "", //其他数
        gf_reason: "", //工废原因
        lf_reason: "", //废料原因
        start_time: "", //作业开始时间
        end_time: "", //作业结束时间
        note: "", //备注
        work_procedure_id: "",
        work_card_id: "",

        // 赋值生产线/班次
        make_line_id: "",
        work_position_id: "",
        work_position_name: "", //工位

        work_card_emp_work_id: "", //是否从详情跳转
      },
      formRules: {
        work_card_no: {
          type: "string",
          required: true,
          message: "请填写流转卡号",
          trigger: ["blur", "change"],
        },
        work_position_name: {
          required: false,
        },
        goods_name: {
          required: false,
        },
        work_card_qu: {
          required: false,
        },
        pre_work_procedure_name: {
          required: false,
        },
        pre_qu: {
          required: false,
        },
        work_procedure_name: {
          required: false,
        },
        this_sort_num: {
          required: false,
        },
        not_ok_qu: {
          required: false,
        },
        ok_qu: {
          required: false,
          // type: "string",
          // required: true,
          // message: "请选择合格数",
          // trigger: ["blur", "change"],
        },
        gf_qu: {
          required: false,
        },
        lf_qu: {
          required: false,
        },
        not_bad_qu: {
          required: false,
        },
        other_qu: {
          required: false,
        },
        gf_reason: {
          required: false,
        },
        lf_reason: {
          required: false,
        },
        start_time: {
          required: false,
        },
        end_time: {
          required: false,
        },
      },

      // 原因选择picker/数据
      causeShow: false,
      causeColumns: [[], []],
      causeColumnsChild: [],
      choose: "",

      // 分页
      currPage: 1,
      maxPageCount: 10,
      total: 0,

      // 历史记录
      historyData: [],
      // 历史记录加载中
      loadingHistoryShow: false,
      collapseCurrent: -1,
    };
  },
  mounted() {
    let putStationArr = uni.getStorageSync("putStationArr")[1];
    this.formModel.make_line_id = putStationArr.make_line_id;
    this.formModel.work_position_id = putStationArr.work_position_id;
    this.formModel.work_position_name = putStationArr.name;

    this.getFormData();
    this.getAbolishCause();
  },
  methods: {
    // 折叠面板change
    change(e) {
      console.log("change", e);
    },
    //? ================================界面交互================================
    changeLog(e) {
      console.log("change事件:", e);
    },
    // 点击原因选择
    abolishCauseClick(bool) {
      this.causeShow = true;
      // 工废
      if (bool) {
        this.choose = "工废";
      } else {
        this.choose = "废料";
      }
    },
    // 原因选择picker
    changeHandler(e) {
      const {
        columnIndex,
        value,
        values, // values为当前变化列的数组内容
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.uPicker,
      } = e;
      // 当第一列值发生变化时，变化第二列(后一列)对应的选项
      if (columnIndex === 0) {
        // picker为选择器this实例，变化第二列对应的选项
        picker.setColumnValues(1, this.causeColumnsChild[index]);
      }
    },
    // picker点击确认
    confirm(e) {
      if (this.choose == "工废") {
        this.formModel.gf_reason = e.value[1].bad_reason_name;
      } else {
        this.formModel.lf_reason = e.value[1].bad_reason_name;
      }
      this.causeShow = false;
    },

    // 查看历史按钮点击
    historyBtnClick() {
      this.showHistory = !this.showHistory;
      if (this.showHistory) {
        this.header_box_text = "返回表单";
        this.header_box_icon = "arrow-left";
        // 清空分页
        this.currPage = 1;
        this.maxPageCount = 10;
        this.historyData = [];
        // // 清空时间
        // this.range = [];
        // // 调用历史记录接口
        this.getHistoryData();
      } else {
        this.header_box_text = "查看历史";
        this.header_box_icon = "clock";
        // 加载历史表格show
        this.loadingHistoryShow = true;
      }
    },

    // 折叠面板激活事件
    collapseOpen(e) {
      this.collapseCurrent = e;
    },

    // 折叠面板详情点击事件
    collapseClick(item) {
      this.showHistory = !this.showHistory;
      this.header_box_text = "查看历史";
      this.header_box_icon = "clock";

      this.getFormHistoryData(item);
    },

    // 分页
    pageNext() {
      console.log("分页");
      this.currPage = this.currPage + 1;
      console.log(this.currPage);
      // this.maxPageCount = this.maxPageCount + 10;
      if (this.currPage > this.total) {
        return;
      }

      this.getHistoryData();
    },

    //? ================================数据处理================================
    // 获取表单数据
    getFormData() {
      let getObj = {
        work_card_no: this.formModel.work_card_no,
        make_line_id: this.formModel.make_line_id,
        work_position_id: this.formModel.work_position_id,
      };
      NET.request(API.outPutFind, getObj, "POST")
        .then((res) => {
          if (res.data.code == 200) {
            this.loadingShow = false;
            this.is_can_fetch = res.data.data.is_can_fetch;
            // 赋值
            this.formModel.work_card_no = res.data.data.work_card_no;
            this.formModel.goods_name = res.data.data.goods_name;
            this.formModel.work_card_qu = res.data.data.work_card_qu;
            this.formModel.pre_work_procedure_name =
              res.data.data.pre_work_procedure_name;
            this.formModel.pre_qu = res.data.data.pre_qu;
            this.formModel.work_procedure_name =
              res.data.data.work_procedure_name;
            this.formModel.bg_qu = res.data.data.bg_qu;
            this.formModel.not_ok_qu = res.data.data.not_ok_qu;
            this.formModel.work_procedure_id = res.data.data.work_procedure_id;
            this.formModel.work_card_id = res.data.data.work_card_id;
            console.log("初始获取", this.formModel);
          } else if (res.data.code == 204) {
            this.isFormData = false;
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
    // 历史跳转到获取表单详情数据
    getFormHistoryData(item) {
      console.log(item);
      NET.tempRequest(API.outPutFindDetail, item, "POST")
        .then((res) => {
          this.formModel = res.data.data;
          console.log("历史跳转", this.formModel);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 工废原因选择
    getAbolishCause() {
      NET.request(API.findReasonTree, {}, "POST")
        .then((res) => {
          if (res.data.code == 200) {
            let tempArr = res.data.data;
            tempArr.forEach((item) => {
              this.causeColumns[0].push(item);
              this.causeColumnsChild.push(item.children);
            });
            this.causeColumns[1] = this.causeColumnsChild[0];
            console.log(this.causeColumns);
            console.log(this.causeColumnsChild);
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
    // 保存按钮
    save() {
      console.log(this.formModel);
      NET.request(API.outPutSave, this.formModel, "POST")
        .then((res) => {
          if (res.data.code == 200) {
            uni.showToast({
              title: "保存成功！",
              icon: "success",
              duration: 2000,
            });
            this.getFormData();
          } else if (res.data.code == 204) {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
          console.log(res);
        })
        .catch((err) => {
          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
        });
    },
    // 获取历史记录列表
    getHistoryData() {
      NET.tempRequest(
        API.outPutFindHistory,
        {
          currPage: this.currPage,
          maxPageCount: this.maxPageCount,
          make_line_id: this.formModel.make_line_id,
          work_position_id: this.formModel.work_position_id,
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res);
            this.total = res.data.data.total;
            this.historyData = this.historyData.concat(res.data.data.list);
            this.loadingHistoryShow = false;
          } else if (res.data.code == 204) {
            this.loadingHistoryShow = false;
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 取数
    fetchClick() {
      NET.tempRequest(
        API.outPutFetch,
        {
          work_position_id: this.formModel.work_position_id,
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            this.formModel.ok_qu = res.data.data.value;
          } else if (res.data.code == 204) {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000,
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
.body {
  width: 100%;
  // 头部按钮
  .header-box {
    position: absolute;
    right: 18.63rpx;
    top: 13.97rpx;
    width: 78.28rpx;
    border-radius: 0.93rpx;
    box-shadow: 0 0.93rpx 3.72rpx #387bfc;
  }
}

.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .form-item {
    width: 47%;
    .item-input {
      width: 186.39rpx;
    }
    .item-input-note {
      width: 100%;
    }
  }
}
.save {
  width: 93.19rpx;
  padding: 23.29rpx 0 13.97rpx 60.57rpx;
}

// 表格加载中
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
}

// 历史记录列表
.history-table {
  border: 0.93rpx solid #ebeef5;
  border-radius: 10px;
  width: calc(100% - 20.5rpx);
  // height: calc(100% - 50px);
  height: 354.14rpx;
  margin-top: 9.31rpx;
  padding: 9.31rpx 9.31rpx;
  overflow-x: scroll;
  overflow-y: hidden;
  .table-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 0.93rpx solid #ebeef5;
    padding: 13.97rpx 0;
    margin: 0 13.97rpx;
  }
  .table-row {
    position: relative;
    height: calc(100% - 56.84rpx);
    overflow-y: scroll;
    .table-main {
      display: flex;
    }
    .table-main-icon {
      position: absolute;
      left: 4.65rpx;
      transition: all 0.3s ease;
    }
    // 暂无数据
    .no-data {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #b2bec3;
    }
  }
}
// 历史展开内容
.u-collapse-content {
  font-size: 9.31rpx;
}
// 点击后图标变化
.main-icon-change {
  transform: rotate(90deg);
}

// 表格主体内容
.table-content {
  width: 20%;
  text-align: center;
  font-size: 9.31rpx;
}
// 历史记录加载
.history-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
}

// 上方按钮字体
/deep/ .u-button__text {
  font-size: 10.25rpx !important;
}

/deep/ .u-input {
  padding-right: 0 !important;
}

// 日期选择
/deep/ .uniui-calendar {
  font-size: 0 !important;
}
// 折叠面板修改
/deep/ .u-cell__body {
  padding: 14.91rpx 13.97rpx !important;
}

// 表单左侧字体大小
/deep/ .u-form-item__body__left__content__label {
  font-size: 9.31rpx !important;
}

// 表单输入框高度
/deep/ .u-input {
  height: 18.63rpx !important;
}
// 表单内容按钮高度
/deep/ .u-input__content__subfix-icon {
  height: 28.89rpx;
}

// 时间选择框高度
/deep/ .uni-date-single {
  height: 28.89rpx;
}

// 表单备注左侧
/deep/ .u-form-item__body__left {
  widows: 59.64rpx;
}
// 表单备注右侧
/deep/ .u-textarea {
  width: 452rpx;
}
</style>
