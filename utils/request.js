let baseUrl = "http://120.27.212.89:29033";
// let baseUrl = "http://192.168.1.226:85";
// let baseUrl = "http://192.168.1.167:81";
// let baseUrl = "http://192.168.1.60:80";

let pride = "/mes/pride-mes-core";
let MES = "/mes/pride-mes-system";

let proxy = "/api";

let uploadUrl = "http://localhost:8081/upload";

const API = require("../config/api");

// 登录
const Http = (params) => {
  if (params.loading) {
    uni.showLoading({
      title: params.loadText || "请求中...",
      mask: true,
    });
  }
  //设置请求头，请求头默认表单提交方式
  let header = {};
  if (params.header) {
    params.header["Authorization"] =
      "Authorization: Basic cHJpZGVzb2Z0OjEyMzQ1Ng==";
  } else {
    header["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
    header["Authorization"] = "Basic cHJpZGVzb2Z0OjEyMzQ1Ng==";
  }
  // console.log("请求路径：", baseUrl + params.url);
  // console.log("请求参数：", params.data);
  // console.log("请求方式：", params.method);
  return new Promise((resolve, reject) => {
    uni.request({
      // url: `${baseUrl}${params.serve ? MES : pride}${params.url}`,
      url: `${proxy}${params.serve ? MES : pride}${params.url}`,
      method: params.method || "POST",
      data: params.data || {},
      header: params.header || header,
      timeout: params.timeout || 60000,
      success: (res) => {
        // console.log("请求结果：", res.data);
        if (res.data.code == 200) {
          // uni.setStorageSync('token', res.data)
          uni.setStorageSync("tokenInfo", res.data.data);
          resolve(res.data);
        } else if (res.data.code == 401) {
          //未登录
        } else {
          reject(res.data);
          // console.log(`/api${NET.login}${params.url}`);
        }
        uni.hideLoading();
      },
      fail: (error) => {
        reject(new Error("错误"));
        console.log(error);
        uni.showToast({
          title: JSON.stringify(error),
          icon: "none",
        });
        uni.hideLoading();
      },
    });
  });
};

// 自动更新
const update = (url, data, method = "GET") => {
  let header = {};
  header["Content-Type"] = "";
  header["tenant"] = "";
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        if (res.data.code == 200) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

// upload
const uploadFile = (params) => {
  let tokenInfo = uni.getStorageSync("tokenInfo");
  let header = {};
  header["Content-Type"] = "multipart/form-data";
  header["Authorization"] = "Bearer" + tokenInfo.access_token;

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: API.upload,
      files: params.files, //数组
      name: params.name,
      header: header,
      formData: params.formData || {},
      success: (res) => {
        // console.log("文件接口返回的参数：", JSON.parse(uploadFileRes.data));
        // let res = JSON.parse(uploadFileRes.data);
        resolve(res);
      },
      fail: (error) => {
        // uni.showToast({
        //   title: error.statusCode,
        //   icon: "none",
        // });
        // uni.hideLoading();
        reject(error);
      },
    });
  });
};

// 工位请求接口
const workRequest = (url, data, method = "GET") => {
  // console.log(url, "// 基本请求接口");
  let header = {};
  header["content-type"] = "application/json;charset=utf-8";
  header["Authorization"] = "Basic cHJpZGVzb2Z0OjEyMzQ1Ng==";

  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject("res err:", res);
        }
      },
      fail: (res) => {
        reject("res err:", res);
      },
    });
  });
};
// 基本请求接口
const request = (url, data, method) => {
  let tokenInfo = uni.getStorageSync("tokenInfo");
  let header = {};
  header["content-type"] = "application/json;charset=utf-8";
  header["Authorization"] = "Bearer" + tokenInfo.access_token;
  header["token"] = tokenInfo.access_token;

  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject("res err:", res);
        }
      },
      fail: (res) => {
        reject("res err:", res);
      },
    });
  });
};

// 模板接口及workerInfo接口
const tempRequest = (url, data, method = "GET") => {
  let tokenInfo = uni.getStorageSync("tokenInfo");
  let header = {};
  header["Authorization"] = "Bearer" + tokenInfo.access_token;
  header["content-type"] = "application/json;charset=UTF-8";
  header["token"] = tokenInfo.access_token;
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject("res err:", res);
        }
      },
      fail: (res) => {
        reject("res err:", res);
      },
    });
  });
};

module.exports = {
  Http,
  uploadFile,
  request,
  tempRequest,
  workRequest,
};
