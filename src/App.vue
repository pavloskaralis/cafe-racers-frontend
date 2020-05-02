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
  overflow-x: hidden;
  min-height: 600px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}
.app {
  height: 100vh;
  width: 100vw;
  min-height: 600px;
}
</style>
