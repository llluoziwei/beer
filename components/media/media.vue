<template>
  <view class="mult-slot">
    <!-- 图片上传 -->
    <view class="image-list">
      <text
        style="
          font-size: 13.04rpx;
          margin-right: 9.31rpx;
          position: absolute;
          left: 18.63rpx;
        "
        >照片</text
      >
      <view v-for="(item, index) in imageList" class="imageItem" :key="index">
        <view @click="close(index, 1)" class="close"
          ><u-icon
            size="23.29rpx"
            name="minus-circle-fill"
            color="#387bfc"
          ></u-icon
        ></view>
        <image
          @click="previewImage(index, 1)"
          style="height: 83.87rpx; width: 93.19rpx; border-radius: 10rpx"
          :src="item.uri"
          mode="aspectFit"
        ></image>
      </view>
      <view @click="chooseImg" class="imageItem">
        <u-icon name="plus"></u-icon>
      </view>
    </view>

    <!-- 视频上传 -->
    <view class="video-list">
      <text
        style="
          font-size: 13.04rpx;
          margin-right: 9.31rpx;
          position: absolute;
          left: 18.63rpx;
        "
        >视频</text
      >
      <view v-for="(item, index) in imageList" class="videoItem" :key="index">
        <view @click="close(index, 1)" class="close"
          ><u-icon
            size="23.29rpx"
            name="minus-circle-fill"
            color="#387bfc"
          ></u-icon
        ></view>
        <image
          @click="previewImage(index, 1)"
          style="height: 83.87rpx; width: 93.19rpx; border-radius: 10rpx"
          :src="item.uri"
          mode="aspectFit"
        ></image>
      </view>
      <view @click="chooseVideo" class="videoItem">
        <u-icon name="plus"></u-icon>
      </view>
    </view>

    <!-- 文件上传 -->
    <view class="file-list" style="display: flex">
      <view class="left-info">文件</view>
      <view class="right-info">
        <view class="info-button">
          <u-button
            type="primary"
            style="width: 100%; height: 100%"
            @click="chooseFile"
            text="选择上传"
          ></u-button>
        </view>
        <view
          class="info-list"
          v-for="(fileItem, fileIdx) in fileList"
          :key="fileIdx"
        >
          <u-icon name="attach"></u-icon>
          <view class="info-list-name"> {{ fileItem.name }} </view>
          <view class="info-list-close" @click.stop="deleteFile">
            <u-icon name="close"></u-icon>
          </view>
          <view class="progress">
            <u-line-progress
              :percentage="percentage"
              :activeColor="lineColor"
              :showText="false"
              height="2"
            ></u-line-progress>
          </view>
        </view>
      </view>
    </view>

    <!-- 按钮 -->
    <view style="margin-top: 37.27rpx" @click="ImageUpload">
      <u-button type="primary">上传图片</u-button>
    </view>
  </view>
</template>

<script>
import NET from "../../utils/request.js";
import API from "../../config/api.js";

