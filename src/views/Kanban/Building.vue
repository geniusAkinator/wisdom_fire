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
    <v-stage :config="config.konva" ref="stage" v-if="current>=2">
      <v-layer ref="layer">
        <template v-for="(item, index) in cube">
          <v-rect
            :config="{
          x:item.x,
          y:item.y,
          width:item.width,
          height:item.height,
          fill:config.rect.fill,
          stroke: config.rect.stroke,
          strokeWidth:config.rect.strokeWidth,
          shadowBlur:config.rect.shadowBlur,
          opacity:config.rect.opacity,
          shadowOffsetX:config.rect.shadowOffsetX,
          shadowOffsetY:config.rect.shadowOffsetY
          }"
            ref="stage"
            @mouseover="handleMouseOver"
            @mouseout="handleMouseOut"
            :key="index"
          ></v-rect>
          <template v-for="(tItem,tIndex) in item.point">
            <template v-if="item.width > item.height">
              <v-circle
                name="circle"
                :config="{
              x:item.x+item.width/(2*item.point.length)+item.width*tIndex/item.point.length,
              y:item.y+item.height/2,radius:config.circle.radius,
              fill:config.circle.fill
              }"
                :key="'circle-'+index*10+tIndex"
              ></v-circle>
              <v-text
                :config="{
              x:item.x+item.width/(2*item.point.length)+item.width*tIndex/item.point.length + 10,
              y:item.y+item.height/2 - 4,
              text: tItem,
              fill:config.circle.fill,
              fontSize: 12
              }"
                :key="'text-'+index*10+tIndex"
              ></v-text>
            </template>
            <template v-else>
              <v-circle
                name="circle"
                :config="{x:item.x+item.width/2,
                y:item.y+item.height/(2*item.point.length)+item.height*tIndex/item.point.length,
                radius:config.circle.radius,fill:config.circle.fill
                }"
                :key="'circle2-'+index*10+tIndex"
              ></v-circle>
              <v-text
                :config="{
              x:item.x+item.width/2 - 10,
              y:item.y+item.height/(2*item.point.length)+item.height*tIndex/item.point.length + 10,
              text: tItem,
              fill:config.circle.fill,
              fontSize: 12
              }"
                :key="'text2-'+index*10+tIndex"
              ></v-text>
            </template>
          </template>
        </template>
      </v-layer>
    </v-stage>
    <div class="building_group" v-if="current==0" @click="current = 1"></div>
    <template v-if="current==1">
      <el-carousel :interval="4000" type="card" class="building-carousel">
        <el-carousel-item v-for="(item,index) in data" :key="index">
          <div class="building">
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
        </el-carousel-item>
      </el-carousel>
    </template>
    <div class="building-breadcrumb">
      <div class="fl" @click="current = 0">{{factoryName}}</div>
      <div class="fl padding-left" v-if="current>=1" @click="current = 1">{{buildingName}}</div>
      <div class="fl padding-left" v-if="current>=2">{{floorName}}</div>
    </div>
  </div>
</template>

<script>
import { getFloorDetail } from "@/api/platform/board";

export default {
  data() {
    return {
      buildingName: "楼宇",
      floorName: "楼层",
      current: 0,
      config: {
        konva: {
          width: 800,
          height: 600,
          draggable: true
        },
        rect: {
          fill: "#397E97",
          stroke: "#7BCEDF",
          strokeWidth: 1,
          shadowBlur: 20,
          opacity: 0.5,
          shadowOffsetX: 5,
          shadowOffsetY: 5
        },
        circle: {
          radius: 8,
          fill: "#40c985"
        }
      },
      cube: [
        //阿米办公室布局
        {
          //产品研发部
          x: 20,
          y: 0,
          width: 150,
          height: 150,
          point: ["研发部烟感1", "研发部烟感2"]
        },
        {
          //市场部
          x: 170,
          y: 0,
          width: 150,
          height: 150,
          point: ["市场部烟感1", "市场部烟感2"]
        },
        {
          //前台
          x: 320,
          y: 0,
          width: 150,
          height: 40,
          point: []
        },
        {
          //展厅
          x: 470,
          y: 0,
          width: 150,
          height: 150,
          point: ["展厅烟感1", "展厅烟感2"]
        },
        {
          //仓库
          x: 620,
          y: 0,
          width: 150,
          height: 150,
          point: ["东侧仓库烟感1", "东侧仓库烟感2"]
        },
        {
          //梯道西侧
          x: 220,
          y: 200,
          width: 150,
          height: 200,
          point: []
        },
        {
          //配电
          x: 220,
          y: 350,
          width: 150,
          height: 50,
          point: ["电压", "电流"]
        },
        {
          //梯道东侧
          x: 420,
          y: 200,
          width: 150,
          height: 200,
          point: []
        },
        {
          //党员会议中心
          x: 20,
          y: 300,
          width: 150,
          height: 100,
          point: ["烟感1"]
        },
        {
          //财务室
          x: 620,
          y: 220,
          width: 150,
          height: 180,
          point: ["烟感1", "烟感2"]
        },
        {
          //仓库C
          x: 20,
          y: 450,
          width: 150,
          height: 150,
          point: ["烟感1", "烟感2"]
        },
        {
          //综合办公室
          x: 170,
          y: 450,
          width: 75,
          height: 150,
          point: ["烟感1", "烟感2"]
        },
        {
          //院士办公室
          x: 245,
          y: 450,
          width: 375,
          height: 150,
          point: ["烟感1", "烟感2", "烟感3", "烟感4"]
        },
        {
          //办公室
          x: 620,
          y: 400,
          width: 150,
          height: 200,
          point: ["烟感1", "烟感2"]
        }
      ]
    };
  },
  props: {
    data: {
      type: Array,
      deep: true
    },
    factoryName: {
      type: String
    }
  },
  watch: {
    data(nVal) {
      if (nVal.length) {
        console.log(nVal[0]);
        this.buildingName = nVal[0].name;
      }
    },
    current(nVal) {
      if (nVal == 2) {
        this.$nextTick(() => {
          this.pointScaleAmimation();
          this.handleWheelScroll();
        });
      }
    }
  },
  methods: {
    lineClick(item) {
      this.floorName = item.floorName;
      this.current = 2;
      getFloorDetail({ floorId: item.floorId }).then(response => {
        if (response.code == 200) {
          let _data = response.data;
          console.log("getFloorDetail", _data);
        }
      });
    },
    handleMouseOver(e) {
      const current = e.currentTarget;
      current.to({
        fill: "#389BB7",
        opacity: 0.7
      });
    },
    handleMouseOut(e) {
      const current = e.currentTarget;
      current.to({
        fill: "#397E97",
        opacity: 0.5
      });
    },
    handleWheelScroll() {
      //滚轮缩放事件
      const stage = this.$refs.stage.getNode();
      var scaleBy = 1.03;
      stage.on("wheel", e => {
        e.evt.preventDefault();
        var oldScale = stage.scaleX();
        var pointer = stage.getPointerPosition();
        var mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale
        };
        var newScale =
          e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });
        var newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale
        };
        stage.position(newPos);
        stage.batchDraw();
      });
    },
    pointScaleAmimation() {
      //圆点缩放动画
      const layer = this.$refs.layer.getNode();
      layer.find(".circle").to({
        //小球缩放动画
        radius: 5, //旋转360度
        duration: 2, //动画持续时间
        easing: Konva.Easings.EaseInOut,
        yoyo: true //循环
      });
    }
  },
  mounted() {}
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
  z-index: 9999;
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
  z-index: 999;
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
.building-carousel {
  width: 100%;
  height: 100%;
}
</style>