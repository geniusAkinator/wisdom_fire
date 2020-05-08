<!-- 经纬度拾取器 -->
<template>
  <div class="map-viewer">
    <baidu-map
      :center="{lng: data.lng, lat: data.lat}"
      :zoom="mapConf.zoom"
      :ak="ak"
      :dragging="false"
      :scroll-wheel-zoom="false"
      @ready="handler"
    >
      <bm-view class="map"></bm-view>
      <bm-marker :position="{lng: data.lng, lat: data.lat}" :dragging="false"></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView";
import BmMarker from "vue-baidu-map/components/overlays/Marker";

export default {
  data() {
    return {
      ak: this.GLOBAL.BAIDU_MAP_AK, //百度地图ak
      keyword: "",
      mapConf: {
        //地图配置信息
        center: {
          //默认中心点经纬度
          lng: "116.297334",
          lat: "40.048286"
        },
        zoom: 16
      }
    };
  },
  props: {
    data: {
      type: Object,
      deep: true
    }
  },
  watch:{
    data(nVal,oVal){
      console.log(nVal)
    }
  },
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    }
  },
  mounted() {},
  components: {
    BaiduMap,
    BmView,
    BmMarker
  }
};
</script>

<style>
.map-viewer {
  width: 100%;
  height: 100%;
  position: relative;
}
.map-viewer .map {
  height: 200px;
  cursor: crosshair;
  border-radius: 4px;
}
</style>