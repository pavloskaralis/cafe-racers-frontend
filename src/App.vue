<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$store.dispatch("checkID");
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  //  overflow: hidden;
  min-height: 600px;
}
.app {
  height: 100vh;
  width: 100vw;
  min-height: 600px;
}
</style>
