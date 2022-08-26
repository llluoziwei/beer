<script>
export default {
  onLaunch: function () {
    //#ifdef APP-PLUS
    plus.screen.lockOrientation("landscape-primary"); // 强制横屏
    // plus.screen.lockOrientation('portrait-primary'); // 强制竖屏
    //#endif
    console.log("App Launch");
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";
/*每个页面公共css */

@font-face {
  font-family: douyu;
  src: url("font/douyu.ttf");
}
</style>
