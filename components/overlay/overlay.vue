<template>
  <view class="overlay">
    <view class="overlay-loading">
      <u-loading-icon mode="circle" color="#387bfc" size="28"></u-loading-icon>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
