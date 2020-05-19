<template>
  <div class="my-building">
    <div class="my-building-count">传感器数量：125</div>
    <div class="building_group" v-if="current==0" @click="current = 1"></div>
    <div class="building" v-if="current==1">
      <div class="building__container">
        <div class="buildingItem buildingItem--front">
          <div class="buildingItem__row" v-for="i of 4" :key="i">
            <div class="buildingItem-floor dynamic" v-for="idx of 10" :key="idx"></div>
          </div>
        </div>
        <div class="buildingItem buildingItem--right">
          <div class="buildingItem__row buildingItem__row--moder"></div>
          <div class="buildingItem__row buildingItem__row--moder"></div>
        </div>
        <div class="buildingItem buildingItem--left">
          <div class="buildingItem__row buildingItem__row--moder"></div>
          <div class="buildingItem__row buildingItem__row--moder"></div>
        </div>
        <div class="buildingItem buildingItem--back"></div>
      </div>
    </div>
    <div class="building-breadcrumb">
      <div class="fl" @click="current = 0">昆山亚辉有限公司</div>
      <div class="fl padding-left" v-if="current>=1">楼宇A</div>
      <div class="fl padding-left" v-if="current>=2">楼层</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {}
};
</script>

<style scoped>
.my-building {
  width: 100%;
  height: 100%;
  position: relative;
}
.building_group {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: auto;
  background: url("../../assets/image/building.png") no-repeat center;
  background-size: contain;
  cursor: pointer;
}
.building-breadcrumb {
  position: absolute;
  left: 50px;
  bottom: 50px;
  z-index: 99;
  border-top: 1px solid rgba(147, 235, 248, 1);
  border-bottom: 1px solid rgba(147, 235, 248, 1);
  padding: 10px;
}
.building-breadcrumb > div {
  cursor: pointer;
  position: relative;
}
.building-breadcrumb > div:not(:first-child):before {
  position: absolute;
  content: "";
  left: 7px;
  top: 13px;
  width: 12px;
  height: 1px;
  background: #fff;
  transform: rotate(45deg);
}
.building-breadcrumb > div:not(:first-child)::after {
  position: absolute;
  content: "";
  left: 7px;
  bottom: 13px;
  width: 12px;
  height: 1px;
  background: #fff;
  transform: rotate(-45deg);
}
.building {
  -webkit-perspective: 800px;
  perspective: 800px;
  position: relative;
  width: 200px;
  height: 400px;
  top: 50px;
  margin: auto;
}
.building__container {
  width: 100%;
  height: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateY(-20deg);
  transform: rotateY(-20deg);
}
.buildingItem {
  width: 100%;
  height: 100%;
  background: #3174a6;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  padding: 0 3.5%;
  position: absolute;
  top: 0;
}
.buildingItem__row {
  width: 15%;
  height: 90%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 15% 0;
  padding-top: 5%;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(1) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(2) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(3) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(4) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(5) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(6) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1.8s;
  animation-delay: 1.8s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(7) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 2.8s;
  animation-delay: 2.8s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(8) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(9) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.buildingItem__row:nth-child(1) .buildingItem-floor:nth-child(10) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(1) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(2) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(3) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(4) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(5) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1.5s;
  animation-delay: 1.5s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(6) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(7) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 3.5s;
  animation-delay: 3.5s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(8) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 3.2s;
  animation-delay: 3.2s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(9) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1.8s;
  animation-delay: 1.8s;
}
.buildingItem__row:nth-child(2) .buildingItem-floor:nth-child(10) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(1) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(2) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(3) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(4) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(5) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(6) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 2.4s;
  animation-delay: 2.4s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(7) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 3.5s;
  animation-delay: 3.5s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(8) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(9) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 4.5s;
  animation-delay: 4.5s;
}
.buildingItem__row:nth-child(3) .buildingItem-floor:nth-child(10) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 5s;
  animation-delay: 5s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(1) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(2) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(3) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(4) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(5) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(6) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 1.8s;
  animation-delay: 1.8s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(7) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 2.1s;
  animation-delay: 2.1s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(8) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(9) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 2.7s;
  animation-delay: 2.7s;
}
.buildingItem__row:nth-child(4) .buildingItem-floor:nth-child(10) {
  -webkit-animation: switchoff 1s forwards;
  animation: switchoff 1s forwards;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}
.buildingItem__row .buildingItem-floor.dynamic {
  -webkit-animation: shadowed 1s infinite alternate !important;
  animation: shadowed 1s infinite alternate !important;
  -webkit-animation-delay: 4s !important;
  animation-delay: 4s !important;
}
.buildingItem__row--moder {
  padding: 0;
  height: 100%;
  background: #29658a;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 2vh;
}
.buildingItem-floor {
  width: 100%;
  height: 5%;
  background: #fff;
}
.buildingItem--front {
  -webkit-transform: translateZ(120px) rotateZ(0);
  transform: translateZ(120px) rotateZ(0);
  left: 0;
}
.buildingItem--right {
  right: 0;
  -webkit-transform-origin: right;
  transform-origin: right;
  background: #52adbe;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-animation: hackCssRender 0.001s forwards alternate;
  animation: hackCssRender 0.001s forwards alternate;
}
.buildingItem--left {
  right: 200px;
  -webkit-transform-origin: right;
  transform-origin: right;
  background: #52adbe;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transform: rotateY(90deg) translateX(80px);
  transform: rotateY(90deg) translateX(80px);
}
.buildingItem--back {
  -webkit-transform: translateZ(-80px);
  transform: translateZ(-80px);
}

@-webkit-keyframes switchoff {
  100% {
    opacity: 0;
  }
}

@keyframes switchoff {
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes shadowed {
  100% {
    -webkit-box-shadow: 0 0 1vw #fff;
    box-shadow: 0 0 1vw #fff;
  }
}
@keyframes shadowed {
  100% {
    -webkit-box-shadow: 0 0 1vw #fff;
    box-shadow: 0 0 1vw #fff;
  }
}
@-webkit-keyframes hackCssRender {
  0% {
    -webkit-transform: rotateY(60deg) translateX(80px);
    transform: rotateY(60deg) translateX(80px);
  }
  100% {
    -webkit-transform: rotateY(90deg) translateX(80px);
    transform: rotateY(90deg) translateX(80px);
  }
}
@keyframes hackCssRender {
  0% {
    -webkit-transform: rotateY(60deg) translateX(80px);
    transform: rotateY(60deg) translateX(80px);
  }
  100% {
    -webkit-transform: rotateY(90deg) translateX(80px);
    transform: rotateY(90deg) translateX(80px);
  }
}
.my-building-count {
  position: absolute;
  top: 20px;
  height: 20px;
}
</style>