<template>
  <view class="body">
		{{file_address}}
		<a :href="file_address"></a>
	</view>
</template>

<script>
import NET from "../../utils/request.js";
import API from "../../config/api.js";
export default {
  data() {
    return {
      // 工位ID
      work_position_id: "",
      // 生产线id
      make_line_id: "",
      // 文件地址
      file_address: "",
    };
  },
  created() {
    let putStationArr = uni.getStorageSync("putStationArr");
    this.work_position_id = putStationArr[1].work_position_id;
    this.make_line_id = putStationArr[0].make_line_id;
  },
  mounted() {
    this.getSopData();
  },
  methods: {
    getSopData() {
      NET.request(
        API.getEsopURL,
        {
          work_position_id: this.work_position_id,
          make_line_id: this.make_line_id,
        },
        "POST"
      )
        .then((res) => {
          if (res.data.code == 200) {
            this.file_address = res.data.data.url;
						console.log(this.file_address);
						this.showFile();
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
        });
    },
    showFile() {
      uni.downloadFile({
        url: this.file_address,
        success: function (res) {
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              console.log("打开文档成功");
            },
          });
        },
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
</style>