export default {
  props: {
    object_code: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      // 图片/视频/文件列表
      imageList: [],
      videoList: [],
      fileList: [],
      // 进度条
      percentage: 0,
      lineColor: "#3C9CFF",
    };
  },
  methods: {
    //? 选择文件
    chooseFile() {
      console.log(this.object_code);
      const plugin = uni.requireNativePlugin("GuoWei-SelectFileModule");
      console.log(plugin);
      plugin.chooseFile(
        {
          count: 10,
          // extension: ["docx", "xlsx", "pptx", "jpg"],  //显示文件格式
          rootDirName: "根目录",
          themeColor: "#00ff00",
          folderIconColor: "#ff0000",
          fileIconColor: "#0000ff",
        },
        (result) => {
          result.files.forEach((file) => {
            let obj = {};
            obj.name = file.name;
            obj.uri = file.url;
            this.fileList.push(obj);
          });
          this.fileUpload();
        }
      );
    },
    // 上传方法
    fileUpload() {
      // 定义传递参数
      let params = {
        files: this.fileList,
        name: "files",
        formData: {
          files: this.fileList,
          type: 0,
          object_field: "appendix",
          object_code: this.object_code,
          object_key: "2022042109582216553300001",
        },
      };

      let uploadTask = this.fileUploadTask(params);
      uploadTask.onProgressUpdate((res) => {
        this.percentage = res.progress;

        if (res.progress == 100) {
          this.lineColor = "#19BE6B";
          uni.showToast({
            title: "上传文件成功!",
            icon: "success",
            duration: 2000,
          });
        }
      });
    },
    // 上传后的回调
    fileUploadTask(params) {
      // 定义请求
      let tokenInfo = uni.getStorageSync("tokenInfo");
      let header = {};
      header["Content-Type"] = "multipart/form-data";
      header["Authorization"] = "Bearer" + tokenInfo.access_token;

      let uploadTask = uni.uploadFile({
        url: API.upload,
        files: params.files, //数组
        name: params.name,
        header: header,
        formData: params.formData,
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        },
      });

      return uploadTask;
    },
    // 删除选择文件
    deleteFile() {
      console.log(1);
    },
    // 打开选择文件
    openFile() {
      console.log("打开");
    },

    //? 选择照片
    chooseImg() {
      uni.chooseImage({
        count: 6, //最多可以选择的图片张数,默认9
        // sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        // sourceType: ["album"], //从相册选择
        success: (res) => {
          console.log(res);
          res.tempFilePaths.forEach((item) => {
            let obj = {};
            obj.name = item;
            obj.uri = item;
            this.imageList.push(obj);
          });
        },
      });
    },
    // 照片上传
    ImageUpload() {
      console.log(this.imageList);

      let params = {
        files: this.imageList,
        name: "files",
        formData: {
          files: this.imageList,
          type: 0,
          object_field: "appendix",
          object_code: this.object_code,
          object_key: "2022042109582216553300001",
        },
      };
      NET.uploadFile(params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //移除上传图片
    close(index) {
      this.imageList.splice(index, 1);
    },
    //预览图片
    previewImage(index) {
      let previewImage = [];
      this.imageList.forEach((item) => {
        previewImage.push(item.uri);
      });
      uni.previewImage({
        urls: previewImage,
        current: index,
        longPressActions: {
          itemList: ["取消"],
          success: function (data) {
            console.log(
              "选中了第" +
                (data.tapIndex + 1) +
                "个按钮,第" +
                (data.index + 1) +
                "张图片"
            );
          },
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },

    //? 选择视频
    chooseVideo() {
      uni.chooseVideo({
        sourceType: ["camera", "album"],
        success: (res) => {
          // this.src = res.tempFilePath;
          console.log(res);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 多媒体
.mult-slot {
  width: 100%;
  overflow: hidden;
  .image-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 0 20rpx 37.27rpx;
    .imageItem {
      width: 93.19rpx;
      min-width: 93.19rpx;
      height: 83.87rpx;
      padding: 5rpx;
      margin-right: 18.63rpx;
      margin-bottom: 13.97rpx;
      border: 0.93rpx dashed #d6d6d6;
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #bebebe;
      // overflow: hidden;
      position: relative;
      .close {
        position: absolute;
        top: 2.79rpx;
        right: 2.79rpx;
        z-index: 99;
      }
    }
  }
  .file-list {
    .left-info {
      font-size: 13.04rpx;
      margin-right: 13px;
    }
    .right-info {
      position: relative;
      .info-button {
        width: 110px;
        height: 30px;
        margin-bottom: 5px;
      }
      .info-list {
        display: flex;
        align-items: center;
        position: relative;
        width: 250px;
        height: 30px;
        border: 1px solid #ebeef5;
        background: rgba(250, 250, 250, 0.39);
        margin-bottom: 2px;
        font-size: 9.31rpx;
        padding: 0 5px;
        .info-list-close {
          position: absolute;
          right: 5px;
        }
        .progress {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
      }
    }
  }
  .video-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 0 20rpx 37.27rpx;
    .videoItem {
      width: 93.19rpx;
      min-width: 93.19rpx;
      height: 83.87rpx;
      padding: 5rpx;
      margin-right: 18.63rpx;
      margin-bottom: 13.97rpx;
      border: 0.93rpx dashed #d6d6d6;
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #bebebe;
      // overflow: hidden;
      position: relative;
      .close {
        position: absolute;
        top: 2.79rpx;
        right: 2.79rpx;
        z-index: 99;
      }
    }
  }
}
</style>
