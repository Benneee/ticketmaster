<template>
  <BaseModal class="success-modal">
    <div class="modal-content">
      <div class="form__header">
        <p class="form__header-text">Register For Free</p>
        <span>
          <i
            class="mdi mdi-close"
            role="button"
            @click="$emit('register-modal-closed')"
          ></i>
        </span>
      </div>

      <ValidationObserver v-slot="{ invalid }">
        <form class="modal-body" @submit.prevent="onSubmit">
          <div class="form__container">
            <ValidationProvider
              v-slot="{ errors }"
              name="Full name"
              rules="required"
            >
              <div class="form__group">
                <label class="form__group-label" for="full-name"
                  >Full name</label
                >
                <input
                  id="full-name"
                  v-model="name"
                  type="text"
                  class="form__group-input"
                />
                <span class="error__msg">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <div class="form__group">
                <label class="form__group-label" for="email"
                  >Email address</label
                >
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="form__group-input"
                />
                <span class="error__msg">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Phone number"
              rules="required|phone"
            >
              <div class="form__group">
                <label class="form__group-label" for="phone"
                  >Phone number</label
                >
                <input
                  id="phone"
                  v-model="phone"
                  type="text"
                  class="form__group-input"
                />
                <span class="error__msg">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <div class="submit">
              <button :disabled="invalid" class="submit__btn">Register</button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </BaseModal>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      phone: '',
      name: '',
      errorsAvailable: false,
    }
  },

  methods: {
    onSubmit() {
      const data = {
        email: this.email,
        phone: this.phone,
        name: this.name,
      }
      this.$emit('form-values', data)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-content {
  padding: 4.5rem 5.1rem;

  .form__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid #bdbdbd;

    &-text {
      font-family: $primary-font;
      font-size: 1.8rem;
      line-height: 2.2rem;
      letter-spacing: 0.065rem;
      text-transform: uppercase;

      color: #333333;
    }

    .mdi-close {
      font-size: 2.5rem;
      cursor: pointer;
    }
  }

  .modal-body {
    margin-top: 3rem;

    .form__group {
      margin-bottom: 2.5rem;
      &-label {
        display: block;

        font-family: $tertiary-font;
        font-style: normal;
        font-weight: normal;
        font-size: 1.6rem;
        line-height: 2.2rem;
        letter-spacing: 0.5px;
        margin-bottom: 1.4rem;
        color: $primary-text-color;
      }

      &-input {
        width: 100%;
        background: #fdfdfd;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        outline: inherit;
        font-size: inherit;
        font-family: $primary-font;
        padding: 1.8rem;

        margin-bottom: 0.7rem;
        &-error {
          border: 1px solid $red;
        }
      }
    }

    .submit {
      width: 100%;

      &__btn {
        border-radius: 4px;
        width: 100%;
        padding: 1.5rem;
        background-color: $primary-color;
        font-family: $primary-font;
        font-size: 1.4rem;
        text-align: center;
        letter-spacing: 0.5px;
        color: #ffffff;
      }
    }
  }
  .error__msg {
    color: $red;
    font-family: $primary-font;
    text-transform: lowercase;
  }

  .error__cta {
    color: $tertiary-color;
    font-family: $secondary-font;
  }
}
</style>
