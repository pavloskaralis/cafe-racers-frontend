<template lang="html">
  <div class="game">
    <div class="game-background"></div>
    <div class="background-overlay"></div>
    <div class="table-container">
      <div class="table"></div>
      <div class="table-extension"></div>
    </div>
    <component v-if="id" :is="activeView" />
  </div>
</template>

<script lang="js">
import VersusAI from "@/components/VersusAI.vue";
import TwoPlayer from "@/components/TwoPlayer.vue";

export default  {
    name: "game",
    components: {
      "two-player": TwoPlayer,
      "versus-ai": VersusAI
    },
    props: [],
    data() {
      return {
        activeView: ''
      }
    },
    computed: {
      id () {
        return this.$store.state.id;
      }
    },
    methods: {
      setActiveView () {
        let path = this.$route.path;
        this.activeView = path === "/versus-ai" ? "versus-ai" : "two-player";
      }
    },
    mounted () {
      this.setActiveView();
    }
}
</script>

<style src="../styles/Game.scss" scoped lang="scss"></style>
