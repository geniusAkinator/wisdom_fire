<template>
  <div>
    <div ref="floorImg" class="floor_img_content" v-if="img!=''" @click.stop="handleClick($event)">
      <img class="floor_img" :src="imgUrl+img" />
      <img
        ref="marker"
        :style="{left:marker.left,top:marker.top}"
        class="floor_img_marker"
        :src="icon"
        alt
      />
    </div>
    <div class="floor_img_content" v-if="img==''">
      <div class="not_found">暂无楼层图，请先到工厂管理中添加</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: process.env.VUE_APP_BASE_API,
      icon: require("@/assets/image/map-marker.png"),
      marker: {
        left: this.pos.xAxis,
        top: this.pos.yAxis
      }
    };
  },
  props: {
    img: {
      type: String,
      default: ""
    },
    pos: {
      type: Object,
      default: () => ({
        xAxis: "",
        yAxis: ""
      })
    }
  },
  watch: {
    "pos.xAxis"(n, o) {
      this.marker.left = n;
    },
    "pos.yAxis"(n, o) {
      this.marker.top = n;
    }
  },
  methods: {
    handleClick(e) {
      let _marker = this.$refs.marker;
      let _img = this.$refs.floorImg;
      let x = e.offsetX - _marker.offsetWidth / 2;
      let y = e.offsetY - _marker.offsetHeight;
      let w = _img.offsetWidth;
      let h = _img.offsetHeight;
      let _left = (x / w) * 100;
      let _top = (y / h) * 100;
      let nowPos = {};
      this.marker.left = _left.toFixed(0) + "%";
      this.marker.top = _top.toFixed(0) + "%";
      nowPos.xAxis = _left;
      nowPos.yAxis = _top;
      this.$emit("sendPos", nowPos);
    }
  }
};
</script>

<style>
.floor_img_marker {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
}
.floor_img_content {
  min-height: 100px;
  width: 700px;
  border: 1px solid #dcdfe6;
  overflow: hidden;
  cursor: crosshair;
  position: relative;
  line-height: 0;
}
.floor_img_content .floor_img {
  width: 100%;
}
.not_found {
  width: 100%;
  height: 100px;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>