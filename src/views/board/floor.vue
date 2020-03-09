<template>
  <div class="floor-content">
    <div class="info-box">
      <div class="info-item">
        <span class="info_name">建筑面积</span>
        <div class="gradient_line"></div>
        <span class="info_value">
          <count-to :start-val="0" :end-val="400" :duration="2600" class="card-panel-num" />平米
        </span>
        <div class="border_line"></div>
      </div>
      <div class="info-item">
        <span class="info_name">建造高度</span>
        <div class="gradient_line"></div>
        <span class="info_value">
          <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />米
        </span>
        <div class="border_line"></div>
      </div>
      <div class="info-item">
        <span class="info_name">地上层数</span>
        <div class="gradient_line"></div>
        <span class="info_value">
          <count-to :start-val="0" :end-val="3" :duration="2600" class="card-panel-num" />层
        </span>
        <div class="border_line"></div>
      </div>
      <div class="info-item">
        <span class="info_name">地下层数</span>
        <div class="gradient_line"></div>
        <span class="info_value">
          <count-to :start-val="0" :end-val="2" :duration="2600" class="card-panel-num" />层
        </span>
        <div class="border_line"></div>
      </div>
    </div>
    <div class="floor-box">
      <div class="floor-picker">
        <!-- <i class="el-icon-arrow-up" id="floor-button-next" @click="handleNext"></i>
        <i class="el-icon-arrow-down" id="floor-button-prev" @click="handlePrev"></i>-->
        <div
          class="floor-picker-inner"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <div class="floor-picker-rule"></div>
          <ul
            class="floor-list"
            :style="`transform: perspective(1000px) rotateY(0deg) rotateX(${index*20}deg);`"
          >
            <li
              v-for="(item,idx) in floorList"
              :key="idx"
              :class="idx==index?'floor-item center':'floor-item'"
              :style="`transform-origin: center center -90px; transform: translateZ(90px) rotateX(-${idx*20}deg);`"
              @click="handleClick(item,idx)"
            >{{item.floorName}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
export default {
  data() {
    return {
      index: 0,
      floorList: [
        {
          floorName: "1F"
        },
        {
          floorName: "2F"
        },
        {
          floorName: "3F"
        },
        {
          floorName: "4F"
        },
        {
          floorName: "5F"
        },
        {
          floorName: "6F"
        },
        {
          floorName: "7F"
        },
        {
          floorName: "8F"
        }
      ],
      isEnter: false,
      src:
        "http://192.168.10.65:8888/images/0a2967e6-53ef-4630-9a47-0bd055ad25fe.jpg"
    };
  },
  props: {
    height: ""
  },
  computed: {
    len: function() {
      return this.floorList.length;
    }
  },
  watch: {
    isEnter(nVal, oVal) {}
  },
  methods: {
    handleMouseEnter() {
      this.isEnter = true;
    },
    handleMouseLeave() {
      this.isEnter = false;
    },
    handlePrev() {
      if (this.index) this.index = this.index - 1;
    },
    handleNext() {
      if (this.index < this.len - 1) this.index = this.index + 1;
    },
    handleClick(item, idx) {
      this.index = idx;
    },
    handleScroll(e) {
      let _this = this;
      e = e || window.event;
      if (e.wheelDelta) {
        //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {
          _this.handlePrev();
        }
        if (e.wheelDelta < 0) {
          _this.handleNext();
        }
      } else if (e.detail) {
        //Firefox滑轮事件
        if (e.detail > 0) {
          _this.handlePrev();
        }
        if (e.detail < 0) {
          _this.handleNext();
        }
      }
    }
  },
  mounted() {
    let picker = document.querySelector(".floor-picker-inner");
    if (picker.addEventListener) {
      picker.addEventListener("DOMMouseScroll", this.handleScroll, false);
    }
    //滚动滑轮触发scrollFunc方法
    picker.onmousewheel = this.handleScroll;
  },
  components: {
    CountTo
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
.floor-picker-inner {
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
  height: 200px;
  position: relative;
  -webkit-mask-box-image: -webkit-linear-gradient(
    bottom,
    transparent,
    transparent 5%,
    #fff 20%,
    #fff 80%,
    transparent 95%,
    transparent
  );
  -webkit-mask-box-image: linear-gradient(
    top,
    transparent,
    transparent 5%,
    #fff 20%,
    #fff 80%,
    transparent 95%,
    transparent
  );
}
.floor-picker {
  position: absolute;
  background: #032f6c;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  top: 50%;
  margin-top: -60px;
  left: 20px;
  width: 100px;
  border-radius: 4px;
}
.floor-picker-rule {
  box-sizing: border-box;
  padding: 0;
  margin: -18px 0 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 2;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  background: rgba(39, 87, 152, 0.5);
}
.floor-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 150px;
  box-sizing: border-box;
  padding: 0;
  margin: -18px 0 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 50%;
  left: 0;
  transform-style: preserve-3d;
  transition: all 100ms ease-out 0s;
}

.floor-item {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  vertical-align: middle;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  -webkit-text-overflow: ellipsis;
  text-overflow: ellipsis;
  cursor: default;
}
.floor-item.center {
  color: #fff;
  font-size: 16px;
}
.floor-box {
  height: calc(100% - 89px);
}
</style>