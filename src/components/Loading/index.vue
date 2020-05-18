<template>
  <div class="loading-mask">
    <template v-if="theme == 'circle'">
      <div class="circle loader"></div>
    </template>
    <template v-else-if="theme == 'wave'">
      <div class="sk-wave">
        <div class="sk-rect sk-rect-1"></div>
        <div class="sk-rect sk-rect-2"></div>
        <div class="sk-rect sk-rect-3"></div>
        <div class="sk-rect sk-rect-4"></div>
        <div class="sk-rect sk-rect-5"></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    theme: {
      type: String,
      default: "wave"
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #222;
  z-index: 99999;
}
.circle {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: whiteSmoke;
  box-shadow: 4px -40px 60px 5px rgb(26, 117, 206) inset;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
.loader {
  background: linear-gradient(to right, rgb(22, 113, 202) 50%, transparent 50%);
  animation: spin 1s infinite linear;
}
.loader:before {
  display: block;
  content: "";
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  background: #222;
  border-radius: 50%;
}
.sk-wave {
  width: 100px;
  height: 100px;
  margin: auto;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
.sk-wave .sk-rect {
  background-color: #337ab7;
  height: 100%;
  width: 0.5em;
  display: inline-block;
  animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
}
@for $i from 1 through 5 {
  .sk-wave .sk-rect-#{$i} {
    animation-delay: -1.2s + 0.1 * ($i);
  }
}
@keyframes sk-wave-stretch-delay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>