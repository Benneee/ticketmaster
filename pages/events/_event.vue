<template>
  <div v-if="eventDetails !== null" class="event__container">
    <main class="event container">
      <section class="event__top">
        <div class="event__top-content">
          <p class="event__top-date">
            {{ formatDate(eventDetails.start_time) }}
          </p>
          <h1 class="event__top-name">
            {{ eventDetails.name }}
          </h1>
          <p class="event__top-description">
            Two-Time Grammy Award winner, Nathaniel Cole, who’s also just
            released an album, <span class="bold"> Into The Wild, </span>will be
            having his first concert in Lagos, Nigeria!<br />
            Fans have waited so long for this announcement, and it promises to
            be everything anyone has imagined.
          </p>
          <h3 v-if="eventDetails.ticket.length >= 1" class="event__top-price">
            {{ getPriceRange(eventDetails.ticket) }}
          </h3>

          <button
            v-if="eventDetails.ticket.length === 0"
            class="pay-btn reg-btn"
          >
            Register for Free
          </button>
          <button v-else to="/" class="pay-btn reg-btn">Buy Tickets</button>
        </div>
        <div class="event__top-img">
          <figure>
            <img
              v-if="eventDetails.image"
              :src="eventDetails.image"
              :alt="eventDetails.name"
              class="event__image-item"
            />
            <img
              v-else
              class="event__image-item"
              :src="require('@/assets/images/event-image.png')"
              :alt="eventDetails.name"
            />
          </figure>
        </div>
      </section>

      <section class="event__bottom">
        <div class="event__bottom-content">
          <div class="event__bottom-location">
            <p class="event__bottom-venue-heading">Venue</p>
            <h3 class="event__bottom-venue">
              {{ eventDetails.venue }}
            </h3>

            <div class="event__bottom-map">
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M0.75 4.5V16.5L6 13.5L12 16.5L17.25 13.5V1.5L12 4.5L6 1.5L0.75 4.5Z"
                      stroke="#F5A623"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 1.5V13.5"
                      stroke="#F5A623"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 4.5V16.5"
                      stroke="#F5A623"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>

              <p class="map-text">View map for directions</p>
            </div>
          </div>
          <div class="event__bottom-timedate">
            <p class="event__bottom-venue-heading">Date and time</p>

            <h3 class="event__bottom-start-datetime">
              {{ formatDateTime(eventDetails.start_time) }}
            </h3>

            <div class="event__bottom-socials">
              <p class="event__bottom-socials-heading">SOCIAL LINKS</p>
              <p class="event__bottom-socials-link">
                <NuxtLink to="/" class="social-link">
                  http://www.nathanielcole.com
                </NuxtLink>
              </p>
              <p class="event__bottom-socials-link">
                <NuxtLink to="/" class="social-link">
                  https://twitter.com/nathanielcole
                </NuxtLink>
              </p>
              <p class="event__bottom-socials-link">
                <NuxtLink to="/" class="social-link">
                  https://instagram.com/nathanielcole/
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      eventDetails: null,
    }
  },

  computed: {
    ...mapGetters(['events', 'event']),
  },

  mounted() {
    const eventId = this.$route.params.event
    if (this.events.length > 0) {
      this.eventDetails = this.events.find(
        (e) => parseInt(e.id) === parseInt(eventId)
      )
    } else {
      this.getSelectedEvent(eventId)
      this.eventDetails = this.event
    }
  },

  methods: {
    ...mapActions(['getEvent']),

    getSelectedEvent(eventId) {
      this.getEvent(parseInt(eventId, 10))
    },
  },
}
</script>

<style lang="scss" scoped>
.event__container {
  min-height: 80vh;
  background-image: url('@/assets/images/Lines.png');
  background-repeat: no-repeat;
  background-position: bottom 30px right 7px;
  @include respond(tab-port) {
    background-image: none;
  }

  .event {
    padding: 6rem 18rem 2rem 18rem;
    @include respond(tab-port) {
      padding: 5rem 3rem;
    }

    &__top {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
      padding-bottom: 5rem;
      border-bottom: 1px solid #ccb7b1;

      @include respond(tab-port) {
        flex-direction: column-reverse;
        border-bottom: 0;
        padding-bottom: 1.5rem;
        margin-bottom: 1rem;
      }

      &-content {
        flex: 1;
        margin-right: 4rem;
      }

      &-img {
        flex: 1;
      }

      &-date {
        font-family: $secondary-font;
        font-size: 1.8rem;
        line-height: 2.4rem;
        text-transform: uppercase;
        color: $subtext-color;
        margin-bottom: 2.3rem;

        @include respond(tab-port) {
          margin-top: 2rem;
        }
      }

      &-name {
        font-family: $primary-font;
        font-size: 3.6rem;
        line-height: 4rem;
        color: $subtext-color;
        text-transform: capitalize;
        margin-bottom: 1.5rem;

        @include respond(tab-port) {
          font-size: 3rem;
          line-height: 2rem;
        }
      }

      &-description {
        font-family: $primary-font;
        font-size: 1.8rem;
        line-height: 2.8rem;
        color: $tertiary-color;
        margin-top: 1.3rem;
        margin-bottom: 3rem;
      }

      &-price {
        font-family: $primary-font;
        font-size: 2.4rem;
        line-height: 2.8rem;
        letter-spacing: 0.05rem;
        color: $primary-text-color;
        margin-bottom: 1.8rem;
      }

      .reg-btn {
        width: 80%;
        @include respond(tab-port) {
          width: 100%;
        }
      }
    }

    &__bottom {
      margin-top: 5rem;

      @include respond(tab-port) {
        margin-top: 2rem;
      }
      &-content {
        display: flex;
        justify-content: center;

        @include respond(tab-port) {
          flex-direction: column;
        }
      }

      &-location {
        flex: 1;
        margin-right: 4rem;
      }

      &-venue-heading {
        font-family: $secondary-font;
        font-size: 1.8rem;
        line-height: 2.4rem;
        text-transform: uppercase;
        color: $primary-text-color;
      }

      &-venue,
      &-start-datetime {
        font-family: $primary-font;
        font-size: 2.4rem;
        line-height: 3.2rem;
        color: $primary-text-color;
        margin-top: 1.9rem;

        @include respond(tab-port) {
          margin-top: 1rem;
        }
      }

      &-map {
        display: flex;
        margin-top: 2.1rem;

        @include respond(tab-port) {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }

        .map-text {
          margin-left: 1.6rem;
          font-family: $primary-font;
          font-size: 1.6rem;
          line-height: 1.8rem;
          color: $primary-color;
        }
      }

      &-socials-heading {
        font-family: $secondary-font;
        font-size: 1.6rem;
        line-height: 1.6rem;
        color: $primary-text-color;
        margin-top: 1rem;
      }

      &-socials-link {
        margin-top: 0.6rem;

        font-family: $secondary-font;
        font-size: 1.5rem;
        line-height: 2rem;
        color: $subtext-color;
        opacity: 0.8;
      }

      &-timedate {
        flex: 1;
      }
    }
  }
}
</style>
