<template>
  <div class="cup-container" :style="this.state.player === 'empty' ? {opacity: '0'} : {}">
    <div class="winner-wrap">
      <div class="winner-text" :style="{ opacity: opacity }">
        {{ this.state.winner !== "tie" ? "Winner!" : "Tie!" }}
      </div>
    </div>
    <div class="empty-cup" :style="{ transform: transform }">
      <div class="full-cup" :style="{ 'clip-path': clipPath }"></div>
      <div class="speed-text" :style="{ transform: transform }">
        {{ this.state.speed }} WPM
      </div>
    </div>
    <div class="player-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "cup",
  props: ["state"],
  computed: {
    clipPath() {
      return `polygon(100% ${
        this.state.completion * 0.585 + 11.1
      }%, 100% 100%, 0 100%, 0 ${this.state.completion * 0.585 + 11.1}%)`;
    },
    opacity() {
      let opacity;
      if (this.state.cup === "left") {
        opacity =
          this.state.winner !== "player1" && this.state.winner !== "tie"
            ? 0
            : 1;
      } else if (this.state.cup === "right") {
        opacity =
          this.state.winner !== "player2" && this.state.winner !== "tie"
            ? 0
            : 1;
      }
      return opacity;
    },
    text() {
      if (this.state.cup === "left" && this.state.player === "player1") {
        return "You";
      } else if (
        this.state.cup === "right" &&
        this.state.player === "player2"
      ) {
        return "You";
      } else if (this.state.player === "empty") {
        return "Empty";
      } else {
        return "Them";
      }
    },
    transform() {
      return this.state.cup === "left" ? "scaleX(-1)" : "";
    },
  },
};
</script>
<style src="../styles/Cup.scss" scoped lang="scss"></style>
