<template>
  <section class="checkout__form">
    <h1 class="heading pointer" @click="$emit('back-to-summary')">
      <span>
        <img
          :src="require('@/assets/images/arrow-left.svg')"
          alt="go-back" /></span
      >Go back
    </h1>

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

    <ValidationObserver v-slot="{ invalid }">
      <form class="form-body" @submit.prevent="onSubmit">
        <div class="form__container">
          <ValidationProvider
            v-slot="{ errors }"
            name="Full name"
            rules="required"
          >
            <div class="form__group">
              <label class="form__group-label" for="full-name">Full name</label>
              <input
                id="full-name"
                v-model="name"
                type="text"
                required
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
              <label class="form__group-label" for="email">Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
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
              <label class="form__group-label" for="phone">Phone number</label>
              <input
                id="phone"
                v-model="phone"
                type="text"
                class="form__group-input"
                required
              />
              <span class="error__msg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="checkout__form-total">
            <p class="total-label">Total Payment</p>
            <p class="total-amount">N{{ total }}</p>
          </div>

          <div class="submit">
            <button :disabled="invalid" type="submit" class="submit__btn">
              Pay N{{ total }}
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>

    <div class="checkout__form-money-back">
      <div class="verified">
        <img
          :src="require('@/assets/images/money-back.svg')"
          alt="Money back garantee"
        />
      </div>
      <div class="verified-text">
        <p class="cust">100% customer protection</p>
        <p class="money">Money back guarantee</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    total: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
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

      this.$emit('make-payment', data)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkout__form {
  padding: 4.5rem 5.1rem;

  .heading {
    display: flex;
    font-family: $primary-font;
    font-size: 1.8rem;
    line-height: 2.2rem;
    letter-spacing: 0.065rem;
    color: $primary-text-color;
    span {
      margin-right: 1.2rem;
    }
  }

  .form-body {
    margin-top: 3rem;
    margin-bottom: 2rem;

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

  &-money-back {
    display: flex;
    align-items: center;

    margin-top: 2.7rem;

    .verified-text {
      margin-left: 1rem;
      .cust {
        letter-spacing: 0.5px;
        margin-bottom: 0.01rem;
        font-family: $primary-font;
        font-size: 1.4rem;
        line-height: 1.4rem;
        color: $primary-text-color;
        font-weight: bold;
      }

      .money {
        font-family: $primary-font;
        font-size: 1.3rem;
        line-height: 1.4rem;
        letter-spacing: 0.05rem;

        color: #828282;
      }
    }
  }

  &-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2.1rem;
    padding-bottom: 3rem;
    .total-label {
      font-family: $primary-font;
      font-size: 1.4rem;
      line-height: 1.7rem;
      color: $primary-text-color;
      font-weight: bold;
      text-transform: uppercase;
    }

    .total-amount {
      font-family: $primary-font;
      font-size: 24px;
      line-height: 29px;
      text-align: right;
      color: $primary-text-color;
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
