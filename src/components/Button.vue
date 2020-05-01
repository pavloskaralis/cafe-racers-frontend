<template>
  <div class="button" :class="[type]" @click="$emit('clicked', text)">
    <div class="button-text">{{ text }}</div>
    <div class="button-pointer">&#9664;</div>
  </div>
</template>

<script>
export default {
  name: "app-button",
  props: ["type", "text"],
};
</script>
<style scoped lang="scss">
.button {
  font-family: $fontB;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .button-pointer {
    opacity: 0;
  }

  &:hover .button-pointer {
    opacity: 1;
  }
}

.home-button {
  color: $white;
  font-weight: 600;
  font-size: 48px;

  @media (max-width: $breakpointA) {
    font-size: 40px;
  }
  @media (max-width: $breakpointB) {
    font-size: 36px;
  }
  @media (max-width: $breakpointC) {
    font-size: 32px;
  }
  @media (max-width: $breakpointD) {
    font-size: 28px;
  }
  @media (max-width: $breakpointE) {
    font-size: 24px;
  }
  @media (max-width: $breakpointF) {
    font-size: 20px;
  }
  @media (max-width: $breakpointG) {
    font-size: 16px;
  }

  .button-text {
    @extend .vertical-align;
    width: 100%;
    text-align: right;
    margin-right: 32px;
    @media (max-width: $breakpointA) {
      margin-right: 28px;
    }
    @media (max-width: $breakpointB) {
      margin-right: 24px;
    }
    @media (max-width: $breakpointC) {
      margin-right: 20px;
    }
    @media (max-width: $breakpointD) {
      margin-right: 16px;
    }
    @media (max-width: $breakpointE) {
      margin-right: 12px;
    }
  }
}

.game-button {
  font-family: $fontB;
  color: $dark-blue;
  font-size: 28px;
  letter-spacing: 7px;
  text-align: center;
  -webkit-text-stroke: $dark-blue 1px;
  // background: red;

  .button-pointer {
    @extend .vertical-align;
    height: 100%;
    // background: blue;
    @media (max-width: $breakpointF) {
      font-size: 13px;
    }
    @media (max-width: $breakpointG) {
      font-size: 11px;
    }

  }

  @media (max-width: $breakpointB) {
    font-size: 26px;
  }
  @media (max-width: $breakpointC) {
    font-size: 24px;
  }
  @media (max-width: $breakpointD) {
    font-size: 22px;
  }
  @media (max-width: $breakpointE) {
    font-size: 20px;
  }
  @media (max-width: $breakpointF) {
    font-size: 18px;
    letter-spacing: 4.5px;
  }
  @media (max-width: $breakpointG) {
    font-size: 16px;
    letter-spacing: 4px;
  }
  @media (max-height: $breakpointC) and (min-width: $breakpointC) {
    font-size: 24px;
    letter-spacing: 6px;
  }

  .button-text {
    @extend .vertical-align;
    width: 100%;
    word-break: break-all;


    @media (max-width: $breakpointA) {
      letter-spacing: 7px;
    }
    @media (max-width: $breakpointB) {
      letter-spacing: 6.5px;
    }
    @media (max-width: $breakpointC) {
      letter-spacing: 6px;
    }
    @media (max-width: $breakpointD) {
      letter-spacing: 5.5px;
    }
    @media (max-width: $breakpointE) {
      letter-spacing: 5px;
    }
    @media (max-width: $breakpointF) {
      letter-spacing: 4.5px;
      font-size: 13px;
    }
    @media (max-width: $breakpointG) {
      letter-spacing: 4px;
      font-size: 11px;
    }
    @media (max-height: $breakpointC) and (min-width: $breakpointC) {
      letter-spacing: 6px;
    }
  }
}
</style>
