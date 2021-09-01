<template>
  <main>
    <section v-if="eventDetails !== null" class="event">
      <button class="event__close" @click="$router.go(-1)">
        <i class="mdi mdi-close"></i>
        Close
      </button>

      <h1 class="event__name">
        {{ eventDetails.name }}
      </h1>
      <p class="event__datetime">
        {{ formatDate(eventDetails.start_time) }}
      </p>

      <div class="event__tickets">
        <div
          v-for="(ticket, index) in tickets"
          :key="`ticket-${index}`"
          class="event__tickets-item"
        >
          <p class="event__tickets-item-type">
            {{ ticket.name }}
          </p>
          <p
            class="event__tickets-item-amount"
            :class="[ticket.name === 'VIP' ? 'ml' : '']"
          >
            N{{ convertToLocaleString(ticket.price) }}
          </p>
          <div class="event__tickets-item-counter">
            <DecreaseCount
              :ticket-id="ticket.id"
              :current-ticket-count="ticket.count"
              @decrease-count="decreaseCount"
            />
            <span> {{ ticket.count }} </span>
            <IncreaseCount
              :ticket-id="ticket.id"
              @increase-count="increaseCount"
            />
          </div>
        </div>
      </div>
      <p class="event__enddate">
        Ticket sales ends on
        {{ formatDate(eventDetails.end_time) }}
      </p>
    </section>
    <section class="summary">
      <OrderSummary
        v-if="!showCheckoutForm"
        :tickets="tickets"
        :has-selected-tickets="hasSelectedATicket"
        :sub-total="subTotal"
        :vat="vat"
        :total="totalWithVat"
        @continue-to-payment="showCheckoutForm = true"
      />
      <CheckoutForm
        v-if="showCheckoutForm"
        :total="totalWithVat"
        @back-to-summary="showCheckoutForm = false"
        @make-payment="makePayment"
      />
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'NoNav', // Somethimg to investigate later
  data() {
    return {
      eventDetails: null,
      showCheckoutForm: false,
      ticketsBought: {},
    }
  },

  head() {
    return {
      script: [
        {
          src: 'https://checkout.flutterwave.com/v3.js',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(['events', 'tickets']),

    hasSelectedATicket() {
      const selected = this.tickets.some((ticket) => ticket.count >= 1)
      return !selected
    },

    subTotal() {
      return this.tickets.reduce(
        (acc, ticket) =>
          parseInt(acc, 10) +
          parseInt(ticket.count, 10) * parseInt(ticket.price),
        0
      )
    },

    vat() {
      return this.subTotal * (7.5 / 100)
    },

    totalWithVat() {
      return this.subTotal + this.vat
    },
  },

  mounted() {
    const eventId = this.$route.params.id
    const event = this.events.find((e) => parseInt(e.id) === parseInt(eventId))

    // ToDo: Check LS or State first before assigning count of 0 here, so we can maintain the previously selected count for this particular event for the user on a subsequent visit
    // Kept throwing vuex state error - Investigate!

    // const ticketsWithCount = ticket.map((tkt) => {
    //   tkt.count = 0
    //   return tkt
    // })
    // this.eventDetails.ticket = ticketsWithCount
    this.setTickets(event.ticket)
    this.eventDetails = { ...event }
  },

  methods: {
    ...mapActions([
      'setTickets',
      'increaseTicket',
      'decreaseTicket',
      'createOrder',
      'clearTickets',
    ]),

    convertToLocaleString(amount) {
      return amount.toLocaleString()
    },

    increaseCount(ticketId) {
      this.increaseTicket(ticketId)
    },

    decreaseCount(ticketId) {
      this.decreaseTicket(ticketId)
    },

    makePayment(formData) {
      this.tickets.forEach((ticket) => {
        if (ticket.count >= 1) {
          this.ticketsBought[String(ticket.id)] = ticket.count
        }
      })
      window.FlutterwaveCheckout({
        public_key: process.env.FLW_PUK,
        tx_ref: `${Math.random() * 1000000}`,
        amount: this.totalWithVat,
        currency: 'NGN',
        country: 'NG',
        payment_options: 'card',
        customer: {
          email: formData.email,
          phone_number: formData.phone,
          name: formData.name,
        },
        callback: (data) => {
          this.sendEventOrder(data, formData)
        },
        customizations: {
          title: 'Tickets Master',
          description: `Payment for ${this.eventDetails.name}`,
        },
      })
    },

    sendEventOrder(dataFromFLW, formData) {
      if (dataFromFLW) {
        /**
         * Payload format:
         * "event_id": 1,
         * "email": "deji.atoyebi@flutterwavego.com",
         * "phone": "08100455706",
         * "name": "Deji Atoyebi",
         * "base_amount": 10000,
         * "value_added_tax": 100,
         * "tickets_bought": "{'2': 10, '1': 14}"
         */

        // Using data from FLW to certify order went through on FLW's end
        const orderPayload = {
          event_id: Number(this.$route.params.id),
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          base_amount: this.subTotal,
          value_added_tax: this.vat,
          tickets_bought: this.ticketsBought,
        }
        this.createOrder(orderPayload)
          .then((res) => {
            if (res.status === 'success') {
              this.$toast.success('Congratulations! Event payment successful')
              this.clearTickets()
              if (this.$router) {
                this.$router.push('/')
              } else {
                window.href = '/'
              }
            }
          })
          .catch(() => this.$toast.error('Error occurred in order creation'))
      }
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  @include respond(tab-port) {
    flex-direction: column;
  }
}

.event {
  width: 67.36%;
  padding: 5rem 13rem;
  min-height: 100vh;

  @include respond(tab-port) {
    width: 100%;
    padding: 2rem;
  }

  &__close {
    background-color: $white;
    background: #ffffff;
    padding: 1rem 2rem;
    color: $black;
    font-family: $secondary-font;
    border-radius: 60px;
    font-size: 1.8rem;
    line-height: 2.4rem;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    }
  }

  &__name {
    font-family: $primary-font;
    font-size: 3.6rem;
    line-height: 4rem;
    color: $subtext-color;
    margin-top: 6rem;
  }

  &__datetime {
    font-family: $tertiary-color;
    font-style: normal;
    font-weight: normal;
    font-size: 1.8rem;
    line-height: 2.4rem;
    margin-top: 0.2rem;
    text-transform: uppercase;
    color: $secondary-color;
  }

  &__tickets {
    margin-top: 5.1rem;
    font-family: $primary-font;
    font-size: 2.4rem;
    line-height: 2.8rem;
    letter-spacing: 0.05rem;
    color: $primary-text-color;
    @include respond(big-desktop) {
      margin-top: 8.1rem;
    }

    &-item {
      border-bottom: 1px solid #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 2rem;
      margin-bottom: 2rem;

      &-amount {
        justify-content: flex-start;
        font-weight: bold;
        letter-spacing: 0.05rem;
        color: $primary-text-color;
      }

      &-counter {
        width: 20%;
        display: flex;
        justify-content: flex-end;

        span {
          margin: 0 1.6rem;
          font-weight: bold;
          letter-spacing: 0.05rem;
          color: $primary-text-color;
        }
      }
    }
  }
  &__enddate {
    font-family: $primary-font;
    font-size: 1.4rem;
    line-height: 2.8rem;
    letter-spacing: 0.05rem;
    color: #828282;
  }

  .ml {
    margin-left: 4.3rem;
  }
}

.summary {
  width: 32.64%;
  background-color: $white;
  @include respond(tab-port) {
    width: 100%;
  }
}
</style>
