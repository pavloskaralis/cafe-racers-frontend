<template>
  <span class="letter-container" :style="style">
    {{ letter }}
  </span>
</template>

<script>
export default {
  name: "letter",
  props: ["status", "letter", "isWrong"],
  computed: {
    style() {
      return {
        active: {},
        inactive: { color: "gray", textStroke: "gray 1px" },
        current: {
          backgroundColor: !this.isWrong ? "rgb(0,165,255)" : "rgb(200,0,60)",
        },
      }[this.status];
    },
  },
};
</script>
<style scoped lang="scss">
.letter-container {
  display: inline-flex;
  flex-direction: column;
  font-family: $fontB;
  -webkit-text-stroke: $dark-blue 1px;

  font-size: 28px;
  padding: 0 3px;
  min-width: 11px;
  margin-bottom: 12px;
  color: $dark-blue;

  @media (max-width: $breakpointB) {
    font-size: 26px;
    padding: 0 2.9px;
    min-width: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: $breakpointC) {
    font-size: 24px;
    padding: 0 2.8px;
    min-width: 9px;
    margin-bottom: 8px;
  }
  @media (max-width: $breakpointD) {
    font-size: 22px;
    padding: 0 2.7px;
    min-width: 8px;
    margin-bottom: 6px;
  }
  @media (max-width: $breakpointE) {
    font-size: 20px;
    padding: 0 2.6px;
    min-width: 7px;
    min-height: 24px;
    margin-bottom: 4px;
  }
  @media (max-width: $breakpointF) {
    font-size: 18px;
    padding: 0 2.5px;
    min-width: 6px;
    margin-bottom: 2px;
  }
  @media (max-width: $breakpointG) {
    font-size: 16px;
    padding: 0 2.4px;
    min-width: 5px;
    margin-bottom: 0px;
  }
  @media (max-height: $breakpointC) and (min-width: $breakpointC) {
    font-size: 24px;
    padding: 0 2.8px;
    min-width: 9px;
    margin-bottom: 8px;
  }
}
</style>
