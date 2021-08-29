<template>
  <div class="container">
    <main class="events">
      <h1 class="events__hero">The best events happening now.</h1>
      <BaseLoading v-if="isLoading" size="larger" />
      <transition v-else name="fade" mode="in-out">
        <section class="events__list">
          <article v-for="event in events" :key="`event-${event.id}`">
            <EventCard :event="event" />
          </article>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      page: 1,
    }
  },

  computed: {
    ...mapGetters(['events', 'pageInfo', 'isLoading']),
  },

  created() {
    if (this.events.length <= 1) {
      setTimeout(() => {
        this.getEvents(this.page)
      }, 3000)
    }
  },

  methods: {
    ...mapActions(['getEvents']),

    loadMoreEvents() {
      this.getEvents(this.page++)
    },
  },
}
</script>

<style lang="scss" scoped>
.events {
  padding: 8rem 0rem;

  &__hero {
    font-family: $primary-font;
    font-style: normal;
    font-weight: 900;
    font-size: 3.6rem;
    line-height: 40px;
    margin-bottom: 2rem;
    margin-left: 3rem;

    @include respond(tab-port) {
      font-size: 2.4rem;
      margin-left: 0.5rem;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.5%;
    margin-bottom: 3rem;

    @include respond(tab-port) {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  }
}
</style>
