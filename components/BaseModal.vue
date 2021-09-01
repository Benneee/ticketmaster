<template>
  <div
    ref="modal"
    :class="['modal', size]"
    @click="outsideClickHandler($event)"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    size: {
      type: String,
      required: false,
      default: 'default',
    },

    type: {
      type: String,
      required: false,
      default: 'clipped',
    },
  },

  methods: {
    outsideClickHandler(event) {
      if (event.target === this.$refs.modal) {
        this.$emit('emit')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.modal-open {
  overflow: hidden;
}

.modal {
  position: fixed;
  z-index: 600;
  left: 0;
  top: 0;
  @include width-height(100%);
  overflow: auto;
  background: rgba($background-color, 0.4);

  &.default .modal-content {
    width: 47rem;
    height: 65rem;
    @media screen and (max-width: 840px) {
      width: 95%;
    }
  }

  &.success-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.modal-content {
  background: $white;
  margin: 51px auto;
  overflow: hidden;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;

  .close-button {
    position: absolute;
    z-index: 999;
    flex: 1;
    top: 2rem;
    right: 2.5rem;
    border-radius: 50%;
    color: $primary-text-color;
    width: 15px;
    height: 15px;
    transition-duration: 0.2s;

    font-size: 2.5rem;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
