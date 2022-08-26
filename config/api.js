//? baseUrl
// const BASE_URL = "http://192.168.1.60:80";
// const BASE_URL = "http://192.168.1.167:81";
// const BASE_URL = "http://192.168.1.226:85";
const BASE_URL = "http://120.27.212.89:29033";
//? proxy
const proxy = "/api";
// const proxy = "http://192.168.1.60:80";
// const proxy = "http://192.168.1.167:81";
// const proxy = "http://192.168.1.226:85";
// const proxy = "http://120.27.212.89:29033";

//? serve
const PRIDE = "/mes/pride-mes-core";
// MES
const MES = "/mes/pride-mes-system";
// const MES = "/mes/pride-mes-system-liuhy";
// const MES="/mes/pride-mes-system-tangr";
// version serve
const VersionMES = "/mes/pride-mes-system-liuhy";

//? websocket
const websocketUrl = "ws://192.168.1.60:8090/api/webSocket";

module.exports = {
  edition: 100, //软件版本号  打包时 需要与设置里 版本号一致

  getInfo: proxy + MES + "/head/getInfo", //获取登录人信息

  websocketUrl: websocketUrl,

  // login: BASE_URL + PRIDE
  login: BASE_URL + MES,

  upload: proxy + "/mes/jw-upload/upload/file",

  workPosition: proxy + MES + "/app/pub/deviceInfoByWorkPosition", //参数:work_position_id

  // 获取工位信息
  workInfo: proxy + MES + "/home/findWorkPosition", // 参数：无

  workerInfo: proxy + PRIDE + "/index/login/info", //
  useConnectTest: proxy + MES + "/app/user/connectTest", //判定是否服务器连通接口
  getEsopURL: proxy + MES + "/app/make/esop", //作业指导书接口

  // 首页消息详情接口
  readMsg: proxy + MES + "/app/msg/readMsg", //所有返回的消息参数

  newImportantMessage: proxy + MES + "/app/pub/findNewMessage",

  newNoticeMessage: proxy + MES + "/app/pub/findNewMessage",

  newAbnormalMessage: proxy + MES + "/app/pub/findNewMessage",

  historyImportantMessage: proxy + MES + "/app/pub/findHistoryMessage",

  historyNoticeMessage: proxy + MES + "/app/pub/findHistoryMessage",

  historyAbnormalMessage: proxy + MES + "/app/pub/findHistoryMessage",

  workOrder: proxy + MES + "/app/pub/findWorkOrderByWorkPosition",

  getDefaultWorkTime: proxy + MES + "/app/openWork/getDefaultWorkTime",

  getWorkTimeList: proxy + MES + "/app/openWork/getWorkTimeList", //启动开班 返回所有班次接口

  findOpenWorkList: proxy + MES + "/app/openWork/findWorkCardByMakeLine",

  findStartCheckLine: proxy + MES + "/app/clearLine/findWorkCardByMakeLine",

  pubgDefaultWorkTime: proxy + MES + "/app/openWork/getDefaultWorkTime", // 启动开班  默认班次

  openWorkFindWorkTime: proxy + MES + "/app/pub/findWorkTime", // 启动开班 返回所有班次接口

  openWorkBegin: proxy + MES + "/app/openWork/begin", //启动开班 设置生产线开班接口

  openWorkWorkCard: proxy + MES + "/app/openWork/findWorkCardByMakeLine", //启动开班 可启动流转卡接口

  openWorkChangeWork: proxy + MES + "/app/pub/changeWorkTimeByMakeLine", //启动开班 进行换班接口（去掉）

  beginCleanWork: proxy + MES + "/app/clearCard/begin", //清单启动接口

  findStartCheckWork: proxy + MES + "/app/clearCard/findWorkCardByMakeLine", // 启动清单 获取可清单流转卡信息

  beginCleanLine: proxy + MES + "/app/clearLine/begin", //清场启动接口

  findStartCheckLine: proxy + MES + "/app/clearLine/findWorkCardByMakeLine", //启动清场 获取可清场流转卡信息

  empInOtherFindList: proxy + MES + "/app/empInOther/findList", //收料确定 获取确认收料列表接口参数maxPageCount 每页条数 ，currPage 当前页

  empInOtherSave: proxy + MES + "/app/empInOther/save", //收料确定 物料车间确认接口

  empInOthefindBody: proxy + MES + "/app/empInOther/findBody", //收料确定 物料车间确认接口

  findProdFeed: proxy + MES + "/app/make/findWorkCardByMakeLine", //生产线工单接口

  findProdFeedBom: proxy + MES + "/app/make/findBomList", //领料单明细数据接口

  SaveProdFeed: proxy + MES + "/app/make/saveOutMake", //物料信息保存接口

  findProdFeedBodyList: proxy + MES + "/app/make/findOutMakeBodyList", //已投领料单的领料明细

  OutPutRegister: proxy + MES + "/app/empWork/findList", // 产出登记 可报工流转卡数据接口

  SaveOutPutRegister: proxy + MES + "/app/empWork/save", //产出登记保存接口

  SaveOutedit: proxy + MES + "/app/empWork/edit", //产出登记保存接口

  findDevice: proxy + MES + "/app/deviceStopLog/findDevice", //停机登记 设备

  findDeviceStopType: proxy + MES + "/app/deviceStopLog/findDeviceStopType", //停机登记 停机登记类型

  findBatch: proxy + MES + "/app/make/findBatch", //批次

  deviceStopLogList: proxy + MES + "/app/deviceStopLog/findList",

  saveDeviceStopLog: proxy + MES + "/app/deviceStopLog/save",

  isFPPosition: proxy + MES + "/app/pub/isFPPosition", //判断是否有该工位

  // 产出登记
  outPutFind: proxy + MES + "/app/empWork/find",
  outPutSave: proxy + MES + "/app/empWork/save", //
  outPutFindDetail: proxy + MES + "/app/empWork/findDetail", //
  findReasonTree: proxy + MES + "/app/empWork/findReasonTree", // 工废 和料废 原因
  outPutFindList: proxy + MES + "/app/empWork/findList", //默认筛选条件为当前登陆的生产线和工位
  outPutFindHistory: proxy + MES + "/app/empWork/findHistoryList", //产出登记 报工历史记录
  outPutFetch: proxy + MES + "/app/empWork/fetchQu", //取数,参数：work_position_id

  // 开班检查模板
  startClassTemp: proxy + MES + "/app/openWork/findTemp", // 获取模板，参数：生产订单ID，流转卡ID，工位ID
  startClassSaveTemp: proxy + MES + "/app/openWork/saveTemp", //数据提交,参数：
  checkStep: proxy + MES + "/app/openWork/checkStep", // 步骤检查，参数：
  findList: proxy + MES + "/app/openWork/findList", //；查看历史
  startClassById: proxy + MES + "/app/openWork/findById", //开班检查明细

  // 清单检查模板
  listCheckTemp: proxy + MES + "/app/clearCard/findTemp", //获取模板
  listCheckSaveTemp: proxy + MES + "/app/clearCard/saveTemp", //数据提交
  listCheckStep: proxy + MES + "/app/clearCard/checkStep", // 步骤检查
  listCheckFindList: proxy + MES + "/app/clearCard/findList", //查看历史
  listCheckById: proxy + MES + "/app/clearCard/findById", //清单检查明细

  // 清场检查模板
  cleanCheckTemp: proxy + MES + "/app/clearLine/findTemp", //获取模板
  cleanCheckSaveTemp: proxy + MES + "/app/clearLine/saveTemp", //数据提交
  cleanCheckStep: proxy + MES + "/app/clearLine/checkStep", // 步骤检查
  cleanCheckFindList: proxy + MES + "/app/clearLine/findList", //查看历史
  cleanCheckById: proxy + MES + "/app/clearLine/findById", //清单检查明细

  // 作业记录模板
  workRecordTemp: proxy + MES + "/app/workCardExec/findTemp", //获取模板
  workRecordSaveTemp: proxy + MES + "/app/workCardExec/saveTemp", //数据提交
  workRecordStep: proxy + MES + "/app/workCardExec/checkStep", // 步骤检查
  workRecordFindList: proxy + MES + "/app/workCardExec/findList", //查看历史
  workRecordById: proxy + MES + "/app/workCardExec/findById", //清单检查明细

  // 生产巡线模板
  prodLineTemp: proxy + MES + "/app/loopLine/findTemp", //获取模板
  prodLineSaveTemp: proxy + MES + "/app/loopLine/saveTemp", //数据提交
  prodLineCheck: proxy + MES + "/app/loopLine/checkStep", //步骤检查
  prodLineFindCheck: proxy + MES + "/app/loopLine/findCheck", //检查模板查询
  prodLineFindList: proxy + MES + "/app/loopLine/findList", //历史记录
  prodLineFindById: proxy + MES + "/app/loopLine/findById", //明细
  prodLineAllType: proxy + MES + "/app/loopLine/findAllType", //巡线类别
  prodLineAllLine: proxy + MES + "/app/loopLine/findAllLine", //所有生产线

  // 专项检查模板
  specialTemp: proxy + MES + "/app/specialItems/findTemp", //获取检查模板
  specialSaveTemp: proxy + MES + "/app/specialItems/saveTemp", //  数据提交
  specialCheck: proxy + MES + "/app/specialItems/checkStep", // 步骤检查
  specialFindCheck: proxy + MES + "/app/specialItems/findCheck", //检查模板查询
  specialFindList: proxy + MES + "/app/specialItems/findList", //历史记录
  specialFindById: proxy + MES + "/app/specialItems/findById", //专项检查明细
  specialAllType: proxy + MES + "/app/specialItems/findAllType", //专项类别
  specialDepartment: proxy + MES + "/app/specialItems/findAllDepartment", //部门类型

  // 模板采集按钮
  deviceCollect: proxy + MES + "/app/workCardExec/deviceCollect", //采集按钮

  // APP当前发布版本信息接口
  getAppVersion: proxy + VersionMES + "/app_version/getAppVersion",
};
