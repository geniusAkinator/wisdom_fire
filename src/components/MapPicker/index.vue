<!-- 经纬度拾取器 -->
<template>
  <div class="map-picker">
    <baidu-map
      :center="{lng: mapConf.center.lng, lat: mapConf.center.lat}"
      :zoom="mapConf.zoom"
      :ak="ak"
      :scroll-wheel-zoom="true"
      @click="handleClick"
      @ready="handler"
      @zoomend="handleZoom"
    >
      <bm-view class="map"></bm-view>
      <bm-marker :position="{lng: marker.lng, lat: marker.lat}" :dragging="false"></bm-marker>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
    <div class="autocomplete">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入地区名称"
        @select="handleSelect"
        size="small"
        :debounce="300"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.province+item.city+item.district+item.name }}</div>
        </template>
      </el-autocomplete>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmControl from "vue-baidu-map/components/controls/Control";
import BmView from "vue-baidu-map/components/map/MapView";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import { getCoo } from "@/api/common/map";

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
        zoom: 11
      },
      marker: {
        //标记的经纬度
        lng: "116.297334",
        lat: "40.048286"
      },
      data: [],
      state: ""
    };
  },
  watch: {
    state: function(newVal, oldVal) {
      getCoo({
        query: newVal, //关键词检索
        region: this.region, //默认地区
        city_limit: true,
        output: "json",
        ak: this.ak //百度poi鉴权ak
      }).then(res => {
        if (res.status == 0) {
          this.data = res.result;
        }
      });
    }
  },
  props: {
    region: {
      type: String,
      default: "江苏"
    }
  },
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    handleClick(e) {
      this.marker.lng = e.point.lng;
      this.marker.lat = e.point.lat;
      this.$emit("sendPoint", JSON.parse(JSON.stringify(e.point)));
    },
    querySearchAsync(queryString, cb) {
      var data = this.data;
      var results = data;
      clearTimeout(this.timeout);
      cb(results);
    },
    handleSelect(item) {
      this.map.panTo(new BMap.Point(item.location.lng, item.location.lat));
      this.marker.lng = item.location.lng;
      this.marker.lat = item.location.lat;
      this.$emit("sendPoint", JSON.parse(JSON.stringify(item.location)));
    },
    handleZoom() {}
  },
  mounted() {},
  components: {
    BaiduMap,
    BmView,
    BmMarker,
    BmNavigation
  }
};
</script>

<style>
.map-picker {
  width: 100%;
  height: 100%;
  position: relative;
}
.map-picker .map {
  height: 300px;
  cursor: crosshair;
}
.tangram-suggestion-main {
  z-index: 9999999999 !important;
}
.map-search {
  height: 28px;
  width: 308px;
}
.tangram-suggestion-main table {
  width: 100%;
}
.tangram-suggestion {
  overflow: hidden;
  width: 100% !important;
}
.tangram-suggestion-main tr td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.map-picker .BMap_mask {
  cursor: crosshair;
}
.autocomplete {
  position: absolute;
  top: 10px;
  left: 10px;
}
.autocomplete input {
  width: 400px;
  border-radius: 0;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
}
.autocomplete {
  line-height: 30px;
}
</style>