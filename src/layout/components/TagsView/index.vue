<template>
  <div id="tags-view-container" class="tags-view-container" ref="myTab">
    <!-- <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>-->
    <el-tabs v-model="nowTabIndex" type="card" @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane
        v-for="(tag,index) in visitedViews"
        :key="tag.path"
        :label="tag.title"
        :closable="!tag.meta.affix"
        :name="tag.index"
        class="tab-item"
        ref="tag"
      ></el-tab-pane>
    </el-tabs>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新页面</li>
      <li
        v-if="!(selectedTag.meta&&selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import path from "path";

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      nowTabIndex: 0
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    routes() {
      return this.$store.state.permission.routes;
    }
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
      this.updateTabIndex();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    let _this = this;
    this.initTags();
    this.addTags();
    let tab = this.$refs.myTab;
    let tabList = document.querySelector(".el-tabs__nav.is-top");
    tab.addEventListener("contextmenu", e => {
      e.preventDefault();
      if (tabList.contains(e.target)) {
        let nNode = e.target.closest(".el-tabs__item.is-top");
        let aNode = document.querySelectorAll(".el-tabs__item");
        aNode.forEach((currentValue, index, arr) => {
          if (currentValue == nNode) {
            this.selectedTag = this.visitedViews[index];
            _this.openMenu(e);
          }
        });
      }
    });
  },
  methods: {
    clickTab(tab, event) {
      let index = this.nowTabIndex;
      let nowViews = this.visitedViews[this.nowTabIndex];
      console.log(nowViews);
      this.$router.push({ path: nowViews.path });
    },
    removeTab() {
      let index = this.nowTabIndex;
      let nowViews = this.visitedViews[this.nowTabIndex];
      this.$store
        .dispatch("tagsView/delView", nowViews)
        .then(({ visitedViews }) => {
          if (this.isActive(nowViews)) {
            this.toLastView(visitedViews, nowViews);
          }
        });
    },
    do() {},
    updateTabIndex() {
      let _this = this;
      this.visitedViews.map((item, i) => {
        if (item.path == _this.$route.path) {
          _this.nowTabIndex = i + "";
        }
      });
      console.log(this.$route.path);
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    moveToCurrentTag() {
      // const tags = this.$refs.tag;
      // console.log(tags)
      // this.$nextTick(() => {
      //   for (const tag of tags) {
      //     if (tag.to.path === this.$route.path) {
      //       this.$refs.scrollPane.moveToTarget(tag);
      //       // when query is different then update
      //       if (tag.to.fullPath !== this.$route.fullPath) {
      //         this.$store.dispatch("tagsView/updateVisitedView", this.$route);
      //       }
      //       break;
      //     }
      //   }
      // });
      this.$store.dispatch("tagsView/updateVisitedView", this.$route);
    },
    refreshSelectedTag(view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath
          });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch("tagsView/delView", view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view);
          }
        });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store
        .dispatch("tagsView/delOthersViews", this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    openMenu(e) {
      console.log("ddd");
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
      // this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  background: #fff;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      border: 1px solid #d8dce5;
      border-left: 0;
      color: #495060;
      background: #fff;
      padding: 0 20px;
      font-size: 12px;
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    padding: 5px 0;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    border: 1px solid #d2d2d2;
    background-color: #fff;
    z-index: 99999;
    border-radius: 2px;
    white-space: nowrap;
    li {
      margin: 0;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
.tags-view-container .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 0 !important;
  border-top: 0 !important;
}
.el-tabs .el-tabs__nav-prev {
  border-right: 1px solid #e6e6e6;
  background: #fff;
  z-index: 10;
}
.el-tabs .el-tabs__nav-next {
  border-left: 1px solid #e6e6e6;
  background: #fff;
  z-index: 10;
}
.el-tabs .el-tabs__nav-wrap.is-scrollable.is-top .el-tabs__nav-scroll {
  margin-left: 20px !important;
  margin-right: 20px !important;
}
</style>
