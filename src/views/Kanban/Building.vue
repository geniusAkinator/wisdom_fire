<template>
  <div class="my-building">
    <div class="my-building-count">传感器数量：125</div>
    <div class="symbol-content">
      <div class="symbol-item success">
        <div class="symbol"></div>
        <span>正常</span>
      </div>
      <div class="symbol-item err">
        <div class="symbol"></div>
        <span>异常</span>
      </div>
    </div>
    <div class="building_group" v-if="current==0" @click="current = 1"></div>
    <template v-if="current==1">
      <div class="building" v-for="(item,index) in data" :key="index">
        <div class="building__container">
          <div class="buildingItem buildingItem--front">
            <div class="building__name">{{item.name}}</div>
            <!-- <div class="buildingItem__row" v-for="i of 4" :key="i">
              <div class="buildingItem-floor" v-for="(cItem,idx) in item.children" :key="idx">
                {{cItem.level}}
              </div>
            </div>-->
            <div
              class="buildingItem__line"
              v-for="(cItem,idx) in item.children"
              :key="idx"
              @click="lineClick(cItem)"
            >
              <!-- <div class="buildingItem-floor">
              </div>-->
              {{cItem.level}}F
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
    </template>
    <div class="building-breadcrumb">
      <div class="fl" @click="current = 0">昆山亚辉有限公司</div>
      <div class="fl padding-left" v-if="current>=1">楼宇A</div>
      <div class="fl padding-left" v-if="current>=2">楼层</div>
    </div>
  </div>
</template>

<script>
import { getFloorDetail } from "@/api/platform/board";

export default {
  data() {
    return {
      current: 0
    };
  },
  props: {
    data: {
      type: Array,
      deep: true
    }
  },
  methods: {
    lineClick(item) {
      getFloorDetail({ floorId: item.floorId }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          console.log(_data);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
  top: 12px;
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
  background: #6c79f8;
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
// .buildingItem__row .buildingItem-floor{
//   -webkit-animation: switchoff 1s forwards;
//   animation: switchoff 1s forwards;
//   -webkit-animation-delay: 0.6s;
//   animation-delay: 0.6s;
// }
// .buildingItem__row .buildingItem-floor.dynamic {
//   -webkit-animation: shadowed 1s infinite alternate !important;
//   animation: shadowed 1s infinite alternate !important;
//   -webkit-animation-delay: 4s !important;
//   animation-delay: 4s !important;
// }
.buildingItem__row--moder {
  padding: 0;
  height: 100%;
  background: #4c5aea;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 2vh;
}
// .buildingItem-floor {
//   width: 100%;
//   height: 5%;
//   background: #fff;
// }
.buildingItem--front {
  -webkit-transform: translateZ(120px) rotateZ(0);
  transform: translateZ(120px) rotateZ(0);
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.buildingItem--right {
  right: 0;
  -webkit-transform-origin: right;
  transform-origin: right;
  background: #a2b6ff;
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
    opacity: 0.5;
  }
}

@keyframes switchoff {
  100% {
    opacity: 0.5;
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
  font-size: 24px;
}
.buildingItem__line {
  height: 20px;
  width: 100%;
  background: #4e5eea;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: right;
  line-height: 22px;
  padding-right: 10px;
}
.building__name {
  position: absolute;
  top: 20px;
  left: 50%;
  color: #f0f0f0;
  transform: translateX(-50%);
  font-weight: bold;
  width: 200px;
  text-align: center;
}
.symbol-content {
  position: absolute;
  left: 0;
  top: 60px;
  display: flex;
  flex-direction: column;
}
.symbol-content .symbol-item {
  margin-top: 20px;
}
.symbol-content .symbol {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  position: relative;
  float: left;
  margin-right: 30px;
}
.symbol-content .symbol::before {
  content: "";
  display: block;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  left: -7.5px;
  top: -7.5px;
  border: 3px solid #fff;
}
.symbol-content .symbol::after {
  content: "";
  display: block;
  position: absolute;
  left: 6px;
  top: -5px;
  width: 3px;
  height: 10px;
  background: #fff;
}
.symbol-content .symbol-item.success .symbol::before {
  border: 3px solid #40c985;
}
.symbol-content .symbol-item.err .symbol::before {
  border: 3px solid #ac171b;
}
.symbol-content .symbol-item.success .symbol::after,
.symbol-content .symbol-item.success .symbol {
  background: #40c985;
}
.symbol-content .symbol-item.err .symbol::after,
.symbol-content .symbol-item.err .symbol {
  background: #ac171b;
}
.symbol-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.symbol-item span {
  font-weight: 500;
  font-size: 20px;
}
</style>