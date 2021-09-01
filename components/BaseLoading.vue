<template>
  <div :class="['loading', color, size]">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',

  props: {
    color: {
      type: String,
      required: false,
      default: 'orange',
    },

    size: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  align-items: center;
  justify-content: center;

  &.small > .spinner {
    width: 20px;
    height: 20px;

    &:after,
    &:before {
      border-width: 3px;
      width: 20px;
      height: 20px;
    }
  }

  &.large > .spinner {
    width: 52px;
    height: 50vh;

    &:after,
    &:before {
      border-width: 6px;
      width: 52px;
      height: 52px;
    }
  }

  &.larger > .spinner {
    width: 72px;
    height: 72px;

    &:after,
    &:before {
      border-width: 8px;
      width: 72px;
      height: 72px;
    }
  }

  &.white > .spinner {
    &:before {
      border-color: rgba($white, 0.3);
    }

    &:after {
      border-top-color: $white;
    }
  }
}

.spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  display: inline-block;

  &:after,
  &:before {
    content: '';
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    border: 4px solid rgba($primary-color, 0.2);
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    border: 4px solid transparent;
    border-top-color: $primary-color;
    animation: spin 1s ease-in-out infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
