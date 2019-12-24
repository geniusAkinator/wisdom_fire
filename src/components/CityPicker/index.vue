<!-- 省/市/区三级联动 -->
<template>
  <div class="city-picker">
    <el-row>
      <el-col :span="7">
        <el-select
          v-model="pvalue"
          placeholder="请选择省"
          @change="selectProvince"
          @focus="handleClick"
        >
          <el-option
            v-for="item in poptions"
            :key="'p-'+item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-select v-model="cvalue" placeholder="请选择市" @change="selectCity" @focus="handleClick">
          <el-option
            v-for="item in coptions"
            :key="'c-'+item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-select
          v-model="dvalue"
          placeholder="请选择区/县"
          @change="selectDistrict"
          @focus="handleClick"
        >
          <el-option
            v-for="item in doptions"
            :key="'d-'+item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getPCD } from "@/api/common/pcd";
export default {
  data() {
    return {
      pvalue: "",
      cvalue: "",
      dvalue: "",
      poptions: [],
      coptions: [],
      doptions: [],
      arr: "",
      isAssign: false //click表示用户要下拉了不再进行回显操作，因为回显操作是通过watch一层一层监控
    };
  },
  props: {
    pcd: ""
  },
  watch: {
    pcd: {
      handler(newName, oldName) {
        this.arr = this.pcd.split(",");
      },
      deep: true
    },
    poptions() {
      if (!this.isAssign) {
        this.pvalue = this.setValue(this.arr[0], this.poptions);
      }
    },
    pvalue() {
      if (!this.isAssign) {
        this.getNode(this.pvalue, this.coptions);
      }
    },
    coptions() {
      if (!this.isAssign) {
        this.cvalue = this.setValue(this.arr[1], this.coptions);
      }
    },
    cvalue() {
      if (!this.isAssign) {
        this.getNode(this.cvalue, this.doptions);
      }
    },
    doptions() {
      if (!this.isAssign) {
        this.dvalue = this.setValue(this.arr[2], this.doptions);
      }
    }
  },
  methods: {
    handleClick() {
      this.isAssign = true;
    },
    selectProvince(e) {
      //省改变
      this.cvalue = "";
      this.coptions = [];
      this.dvalue = "";
      this.doptions = [];
      this.getNode(e, this.coptions);
    },
    selectCity(e) {
      //市改变
      this.dvalue = "";
      this.doptions = [];
      this.getNode(e, this.doptions);
    },
    selectDistrict(e) {
      //区县改变
      let pval = this.getNodeValue(this.pvalue, this.poptions);
      let cval = this.getNodeValue(this.cvalue, this.coptions);
      let dval = this.getNodeValue(this.dvalue, this.doptions);
      this.$emit("sendPCD", `${pval},${cval},${dval}`);
    },
    getNode(id, node) {
      //根据pId查询值，并且赋值到对应option下
      getPCD({ pId: id })
        .then(res => {
          if (res.code === 200) {
            let _data = res.data;
            _data.map((item, i) => {
              let temp = {};
              temp.value = item.id;
              temp.label = item.name;
              node.push(temp);
            });
          }
        })
        .catch(_ => {});
    },
    getNodeValue(id, option) {
      let nName = "";
      option.map((item, i) => {
        if (item.value == id) {
          nName = item.label;
        }
      });
      return nName;
    },
    setValue(nlabel, option) {
      let id = "";
      option.map((item, i) => {
        if (item.label == nlabel) {
          id = item.value;
        }
      });
      return id;
    }
  },
  mounted() {
    setTimeout(() => {
      this.poptions = [];
      this.getNode(0, this.poptions);
    }, 600);
  }
};
</script>

<style>
.city-picker .el-col:nth-child(2),
.city-picker .el-col:nth-child(3) {
  margin-left: 0;
}
.city-picker {
  max-width: 800px;
}
</style>