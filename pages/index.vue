<template>
  <transition name="fade" mode="in-out">
    <Home />
  </transition>
</template>

<script>
export default {}
</script>

<style lang="scss">
* {
  font-family: $primary-font;
  color: $text-color;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
