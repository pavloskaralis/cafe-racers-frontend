<template>
  <div class="home">
    <div class="home-background"></div>
    <div class="home-title-wrap">
      <div class="home-title">Café<span class="title-span">Racers </span></div>
    </div>
    <div class="home-button-container">
      <div class="home-button-wrap">
        <app-button
          type="home-button"
          text="2 Player"
          @clicked="twoPlayer"
        ></app-button>
        <app-button
          type="home-button"
          text="Versus AI"
          @clicked="versusAI"
        ></app-button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "home",
  components: {
    "app-button": Button,
  },
  computed: {
    id() {
      return this.$store.state.id;
    },
  },
  methods: {
    async twoPlayer() {
      const url = "http://localhost:8000/api/games";
      const request = {
        player1: this.id,
        end: 0,
        p1_again: 0,
        p2_again: 0,
        p1_text: "",
        p2_text: ""
      };

      const response = await this.$axios.post(url, request);
      const id = response.data.id;

      this.$router.push(`/2-player/${id}`);
    },
    versusAI() {
      this.$router.push("/versus-ai");
    },
  },
};
</script>

<style scoped src="../styles/Home.scss" lang="scss"></style>
