<template>
  <section class="order__summary">
    <h1 class="order__summary-heading">Order Summary</h1>

    <div
      v-for="(ticket, index) in tickets"
      :key="`ticket-${index}`"
      class="order__summary-tickets"
    >
      <p class="order__summary-ticket-details">
        <span class="ticket-count">
          {{ ticket.count }}
        </span>
        -
        <span class="ticket-type"> {{ ticket.name }}</span>
      </p>
      <p class="order__summary-ticket-price">
        N{{ convertToLocaleString(ticket.price) }}
      </p>
    </div>

    <div class="order__summary-subtotal">
      <p class="sub__total-label">Sub-total</p>
      <p class="sub__total-amount">N{{ convertToLocaleString(subTotal) }}</p>
    </div>

    <div class="order__summary-vat">
      <p class="vat-label">VAT</p>
      <p class="vat-amount">N{{ convertToLocaleString(vat) }}</p>
    </div>

    <div class="order__summary-total">
      <p class="total-label">Total Payment</p>
      <h3 class="total-amount">N{{ convertToLocaleString(total) }}</h3>
    </div>

    <div class="order__summary-btn-wrapper">
      <button
        :disabled="hasSelectedTickets"
        class="pay-btn order__summary-btn"
        @click="$emit('continue-to-payment')"
      >
        Continue
      </button>
    </div>

    <div class="order__summary-money-back">
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
    tickets: {
      type: Array,
      required: true,
    },
    hasSelectedTickets: {
      type: Boolean,
      required: false,
      default: false,
    },
    subTotal: {
      type: [Number, String],
      required: true,
    },
    vat: {
      type: [Number, String],
      required: true,
    },
    total: {
      type: [Number, String],
      required: true,
    },
  },

  methods: {
    convertToLocaleString(amount) {
      return amount.toLocaleString()
    },
  },
}
</script>

<style lang="scss" scoped>
.order__summary {
  background-color: $white;
  padding: 4.5rem 5.1rem;
  width: 100%;

  &-heading {
    font-family: $primary-font;
    font-size: 1.8rem;
    line-height: 2.2rem;
    letter-spacing: 0.065em;
    text-transform: uppercase;
    color: $primary-text-color;
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid #bdbdbd;
  }

  &-ticket {
    &-details {
      font-family: $primary-font;
      font-size: 1.4rem;
      line-height: 1.7rem;
      color: $primary-text-color;
      font-weight: bold;
    }

    &-price {
      font-family: $primary-font;
      font-size: 1.4rem;
      line-height: 1.7rem;
      text-align: center;
      color: $secondary-color;
    }
  }

  &-subtotal,
  &-vat,
  &-total {
    .sub__total-label,
    .vat-label,
    .total-label {
      font-family: $primary-font;
      font-size: 1.4rem;
      line-height: 1.7rem;
      color: $primary-text-color;
      font-weight: bold;
    }

    .total-label {
      text-transform: uppercase;
    }

    .sub__total-amount,
    .vat-amount {
      font-family: $primary-font;
      font-size: 14px;
      line-height: 17px;
      text-align: right;
      color: $secondary-color;
    }
  }

  &-tickets,
  &-subtotal,
  &-vat,
  &-total {
    display: flex;
    justify-content: space-between;
  }

  &-tickets {
    &:first-child {
      margin-top: 3.4rem;
    }
    margin-top: 1.4rem;
  }

  &-subtotal {
    padding-top: 3.4rem;
    border-top: 1px solid #bdbdbd;
    margin-top: 20.9rem;
    margin-bottom: 2.4rem;
  }

  &-vat {
    margin-bottom: 2rem;
  }

  &-total {
    margin-bottom: 3rem;
  }

  &-btn-wrapper {
    margin-bottom: 2.7rem;
    .pay-btn {
      width: 100%;
    }
  }

  &-money-back {
    display: flex;
    align-items: center;

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

  .total-amount {
    font-family: $primary-font;
    font-size: 24px;
    line-height: 29px;
    text-align: right;
    color: $primary-text-color;
  }
}
</style>
