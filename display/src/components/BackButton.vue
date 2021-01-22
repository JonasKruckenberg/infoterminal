<template>
  <img
    svg-inline
    class="back-button icon"
    src="../assets/icons/angle-left.svg"
    @click="$router.go(-1)"
  />
</template>

<style lang="scss" scoped>
@import "../assets/variables.scss";
.icon {
  color: $white;
  opacity: 0.5;
}
</style>
