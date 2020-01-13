<template>
  <div class="map-wraps">
    <baidu-map
      :style="{width:mapConf.width,height:mapConf.height}"
      class="map"
      :ak="ak"
      :zoom="mapConf.zoom"
      :center="{lng: mapConf.center.lng, lat: mapConf.center.lat}"
      @ready="handler"
      :scroll-wheel-zoom="true"
    >
      <!--比例尺控件-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!--缩放控件-->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <!--标注-->
      <bm-marker-clusterer :averageCenter="true">
        <bm-marker
          :key="index"
          v-for="(item, index) in list"
          :position="{lng: item.longitude, lat: item.latitude}"
          :dragging="false"
          :icon="{url: mapConf.icon, size: {width: 26, height: 26}}"
          @click="clickMarker(index,item,$event)"
        >
          <bm-label
            :content="item.factoryId+''"
            :labelStyle="{color: 'white',textAlign:'center',
            border:0,width:'26px',height:'26px',diplay:'block',
            fontSize : '12px',background:'rgba(0,0,0,0)',zIndex:'99'}"
            :offset="{width:item.index > 10 ? -2 : -1, height: 3}"
          />
        </bm-marker>
      </bm-marker-clusterer>

      <!--信息窗体-->
      <bm-info-window
        :key="index"
        v-for="(item, index) in list"
        :position="{lng: item.longitude, lat: item.latitude}"
        :title="item.factoryName"
        :show="item.show"
        @close="infoWindowClose(index,item,$event)"
        @open="infoWindowOpen"
      >
        <p>
          <el-image style="width: 100%; height: 100px" :src="imgUrl+item.picture" fit="contain"></el-image>
        </p>
        <p>
          <span class="left">项目ID：</span>
          <span class="right">{{item.factoryId}}</span>
        </p>
        <p>
          <span class="left">负责人：</span>
          <span class="right">{{item.leader}}</span>
        </p>
        <p>
          <span class="left">联系电话：</span>
          <span class="right">{{item.tel}}</span>
        </p>
        <p>
          <span class="left">详细地址：</span>
          <span class="right">{{item.address}}</span>
        </p>
        <p>
          <span class="left">介绍：</span>
          <span class="right" v-html="item.description"></span>
        </p>
        <p>
          <el-link @click="jump(index,item)">查看详情</el-link>
        </p>
      </bm-info-window>
    </baidu-map>
    <div class="my-control">
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state3"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      >
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        <template slot-scope="props">
          <div class="result" :key="index" v-for="(item,index) in props">
            <i>{{item.factoryId}}</i>
            <div class="info">
              <span class="name">{{item.factoryName}}</span>
              <!-- <span>{{item.factoryId}}</span>
              <span class="address">{{item.address}}</span>-->
            </div>
          </div>
        </template>
      </el-autocomplete>
    </div>
  </div>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
import BmLabel from "vue-baidu-map/components/overlays/Label";

export default {
  data() {
    return {
      ak: this.GLOBAL.BAIDU_MAP_AK,
      mapConf: {
        width: "100%",
        height: "100%",
        center: {
          lng: "116.297334",
          lat: "40.048286"
        },
        icon: require("@/assets/image/map-marker.png"),
        zoom: 6 //地图展示级别
      },
      BMap: {},
      map: {},
      clickIndex: 0,
      state3: "",
      imgUrl: process.env.VUE_APP_BASE_API
    };
  },
  props: {
    list: {
      type: Array
    }
  },
  watch: {
    clickIndex(val, oldVal) {
      setTimeout(() => {
        this.openInfoWindow(val);
      }, 60);
    }
  },
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    infoWindowClose(index, item, $event) {
      let arr = this.list;
      arr[index].show = false;
      this.$emit("update:list", arr);
    },
    infoWindowOpen(data) {},
    clickMarker(index, item, ev) {
      this.openInfoWindow(index);
    },
    openInfoWindow(index) {
      let arr = this.list;
      console.log(arr);
      for (let i = 0; i < arr.lenth; i++) {
        arr[i].show = false;
      }
      arr[index].show = true;
      let vlat = 0;
      let zoom = this.map.getZoom() * 1;
      if (zoom >= 4) {
        vlat = 20 / Math.pow(2, zoom - 4);
      }
      this.map.panTo(
        new BMap.Point(arr[index].longitude, arr[index].latitude + vlat)
      );
      this.clickIndex = index;
      this.$emit("update:list", arr);
    },
    querySearch(queryString, cb) {
      var list = this.list;
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return item => {
        return item.factoryName.indexOf(queryString) !== -1;
      };
    },
    handleSelect(item) {
      this.list.map((citem, i) => {
        if (citem.factoryId == item.factoryId) {
          this.openInfoWindow(i);
        }
      });
    },
    jump(index, item) {
      this.$router.push({
        name: "工厂管理"
      });
      setTimeout(() => {
        this.$router.push({
          name: "工厂详情",
          params: { fId: item.factoryId }
        });
      }, 600);
    }
  },
  created() {},
  mounted() {
    console.log(this.list);
  },
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmInfoWindow,
    BmLabel
  }
};
</script>
<style scoped>
.BMap_Marker.BMap_noprint {
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
.map-wraps {
  width: 100%;
  height: 100%;
  position: relative;
}
.my-control {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  display: flex;
}
.result span {
  display: block;
  width: 100%;
}
.result span.name {
  color: #3385ff !important;
  display: block;
  font-weight: bold;
}
.result span.address {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.el-autocomplete-suggestion li:nth-child(2n) {
  background: #fafafa;
}
.el-autocomplete-suggestion li {
  line-height: 28px;
  padding: 0 10px;
}
.el-autocomplete-suggestion li i {
  background: #ff0000;
  border-radius: 50%;
  color: #fff;
  width: 18px;
  height: 18px;
  line-height: 18px;
  display: block;
  text-align: center;
  margin-top: 7px;
}
.el-autocomplete-suggestion li .result {
  display: flex;
  overflow: hidden;
}
.el-autocomplete-suggestion li .info {
  flex: 1;
  width: 110px;
  padding-left: 7px;
}
.factory_img {
  max-height: 100px;
}
</style>