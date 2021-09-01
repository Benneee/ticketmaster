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

      <div v-if="errorsAvailable" class="error__container">
        <p class="error__cta">Please correct the following error(s):</p>
        <ul>
          <li
            v-for="(error, index) in errors"
            :key="`error-${index}`"
            class="error__msg"
          >
            {{ error }}
          </li>
        </ul>
      </div>
      <form
        ref="registrationForm"
        class="modal-body"
        @submit.prevent="onSubmit"
      >
        <div class="form__container">
          <div class="form__group">
            <label class="form__group-label" for="full-name">Full name</label>
            <input
              id="full-name"
              v-model="name"
              type="text"
              required
              class="form__group-input"
            />
          </div>

          <div class="form__group">
            <label class="form__group-label" for="email">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="form__group-input"
            />
          </div>

          <div class="form__group">
            <label class="form__group-label" for="phone">Phone number</label>
            <input
              id="phone"
              v-model="phone"
              type="text"
              class="form__group-input"
              required
            />
          </div>

          <div class="submit">
            <button class="submit__btn">Register</button>
          </div>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      email: '',
      phone: '',
      name: '',
      errorsAvailable: false,
    }
  },

  methods: {
    validateForm(data) {
      let isValid = true
      for (const [key, value] of Object.entries(data)) {
        if (String(value).trim().length <= 0 || !value || value === '') {
          this.errors.push(`Please enter a valid ${key}`)
          isValid = false
        }
      }
      return isValid
    },

    onSubmit() {
      const data = {
        email: this.email,
        phone: this.phone,
        name: this.name,
      }
      if (!this.validateForm(data)) {
        this.errorsAvailable = true
      } else {
        this.$emit('form-values', data)
      }
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

        margin-bottom: 2.5rem;
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
    margin-top: 1.5rem;
    margin-bottom: -2rem;
    font-family: $secondary-font;
  }

  .error__cta {
    color: $tertiary-color;
    font-family: $secondary-font;
  }
}
</style>
