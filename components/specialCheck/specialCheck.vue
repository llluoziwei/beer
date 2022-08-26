<template>
  <view class="body">
    <!-- 功能按钮 -->
    <view class="header-box" :style="a ? 'right: 18.63rpx' : 'right: -100px'">
      <!-- 历史记录 -->
      <u-button
        color="#387BFC"
        style="border-radius: 0.93rpx; width: 78.28rpx; height: 33.55rpx"
        :icon="header_box_icon"
        :disabled="historyDisabled"
        iconColor="#fff"
        :text="header_box_text"
        @click="historyBtnClick"
      ></u-button>
    </view>
    <!-- 多媒体 -->
    <view
      class="header-box-mult"
      :style="{
        right: a ? '111.83rpx' : '18.63rpx',
        right: b ? '18.63rpx' : '111.83rpx',
      }"
    >
      <u-button
        color="#387BFC"
        style="border-radius: 0.93rpx; width: 78.28rpx; height: 33.55rpx"
        :icon="header_box_mult_icon"
        :disabled="multDisabled"
        iconColor="#fff"
        :text="header_box_mult_text"
        @click="multBtnClick"
      ></u-button>
    </view>

    <!-- 主页面 -->
    <template v-if="showHistory == '2'">
      <!-- 操作按钮 -->
      <view class="operate">
        <view class="operate-btn"
          ><u-button
            type="primary"
            style="width: 100%; height: 100%"
            color="#387BFC"
            icon="plus"
            text="新增"
            @click="newAddTemp"
          ></u-button
        ></view>
        <view class="operate-btn" v-if="editDisabled"
          ><u-button
            type="primary"
            style="width: 100%; height: 100%"
            color="#387BFC"
            icon="edit-pen"
            text="修改"
            @click="changeTemp"
          ></u-button
        ></view>
        <view class="operate-btn" v-if="!operateDisabled"
          ><u-button
            type="primary"
            style="width: 100%; height: 100%"
            color="#387BFC"
            icon="file-text"
            text="保存"
            @click="saveTemp"
          ></u-button
        ></view>
        <view class="operate-btn" v-if="!operateDisabled"
          ><u-button
            type="primary"
            style="width: 100%; height: 100%"
            color="#387BFC"
            icon="bookmark"
            text="暂存"
            @click="stagingTemp"
          ></u-button
        ></view>
        <view @click="lineTypeShow = true">
          <u--input
            placeholder="专项类别选择"
            disabled
            disabledColor="#fff"
            border="surround"
            v-model="loop_line_type"
            fontSize="11.18rpx"
            style="height: 29.82rpx; width: 74.55rpx"
          ></u--input>
        </view>
        <view @click="departmentShow = true" style="margin-left: 9.31rpx">
          <u--input
            placeholder="部门选择"
            disabled
            disabledColor="#fff"
            border="surround"
            v-model="department_name"
            fontSize="11.18rpx"
            style="height: 29.82rpx; width: 135.13rpx"
          ></u--input>
        </view>
      </view>
      <!-- 信息 -->
      <template v-if="!loadingShow">
        <view class="msg">
          <view class="msg-btn msg-btn-time">时间：{{ nowTime }}</view>
          <view class="msg-btn msg-btn-no" v-if="receiptsNo"
            >单据号：{{ receiptsNo }}</view
          >
          <view class="msg-btn msg-btn-no" v-else>单据号：暂无</view>
          <view class="msg-btn msg-btn-line">生产线：{{ makeLineName }}</view>
          <view class="msg-btn msg-btn-classes" v-if="workTimeName"
            >班次：{{ workTimeName }}</view
          >
          <view class="msg-btn msg-btn-classes" v-else>班次：暂无</view>
          <view class="msg-btn msg-btn-person">填写人：{{ written }}</view>
        </view>
        <!-- 伸缩填写 -->
        <view class="fill-in" v-if="showFillIn">
          <view class="fill-in-header">
            <text>填写/收起：</text
            ><u-switch
              v-model="fill"
              activeColor="#26de81"
              :disabled="fillDisable"
              @change="fillChange"
              size="15"
            ></u-switch>
          </view>
          <view
            class="fill-in-body"
            ref="hiddenFill"
            :style="
              fill
                ? 'height:344.82rpx;overflow:visible'
                : 'height:0;overflow:hidden'
            "
          >
            <view class="fill-body-input">
              <text
                class="body-input-text"
                style="width: 93.19rpx; margin-bottom: 9.31rpx"
                >检查过程描述：</text
              ><u--textarea
                v-model="fillContent"
                count
                placeholder="请输入内容"
                height="30"
                style="width: 50%"
              ></u--textarea>
            </view>
            <view class="fill-body-input">
              <text class="body-input-text">问题描述：</text
              ><u--textarea
                v-model="fillMatter"
                count
                placeholder="请输入内容"
                height="30"
                style="width: 50%"
              ></u--textarea>
            </view>
            <view class="fill-body-input">
              <text class="body-input-text">整改内容：</text
              ><u--textarea
                v-model="fillModify"
                count
                placeholder="请输入内容"
                height="30"
                style="width: 50%"
              ></u--textarea>
            </view>
            <view class="fill-body-input">
              <text class="body-input-text">整改责任人员：</text>
              <view style="width: 140px"
                ><u--input
                  placeholder="请输入名称"
                  border="surround"
                  v-model="fillOper"
                  style="height: 30px"
                  fontSize="18px"
                ></u--input
              ></view>
            </view>
            <view class="fill-body-input">
              <text class="body-input-text">整改截止日：</text>
              <view style="width: 300px" @click="maskClick">
                <uni-datetime-picker
                  type="date"
                  :clear-icon="false"
                  v-model="fillRequireDate"
                  @change="timeChangeFill"
                  style="height: 30px"
                />
              </view>
            </view>
          </view>
        </view>
        <!-- 表格 -->
        <view class="table" v-if="checkTempList.length">
          <table class="table-box" cellpadding="0" cellspacing="0" width="200">
            <!-- 表头 -->
            <thead>
              <tr>
                <th style="width: 15%"><view>工艺过程</view></th>
                <th style="width: 85%">
                  <view class="head-line">
                    <view class="line-two" style="padding: 20px 30px"
                      >工艺要求</view
                    >
                    <view class="line-three" style="padding: 20px 10px"
                      >操作记录</view
                    >
                  </view>
                </th>
              </tr>
            </thead>
            <!-- 表体 -->
            <tbody>
              <tr v-for="(item, index) in checkTempList" :key="index">
                <!-- 第一列 -->
                <td style="color: #909399; border-top: 1px solid #ebeef5">
                  <view class="line-one">
                    {{ item.step_name }}
                  </view>
                </td>
                <!-- 第二/三列 -->
                <td>
                  <view
                    style="display: flex"
                    v-for="(childItem, childIdx) in item.child"
                    :key="childIdx"
                  >
                    <!-- 工艺要求（第二列） -->
                    <view class="line-two">
                      <view>{{ childItem.content }}</view>
                    </view>
                    <!-- 操作记录（第三列） -->
                    <view class="line-three">
                      <template v-for="(opItem, opIdx) in childItem.opers">
                        <!-- 单选 -->
                        <view
                          :key="opIdx"
                          v-if="opItem.para_type == '单选'"
                          class="operation-check"
                        >
                          {{ opItem.param_pre }}
                          <u-radio-group
                            v-model="opItem.curr_value"
                            placement="row"
                          >
                            <u-radio
                              :customStyle="{ marginRight: '8px' }"
                              v-for="radioItem in opItem.dicts_list"
                              :key="radioItem.id"
                              :label="radioItem.name"
                              :name="radioItem.value"
                              size="14"
                              :disabled="operateDisabled"
                              @change="
                                allChange(
                                  radioItem.value,
                                  opItem,
                                  childItem.step_tag
                                )
                              "
                            >
                            </u-radio>
                          </u-radio-group>
                          {{ opItem.param_suffix }}
                          <!-- 验证成功图标 -->
                          <view
                            class="check-success"
                            v-if="opItem.check_result == '1'"
                          >
                            <u-icon
                              name="checkmark-circle"
                              size="20"
                              color="#2ecc71"
                            ></u-icon>
                          </view>
                        </view>

                        <!-- 多选 -->
                        <view
                          :key="opIdx"
                          v-if="opItem.para_type == '多选'"
                          class="operation-check"
                        >
                          {{ opItem.param_pre }}
                          <u-checkbox-group
                            placement="row"
                            @change="
                              checkGroup($event, opItem, childItem.step_tag)
                            "
                          >
                            <u-checkbox
                              :customStyle="{ marginRight: '8px' }"
                              v-for="(
                                checkboxItem, checkboxIdx
                              ) in opItem.dicts_list"
                              :key="checkboxIdx"
                              :label="checkboxItem.name"
                              :name="checkboxItem.value"
                              :disabled="operateDisabled"
                            >
                            </u-checkbox>
                          </u-checkbox-group>
                          {{ opItem.param_suffix }}
                        </view>

                        <!-- 输入框 -->
                        <view
                          :key="opIdx"
                          v-if="
                            opItem.para_type == '数字' ||
                            opItem.para_type == '文本'
                          "
                          class="operation-check"
                        >
                          {{ opItem.param_pre }}
                          <view style="width: 46.59rpx; margin: 0 2px">
                            <!-- 数字输入框 -->
                            <u-input
                              v-if="opItem.para_type == '数字'"
                              placeholder=""
                              v-model="opItem.curr_value"
                              border="surround"
                              type="number"
                              :disabled="
                                opItem.dev_coll_style == 1 || operateDisabled
                              "
                              @blur="
                                allChange($event, opItem, childItem.step_tag)
                              "
                            ></u-input>
                            <u-input
                              v-if="opItem.para_type == '文本'"
                              placeholder=""
                              v-model="opItem.curr_value"
                              border="surround"
                              type="text"
                              :disabled="
                                opItem.dev_coll_style == 1 || operateDisabled
                              "
                              @blur="
                                allChange($event, opItem, childItem.step_tag)
                              "
                            ></u-input> </view
                          >{{ opItem.param_suffix }}
                          <u-button
                            v-if="opItem.dev_coll_style !== 0"
                            style="
                              width: 65.23rpx;
                              height: 27.95rpx;
                              margin-left: 9.31rpx !important;
                            "
                            type="primary"
                            @click="devCollClick(opItem)"
                            >采集</u-button
                          >
                          <!-- 验证成功图标 -->
                          <view
                            class="check-success"
                            v-if="opItem.check_result == '1'"
                          >
                            <u-icon
                              name="checkmark-circle"
                              size="20"
                              color="#2ecc71"
                            ></u-icon>
                          </view>
                        </view>

                        <!-- 直接选择框 -->
                        <view
                          :key="opIdx"
                          v-if="opItem.para_type == '直接判定'"
                          class="operation-check"
                        >
                          {{ opItem.param_pre }}
                          <u-switch
                            v-model="opItem.curr_value"
                            :disabled="operateDisabled"
                            @change="change(opItem, childItem.step_tag)"
                            size="15"
                          ></u-switch>
                          {{ opItem.param_suffix }}
                          <!-- 验证成功图标 -->
                          <view class="check-success" v-if="opItem.curr_value">
                            <u-icon
                              name="checkmark-circle"
                              size="20"
                              color="#2ecc71"
                            ></u-icon>
                          </view>
                        </view>
                      </template>
                    </view>
                  </view>
                </td>
              </tr>
            </tbody>
          </table>
        </view>
        <u-empty
          v-else
          mode="list"
          text="暂无专项检查模板"
          :icon="img"
          width="300"
          height="100"
          marginTop="70"
        >
        </u-empty>
      </template>
      <!-- 加载中 -->
      <template v-else>
        <view class="loading">
          <u-loading-icon
            mode="circle"
            color="rgb(56, 123, 252)"
            size="28"
            text="加载中"
            duration="900"
          ></u-loading-icon>
        </view>
      </template>
    </template>

    <!-- 历史记录 -->
    <template v-else-if="showHistory == '1'">
      <view class="history-slot">
        <view class="time-pick">
          <!-- 时间选择 -->
          <view style="width: 200.37rpx">
            <uni-datetime-picker
              v-model="range"
              type="daterange"
              @change="timeChange"
            />
          </view>
          <!-- 流转卡号输入 -->
          <view style="margin-left: 9.31rpx">
            <u--input
              placeholder="请输入流转卡号"
              clearable
              border="surround"
              v-model="queryWorkCard"
              style="font-size: 11.18rpx; height: 33.55rpx; width: 139.79rpx"
            ></u--input>
          </view>
          <!-- 查询按钮 -->
          <view
            style="margin-left: 9.31rpx; width: 74.55rpx"
            @click="queryHistory"
          >
            <u-button type="primary" text="查询"></u-button>
          </view>
        </view>

        <!-- 历史记录表格 -->
        <template>
          <view class="history-table">
            <view class="table-header">
              <view class="table-content">单据号</view>
              <view class="table-content">部门</view>
              <view class="table-content">检查模板</view>
              <view class="table-content">检测结果</view>
              <view class="table-content">检测时间</view>
            </view>
            <!-- <view class="tabel-row" v-if="good_list.length <= 0">
            <view
              style="
                height: 100%;
                color: #cccccc;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              暂无数据</view
            >
          </view> -->
            <view class="table-row" v-if="!loadingHistoryShow">
              <u-list class="table-list-slot" @scrolltolower="pageNext">
                <u-list-item v-for="(item, idx) in historyData" :key="idx">
                  <view
                    class="list-slot-row"
                    @click="historyContentClick(item.check_special_items_id)"
                  >
                    <view class="table-content">{{ item.slide_no }}</view>
                    <view class="table-content">{{
                      item.check_thead_name
                    }}</view>
                    <view class="table-content">{{
                      item.department_name
                    }}</view>
                    <view class="table-content">{{
                      item.exec_result_name
                    }}</view>
                    <view class="table-content">{{ item.exec_time }}</view>
                  </view>
                </u-list-item>
              </u-list>
            </view>
            <view class="history-loading" v-else>
              <u-loading-icon
                mode="circle"
                color="rgb(56, 123, 252)"
                size="28"
                text="加载中"
                duration="900"
              ></u-loading-icon>
            </view>
          </view>
        </template>
      </view>
    </template>

    <!-- 多媒体 -->
    <template v-else-if="showHistory == '3'">
      <view>mult</view>
    </template>

    <!-- 新增模板选择器 -->
    <u-picker
      :show="addTempShow"
      :columns="addTempColumns"
      cancelText=""
      keyName="check_thead_name"
      @confirm="addTempConfirm"
    ></u-picker>

    <!-- 专项检查类别选择器 -->
    <u-picker
      :show="lineTypeShow"
      :columns="lineTypeColumns"
      keyName="check_special_type_name"
      @confirm="lineTypeConfirm"
      @cancel="lineTypeShow = false"
    ></u-picker>

    <!-- 部门选择器 -->
    <u-picker
      :show="departmentShow"
      :columns="makeLineColumns"
      keyName="department_name"
      @confirm="departmentConfirm"
      @cancel="departmentShow = false"
    ></u-picker>

    <!-- 点击保存后遮罩层 -->
    <overlay v-show="overlayShow"></overlay>
  </view>
