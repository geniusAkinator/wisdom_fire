<template>
  <section class="app-main" :style="{top:isFirst?'90px':'140px'}">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      isFirst: true
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.isFirst = this.isDashboard(newVal);
    }
  },
  methods: {
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim() === "首页";
    }
  },
  mounted() {
    this.isFirst = this.isDashboard(this.$route);
  }
};
</script>

<style lang="scss">
.app-main {
  /* 50= navbar  50  */
  width: 100%;
  overflow: hidden;
  width: 100%;
  position: absolute;
  overflow-y: scroll;
  bottom: 0;
  top: 140px;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 40 */
    min-height: calc(100vh - 140px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
