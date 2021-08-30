<template>
  <div class="container">
    <main class="events">
      <h1 class="events__hero">The best events happening now.</h1>
      <BaseLoading v-if="isLoading" size="larger" />
      <transition v-else name="fade" mode="in-out">
        <section class="events__list">
          <article v-for="(event, index) in events" :key="`event-${index}`">
            <EventCard :event="event" />
          </article>
        </section>
      </transition>

      <div class="events__show-more">
        <button
          v-if="pageInfo && !isLoading && showLoadMoreBtn"
          class="events__show-more-btn"
          @click="loadMoreEvents"
        >
          Show more events
        </button>

        <button
          v-if="showGoToTop && !isLoading"
          class="events__show-more-btn"
          @click="goToTop"
        >
          Go to Top
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  data() {
    return {
      page: 1,
    }
  },

  computed: {
    ...mapGetters(['events', 'pageInfo', 'isLoading']),

    showLoadMoreBtn() {
      return this.pageInfo.totalPages > this.pageInfo.currentPage
    },

    showGoToTop() {
      return this.pageInfo.totalPages === this.pageInfo.currentPage
    },
  },

  created() {
    if (this.events.length <= 1) {
      setTimeout(() => {
        this.getEvents(this.page)
      }, 2500)
    }
  },

  methods: {
    ...mapActions(['getEvents']),

    loadMoreEvents() {
      this.getEvents(this.page++)
    },

    goToTop() {
      this.$router.app.refresh()
    },
  },
}
</script>

<style lang="scss" scoped>
.events {
  padding: 8rem 0.5rem;

  @include respond(tab-port) {
    padding: 4rem 2rem;
  }

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

  &__show-more {
    display: flex;
    justify-content: center;
    align-items: center;

    &-btn {
      padding: 2rem 4rem;
      width: 30%;
      font-family: $primary-font;
      cursor: pointer;

      @include respond(tab-port) {
        width: 100%;
        padding: 1rem 2rem;
        font-size: 1.3rem;
      }
    }
  }
}
</style>