</template>

<script>
import NET from "../../utils/request.js";
import API from "../../config/api.js";
import { device } from "../../utils/deviceCollect.js";
import { rights } from "../../utils/rights.js";

import overlay from "../../components/overlay/overlay.vue";

export default {
  components: { overlay },
  data() {
    return {
      a: true,
      b: false,
      // 查看历史按钮文本
      header_box_text: "查看历史",
      header_box_icon: "clock",
      // 多媒体上传按钮文本
      header_box_mult_text: "多媒体",
      header_box_mult_icon: "play-circle",

      // 为空的图片提示
      img: "../../static/img/none.png",
      // 加载中
      loadingShow: true,

      // 获取时间/单据号/生产线/班次/填写人
      nowTime: "",
      receiptsNo: "",
      makeLineName: "",
      workTimeName: "",
      written: "",

      //工位ID
      work_position_id: "",
      // 生产线ID
      make_line_id: "",
      // 专项检查模板数据
      checkTempList: [],
      // 专项检查模板输入框
      tempValue: "",
      // 暂存/保存参数
      is_temp_save: 1,

      // 检查模板名称
      work_step_stard_name: "",
      // 检查模板uuid
      uuid: "",
      //检测表ID/流转卡ID/班次ID
      data_head_id: "",
      work_card_id: "",
      work_time_id: "",

      // 多媒体切换/按钮禁用
      showMult: false,
      multDisabled: false,
      // 查看历史与模板页面切换
      showHistory: "2",
      historyDisabled: false,
      // 查看历史输入框model
      range: [],
      range2: [],
      // 搜索/流转卡号
      queryWorkCard: "",
      // 查看历史数据
      historyData: [],
      // 历史记录加载中
      loadingHistoryShow: true,

      // 分页
      currPage: 1,
      maxPageCount: 7,
      total: 0,

      // 新增按钮模板
      addTempShow: false,
      addTempColumns: [[]],
      // 存储选择的新增模板thead_id(新增、暂存)
      check_thead_id: "",
      check_thead_name: "",

      // 生产线类型选择
      lineTypeShow: false,
      lineTypeColumns: [[]],
      // 存储选择的新增模板thead_id(新增、暂存)
      check_special_type_id: "",
      // 生产线类型绑定model
      loop_line_type: "",

      // 部门选择
      departmentShow: false,
      makeLineColumns: [[]],
      department_id: "",
      // 部门名称绑定model
      department_name: "",

      // 伸缩填写栏
      showFillIn:true,
      fill: false,
      fillDisable: false,
      // 伸缩输入框内容
      fillContent: "",
      fillMatter: "",
      fillModify: "",
      fillOper: "",
      fillRequireDate: "",

      // 模板操作禁用
      operateDisabled: false,
      // 修改按钮禁用
      editDisabled: false,

      // 遮罩加载
      overlayShow: false,
    };
  },
  mounted() {
    // 生产线ID/模板ID赋值
    this.work_position_id =
      uni.getStorageSync("putStationArr")[1].work_position_id;
    this.make_line_id = uni.getStorageSync("putStationArr")[1].make_line_id;
    // 进入时调用选择模板接口/巡线类别选择接口/所有生产线
    this.getAddTemp();
    this.getLineType();
    this.getAllLine();

    // 界面赋值(时间/生产线/填写人)
    this.getTime();
    this.makeLineName = uni.getStorageSync("putStationArr")[0].name;
    this.written = uni.getStorageSync("userInfo").NAME;
  },
  methods: {
    //? =====界面交互=====
    maskClick() {
      console.log(this.$refs.hiddenFill);
    },
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      this.nowTime = `${y}年${m}月${d}日`;
    },
    // 新增按钮点击
    newAddTemp() {
      this.addTempShow = true;
    },
    // 复选框选择
    checkGroup(e, item, step_tag) {
      item.curr_value = e;
      this.allChange(item.curr_value, item, step_tag);
    },
    checkboxChange(n) {
      console.log("checkboxChange", n);
    },
    // 操作 => 直接选择
    change(opItem, step_tag) {
      this.allChange(opItem.curr_value, opItem, step_tag);
    },
    // 输入框失去焦点调用验证
    allChange(e, opItem, step_tag) {
      console.log(e, opItem, step_tag);

      // 定义验证所需的空obj
      let stepObj = {};
      // 是否需要验证
      if (opItem.is_need_valid) {
        //是否需要传所有操作参数,拼接({"T010":{"操作1":10,"操作2":100},"T020":{"操作1":10}})
        if (opItem.is_send_all_oper_value) {
          this.checkTempList.forEach((item) => {
            item.child.forEach((child) => {
              let tempObj = {};
              child.opers.forEach((step) => {
                tempObj[step.para_name] = step.curr_value;
              });
              stepObj[child.step_tag] = tempObj;
            });
          });
          // console.log(stepObj);
        } else {
          // 只传入当前工步的操作记录
          let opers_name = {};
          let para_name = opItem.para_name;
          let curr_value = opItem.curr_value;
          opers_name[para_name] = curr_value;
          stepObj[step_tag] = opers_name;
          console.log(stepObj);
        }
        // 拼接验证所需的参数并传递
        let data = {
          script_content: opItem.script_content,
          uuid: this.uuid,
          data_head_id: this.data_head_id,
          work_position_id: this.work_position_id,
          work_time_id: data.work_time_id,
          step_tag: step_tag,
          para_name: opItem.para_name,
          work_step_stard_name: this.work_step_stard_name,
          curr_value: opItem.curr_value,
          steps: stepObj,
        };
        // 调用验证接口
        this.needValid(data, opItem);
      } else {
        opItem.check_result = 0;
      }
    },

    // 选择模板新增确认
    addTempConfirm(event) {
      this.addTempShow = false;

      this.check_thead_id = event.value[0].check_thead_id;
      this.check_thead_name = event.value[0].check_thead_name;
      this.operType = "0";
      this.getTempData("0");
    },

    // 巡线类别确认
    lineTypeConfirm(event) {
      this.lineTypeShow = false;
      this.check_special_type_id = event.value[0].check_special_type_id;
      this.loop_line_type = event.value[0].check_special_type_name;
      console.log(this.check_special_type_id);
    },
    // 部门选择确认
    departmentConfirm(event) {
      this.departmentShow = false;
      console.log(event);
      this.department_id = event.value[0].department_id;
      this.department_name = event.value[0].department_name;
    },

    // 输入框点击采集按钮
    async devCollClick(opItem) {
      console.log(opItem);
      let deviceStr = await device(
        this.work_position_id,
        opItem.device_coll_type_id,
        opItem.device_coll_param
      );
      opItem.curr_value = deviceStr;
    },

    // 查看历史按钮点击
    historyBtnClick() {
      // 2为模板，1为历史，3为多媒体
      if (this.showHistory == "2") {
        this.b = true;
        this.showHistory = "1";
        this.multDisabled = true;
      } else if (this.showHistory == "1") {
        this.b = false;

        this.showHistory = "2";
        this.multDisabled = false;
      } else if (this.showHistory == "3") {
        this.showHistory = "1";
      }

      if (this.showHistory == "1") {
        this.multDisabled = true;
        this.header_box_text = "返回模板";
        this.header_box_icon = "arrow-left";
        // 清空分页
        this.currPage = 1;
        this.maxPageCount = 7;
        this.historyData = [];
        // 清空时间
        this.range = [];
        // 调用历史记录接口
        this.getHistoryData();
      } else if (this.showHistory == "2") {
        this.header_box_text = "查看历史";
        this.header_box_icon = "clock";
        // 加载历史表格show
        this.loadingHistoryShow = true;
      }
    },
    // 查看历史时日期选择
    timeChange(e) {
      console.log(e);
    },
    // 描述填写时间选择
    timeChangeFill(e) {
      console.log(e);
    },
    // 历史记录详情点击
    historyContentClick(id) {
      // 切换历史show
      this.showHistory = "2";
      this.header_box_text = "查看历史";
      this.header_box_icon = "clock";
      // 开启加载
      this.loadingShow = true;

      this.btnDisable = false;

      // 调用历史详情接口
      this.getById(id);
    },
    // 历史记录列表下拉触底
    pageNext() {
      console.log("触底");
      this.currPage = this.currPage + 1;
      if (this.currPage > this.total) {
        return;
      }

      this.getHistoryData();
      console.log(this.currPage);
      console.log(this.historyData);
    },
    queryHistory() {
      // 清空分页
      this.currPage = 1;
      this.maxPageCount = 7;
      this.historyData = [];
      this.getHistoryData();
    },

    // 伸缩填写栏
    fillChange(e) {
      this.fill = e;
    },

    // 多媒体按钮点击
    multBtnClick() {
      if (this.showHistory == "2") {
        this.a = false;
        this.b = true;
        this.showHistory = "3";
        this.historyDisabled = true;
        this.header_box_mult_icon = "arrow-left";
        this.header_box_mult_text = "返回模板";
      } else if (this.showHistory == "3") {
        this.a = true;
        this.b = false;
        this.showHistory = "2";
        this.historyDisabled = false;
        this.header_box_mult_text = "多媒体";
        this.header_box_mult_icon = "play-circle";
      }
    },

    //? ==============数据处理===============
    // 转换判定
    handleArray(array) {
      array.forEach((item) => {
        item.child.forEach((child) => {
          child.opers.forEach((step) => {
            if (step.para_type == "直接判定") {
              if (step.curr_value == "true") {
                step.curr_value = true;
              } else if (step.curr_value == "false") {
                step.curr_value = false;
              }
            } else if (step.para_type == "多选" && !step.curr_value) {
              step.curr_value = [];
            }
          });
        });
      });
      return array;
    },
    // 获取专项检查模板
    getTempData(operType = "0") {
      console.log("operType:", operType);
      NET.tempRequest(
        API.specialTemp,
        {
          operType: operType, //默认为1(暂存)，点击新增时重新调用接口，改为0
          check_thead_id: this.check_thead_id,
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            this.loadingShow = false;

            // 取消按钮禁用
            this.operateDisabled = false;

            this.checkTempList = res.data.data.steps;
            // 转换判定
            this.checkTempList = this.handleArray(this.checkTempList);
            console.log(this.checkTempList);
            if(!this.checkTempList.length){
              this.showFillIn = false;
            }

            // 保存检查模板名称/uuid/data_head_id
            this.work_step_stard_name = res.data.data.work_step_stard_name;
            this.uuid = res.data.data.uuid;
            this.data_head_id = res.data.data.data_head_id;
            // 流转卡号赋值
            this.work_card_id = res.data.data.work_card_id;
            // 班次ID赋值
            this.work_time_id = res.data.data.work_time_id;

            //? ========单据号/班次赋值==========
            this.receiptsNo = res.data.data.work_card_slide_no;
            this.workTimeName = res.data.data.work_time_name;
          } else if (res.data.code == 204) {
            this.loadingShow = false;
            // this.fillDisable = true;
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          this.loadingShow = false;
          // this.fillDisable = true;
          console.log(err);
          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
        });
    },

    //@ !!!首先请求!!! 请求模板查询接口
    getAddTemp() {
      NET.tempRequest(API.specialFindCheck, {}, "POST")
        .then((res) => {
          if (res.data.code == 200) {
            // 赋值columns
            let tempArr = res.data.data;
            if (tempArr.length == 1) {
              this.loadingShow = false;

              this.$set(this.addTempColumns, 0, res.data.data);
              console.log(tempArr);
              // 如果模板只有一个，直接调用模板
              this.check_thead_id = tempArr[0].check_thead_id;
              this.check_thead_name = tempArr[0].check_thead_name;
              let operType = "1";
              this.getTempData(operType);
              // 否则调用选择模板
            } else if (tempArr.length > 1) {
              uni.showToast({
                title: "请选择一个模板!",
                icon: "none",
                duration: 2000,
                success: () => {
                  this.addTempShow = true;
                },
              });
              this.$set(this.addTempColumns, 0, res.data.data);
            }
          } else if (res.data.code == 204) {
            this.loadingShow = false;
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          this.loadingShow = false;
          console.log(err);
          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
        });
    },
    // 专项检查类别接口
    getLineType() {
      NET.tempRequest(API.specialAllType, {}, "POST")
        .then((res) => {
          console.log(res);
          this.$set(this.lineTypeColumns, 0, res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 所有部门接口
    getAllLine() {
      NET.tempRequest(API.specialDepartment, {}, "POST")
        .then((res) => {
          console.log(res);
          this.$set(this.makeLineColumns, 0, res.data.data);
          console.log(this.makeLineColumns);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改按钮点击
    changeTemp() {
      this.operateDisabled = false;
    },
    // 保存按钮点击
    saveTemp() {
      // 保存中遮罩
      this.overlayShow = true;

      // 隐藏修改按钮
      this.editDisabled = false;

      this.is_temp_save = 0;
      // 赋值exec_result，如有一个为0则都为0
      let exec_result = 0;
      this.checkTempList.forEach((list) => {
        list.child.forEach((child) => {
          child.opers.filter((oper) => {
            if (oper.check_result == 1) {
              exec_result = 1;
            }
          });
        });
      });

      NET.tempRequest(
        API.specialSaveTemp,
        {
          data_head_id: this.data_head_id,
          make_line_id: this.make_line_id,
          work_position_id: this.work_position_id, //从缓存中获取
          work_card_id: this.work_card_id,
          work_time_id: this.work_time_id,
          check_thead_id: this.check_thead_id,
          check_thead_name: this.check_thead_name,
          check_special_type_id: this.check_special_type_id,
          department_id: this.department_id,
          is_temp_save: this.is_temp_save,
          exec_result: exec_result, //检查结果(即校验结果，0为通过，1未通过)
          work_step_stard_name: this.work_step_stard_name,
          steps: this.checkTempList,

          check_content: this.fillContent, //检查过程描述
          matter_content: this.fillMatter, //问题描述
          modify_content: this.fillModify, //整改内容
          modify_oper: this.fillOper, //整改责任人员
          modify_require_date: this.fillRequireDate, //整改截止日
        },
        "POST"
      )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.overlayShow = false;

            this.fillMatter = "";
            this.fillContent = "";
            this.fillModify = "";
            this.fillOper = "";
            this.fillRequireDate = "";

            // let operType = "1";
            // this.getTempData(operType);
            uni.showToast({
              title: "保存成功！",
              icon: "success",
              duration: 2000,
            });
          } else if (res.data.code == 204) {
            this.overlayShow = false;

            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          this.overlayShow = false;

          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
          console.log(err);
        });
    },
    // 暂存按钮点击
    stagingTemp() {
      // 隐藏修改按钮
      this.editDisabled = false;

      this.is_temp_save = 1;
      // 赋值exec_result，如有一个为0则都为0
      let exec_result = 0;
      this.checkTempList.forEach((list) => {
        list.child.forEach((child) => {
          child.opers.filter((oper) => {
            if (oper.check_result == 1) {
              exec_result = 1;
            }
          });
        });
      });
      console.log(this.department_id);
      NET.tempRequest(
        API.specialSaveTemp,
        {
          data_head_id: this.data_head_id,
          work_position_id: this.work_position_id, //缓存中获取
          work_card_id: this.work_card_id,
          work_time_id: this.work_time_id,
          check_thead_id: this.check_thead_id,
          check_thead_name: this.check_thead_name,
          check_special_type_id: this.check_special_type_id,
          department_id: this.department_id,
          is_temp_save: this.is_temp_save,
          exec_result: exec_result, ////检查结果(即校验结果，0为通过，1未通过)
          work_step_stard_name: this.work_step_stard_name,
          steps: this.checkTempList,

          check_content: this.fillContent, //检查过程描述
          matter_content: this.fillMatter, //问题描述
          modify_content: this.fillModify, //整改内容
          modify_oper: this.fillOper, //整改责任人员
          modify_require_date: this.fillRequireDate, //整改截止日
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res);
            this.fillMatter = "";
            this.fillContent = "";
            this.fillModify = "";
            this.fillOper = "";
            this.fillRequireDate = "";

            let operType = "1";
            this.getTempData(operType);
            uni.showToast({
              title: "暂存成功！",
              icon: "success",
              duration: 2000,
            });
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

    // 调用校验接口
    needValid(data, opItem) {
      NET.tempRequest(
        API.specialCheck,
        {
          curr_value: data.curr_value,
          data_head_id: data.data_head_id,
          para_name: data.para_name,
          script_content: data.script_content,
          work_time_id: data.work_time_id,
          step_tag: data.step_tag,
          steps: data.steps,
          uuid: data.uuid,
          work_position_id: data.work_position_id,
          work_step_stard_name: data.work_step_stard_name,
        },
        "POST"
      )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            console.log(res);
            // 判断是否验证成功
            if (res.data.data.result == true) {
              opItem.check_result = "1";
            } else {
              opItem.check_result = "0";
            }
            // 新增是否验证字段进行提示
            console.log(opItem);
          } else if (res.data.code == 204) {
            console.log("204err");
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

    // 开班历史记录接口
    getHistoryData() {
      this.loadingHistoryShow = true;
      NET.tempRequest(
        API.specialFindList,
        {
          currPage: this.currPage,
          maxPageCount: this.maxPageCount,
          pare_start_date: this.range[0],
          pare_end_date: this.range[1],
          work_card_slide_no: this.queryWorkCard,
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            this.loadingHistoryShow = false;
            // 赋值历史记录列表
            this.total = res.data.data.total;
            this.historyData = this.historyData.concat(res.data.data.list);
            console.log(this.historyData);
          } else if (res.data.code == 204) {
            this.loadingHistoryShow = false;
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          this.loadingHistoryShow = false;
          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
          console.log(err);
        });
    },
    // 专项明细接口
    getById(data_head_id) {
      // 修改按钮显示/隐藏
      let right = rights("check_special_items:canEdit");
      if (right.length) {
        this.editDisabled = true;
      }

      // 切换历史show
      this.loadingShow = true;

      let url = API.specialFindById + "/" + data_head_id;
      NET.tempRequest(url, {}, "POST")
        .then((res) => {
          if (res.data.code == 200) {
            this.loadingShow = false;

            console.log(res.data.data);
            this.data_head_id = data_head_id;
            this.checkTempList = res.data.data.steps;

            // 赋值模板ID
            this.check_thead_id = res.data.data.check_thead_id;

            // 赋值描述内容
            this.fillContent = res.data.data.check_content; //检查过程描述
            this.fillMatter = res.data.data.matter_content; //问题描述
            this.fillModify = res.data.data.modify_content; //整改内容
            this.fillOper = res.data.data.modify_oper; //整改责任人员
            this.fillRequireDate = res.data.data.modify_require_date; //整改截止日

            // 转换判定
            this.checkTempList = this.handleArray(this.checkTempList);

            // 专项检查模板历史check_open_work_id/是否保存或暂存值赋值
            let check_special_items_id = res.data.data.check_special_items_id;
            let new_is_temp_save = res.data.data.is_temp_save;
            this.disabledOperation(check_special_items_id, new_is_temp_save);
          } else if (res.data.code == 204) {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          uni.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2000,
          });
          console.log(err);
        });
    },

    // 隐藏/显示模板操作按钮
    disabledOperation(id, is_temp_save) {
      if (id) {
        // 1为暂存0为保存,0则隐藏
        if (!is_temp_save) {
          this.operateDisabled = true;
        } else {
          this.operateDisabled = false;
          this.editDisabled = false;
        }
      } else {
        // 无值则隐藏
        this.operateDisabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  width: calc(100% - 18.63rpx);
  height: calc(100% - 18.63rpx);
  padding: 9.31rpx;
  // 头部按钮
  .header-box {
    position: absolute;
    right: 18.63rpx;
    top: 13.97rpx;
    width: 78.28rpx;
    border-radius: 0.93rpx;
    box-shadow: 0 0.93rpx 3.72rpx #387bfc;
    z-index: 99;
  }
  .header-box-mult {
    position: absolute;
    // right: 111.83rpx;
    top: 13.97rpx;
    width: 78.28rpx;
    border-radius: 0.93rpx;
    box-shadow: 0 0.93rpx 3.72rpx #387bfc;
    transition: all 0.3s cubic-bezier(0.17, -0.28, 0.82, 1.27);
    z-index: 98;
  }

  // 操作按钮
  .operate {
    display: flex;
    margin-bottom: 9.31rpx;
    .operate-btn {
      width: 60.57rpx;
      height: 31.68rpx;
      margin-right: 9.31rpx;
    }
  }
  // 表格加载中
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }
  // 信息
  .msg {
    display: flex;
    margin-bottom: 9.31rpx;
    .msg-btn {
      width: auto;
      padding: 0 4.65rpx;
      height: 31.68rpx;
      line-height: 31.68rpx;
      border: 0.93rpx solid red;
      background-color: rgba(255, 17, 0, 0.226);
      margin-right: 9.31rpx;
      text-align: center;
      font-size: 9.31rpx;
      overflow: hidden;
      white-space: nowrap;
      // text-overflow: ellipsis;
      border-radius: 2.79rpx;
    }
    .msg-btn-time {
      background: #40a0ff34;
      border: 0.93rpx solid #409eff;
      color: #2893ff;
    }
    .msg-btn-no {
      background: #67c23a2d;
      border: 0.93rpx solid #67c23a;
      color: #5ac525;
    }
    .msg-btn-line {
      background: #90939944;
      border: 0.93rpx solid #909399;
      color: #788092;
    }
    .msg-btn-classes {
      background: #e6a23c46;
      border: 0.93rpx solid #e6a23c;
      color: #e09320;
    }
    .msg-btn-person {
      background: #f56c6c42;
      border: 0.93rpx solid #f56c6c;
      color: #f14f4f;
    }
  }
  // 填写/收起
  .fill-in {
    font-size: 11.18rpx;
    margin-bottom: 9.31rpx;
    .fill-in-header {
      display: flex;
      margin-bottom: 9.31rpx;
    }
    .fill-in-body {
      .fill-body-input {
        margin-bottom: 11.18rpx;
      }
    }
  }
  // 表格
  .table {
    width: 100%;
    font-size: 11.18rpx;
    overflow-y: scroll;
    // height: calc(100% - 100px);
  }
}

// 原生表格
.table-box {
  width: 100%;
  border: 0.93rpx solid #ebeef5;
  .head-line {
    display: flex;
    width: 100%;
  }
  .line-one {
    padding: 9.31rpx 9.31rpx;
    text-align: center;
  }
  .line-two {
    flex: 3;
    padding: 18.63rpx 9.31rpx;
    border: 0.93rpx solid #ebeef5;
    border-bottom: none;
  }
  .line-three {
    flex: 1.5;
    .operation-check {
      display: flex;
      align-items: center;
      padding: 0 9.31rpx;
      padding-top: 18.63rpx;
      padding-bottom: 18.63rpx;
      border-top: 0.93rpx solid #ebeef5;
      position: relative;
      .check-success {
        position: absolute;
        right: 9.31rpx;
      }
    }
  }
}

// 查看历史
.history-slot {
  overflow-y: scroll;
  height: 100%;
  position: relative;
  .time-pick {
    display: flex;
    align-items: center;
    margin-bottom: 14.91rpx;
  }
  .history-table {
    border: 0.93rpx solid #ebeef5;
    border-radius: 9.31rpx;
    width: calc(100% - 20.5rpx);
    height: calc(100% - 74.55rpx);
    margin-top: 9.31rpx;
    padding: 9.31rpx 9.31rpx;
    overflow-x: scroll;
    overflow-y: hidden;
    .table-header {
      font-size: 13.04rpx;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 0.93rpx solid #ebeef5;
      padding: 13.97rpx 0;
    }
    .table-row {
      overflow-y: scroll;
      height: calc(100% - 52.19rpx);
      width: 100%;
      margin-bottom: 9.31rpx;
      .table-list-slot {
        height: 100% !important;
        .list-slot-row {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #606266;
          padding: 13.97rpx 4.65rpx;
          border-bottom: 0.93rpx solid #ebeef5;
          font-size: 9.31rpx;
        }
      }
    }
  }
  .history-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }
}
.table-content {
  width: 25%;
  text-align: center;
}

// 上方按钮字体
/deep/ .u-button__text {
  font-size: 10.25rpx !important;
}

/deep/.u-cell__body {
  padding-left: 0 !important;
}
/deep/ .u-cell__body {
  font-size: 13.04rpx;
}
/deep/ .u-collapse-item__content__text {
  font-size: 13.04rpx;
  padding-bottom: 0;
}

// 操作记录内按钮
/deep/ .u-button--normal {
  margin: 0 !important;
}
//操作记录内输入框
/deep/ .u-input--radius {
  padding: 1.86rpx 8.38rpx !important;
}

//日期选择
/deep/ .uni-date-range--x {
  right: -344.82rpx !important;
}
/deep/ .uni-date__x-input {
  font-size: 9.31rpx;
}

// 流转卡号输入
/deep/ .u-input__content__field-wrapper__field {
  font-size: 9.31rpx;
}

// 模板单选框字体大小
/deep/ .u-radio__text {
  font-size: 11.18rpx !important;
}

// 功能按钮icon大小修改
/deep/ .uicon-plus {
  font-size: 11.18rpx !important;
}
</style>
