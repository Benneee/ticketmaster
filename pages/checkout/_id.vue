<template>
  <main class="container">
    <section v-if="eventDetails !== null" class="event">
      <button class="event__close">
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
          <p class="event__tickets-item-amount">
            N{{ convertToLocaleString(ticket.price) }}
          </p>
          <div class="event__tickets-item-type">
            <DecreaseCount
              :ticket-id="ticket.id"
              @decrease-ccount="decreaseTicketCount"
            />
            <span> {{ ticket.count }} </span>
            <IncreaseCount @increase-count="increaseTicketCount" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'no-nav',

  data() {
    return {
      eventDetails: null,
    }
  },

  computed: {
    ...mapGetters(['events', 'tickets']),
  },

  created() {
    const eventId = this.$route.params.id
    const event = this.events.find((e) => parseInt(e.id) === parseInt(eventId))

    const { ticket } = event

    // ToDo: Check LS or State first before assigning count of 0 here, so we can maintain the previously selected count for this particular event for the user on a subsequent visit
    const ticketsWithCount = ticket.map((tkt) => {
      tkt.count = 0
      return tkt
    })
    this.eventDetails = { ...event }
    this.eventDetails.ticket = ticketsWithCount
    this.setTickets(ticketsWithCount)
  },

  methods: {
    ...mapActions(['setTickets']),

    convertToLocaleString(amount) {
      return amount.toLocaleString()
    },
  },
}
</script>

<style lang="scss" scoped>
.event {
  padding: 5rem 13rem;
  min-height: 100vh;

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
}
</style>
