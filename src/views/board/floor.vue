<template>
  <div class="floor-content">
    <div class="info-box">
      <div class="info-item">
        <span class="info_name">建筑面积</span>
        <div class="gradient_line"></div>
        <span class="info_value">400平米</span>
        <div class="border_line"></div>
      </div>
      <div class="info-item">
        <span class="info_name">建造高度</span>
        <div class="gradient_line"></div>
        <span class="info_value">100米</span>
        <div class="border_line"></div>
      </div>
      <div class="info-item">
        <span class="info_name">地上层数</span>
        <div class="gradient_line"></div>
        <span class="info_value">20层</span>
        <div class="border_line"></div>
      </div>
      <div class="info-item">
        <span class="info_name">地下层数</span>
        <div class="gradient_line"></div>
        <span class="info_value">0层</span>
        <div class="border_line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.floor-content {
  width: 100%;
  height: 100%;
}
.info-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.info-item {
  position: relative;
  width: 22%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background: rgba(6, 58, 118, 0.5);
  z-index: 33;
}
.info-item .border_line {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #009efc;
}
.info_name {
  color: #abdcea;
  font-size: 22px;
}
.info_value {
  color: #27f8fc;
  font-weight: bold;
  font-size: 24px;
}
.info-item::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 5px;
  background: #071748;
  width: 40px;
  height: 8px;
  border-top: 1px solid #009efc;
  border-bottom: 1px solid #009efc;
  transform: rotate(-45deg);
  z-index: 99;
}
.info-item::after {
  content: "";
  position: absolute;
  right: -10px;
  bottom: 5px;
  background: #071748;
  width: 40px;
  height: 8px;
  border-top: 1px solid #009efc;
  border-bottom: 1px solid #009efc;
  transform: rotate(-45deg);
  z-index: 99;
}
.info-item > .gradient_line {
  position: initial;
  width: 120px;
  height: 2px;
  margin: 10px 0 5px 0;
  background: -webkit-linear-gradient(left, #083264, #00bdfe, #00bdfe, #083264);
  background: -o-linear-gradient(left, #083264, #00bdfe, #00bdfe, #083264);
  background: -moz-linear-gradient(left, #083264, #00bdfe, #00bdfe, #083264);
  background: -ms-linear-gradient(left, #083264, #00bdfe, #00bdfe, #083264);
}
</style>