<template>
  <section class="event">
    <NuxtLink :to="`/events/${event.id}`">
      <figure class="event__image">
        <img
          v-if="event.image"
          :src="event.image"
          :alt="event.name"
          loading="lazy"
          class="event__image-item"
        />
        <img
          v-else
          class="event__image-item"
          :src="require('@/assets/images/event-image.png')"
          :alt="event.name"
        />
      </figure>
      <p class="event__date">{{ formatDate(event.start_time) }}</p>
      <p class="event__name">
        {{ event.name }}
      </p>
      <p class="event__price">
        <span v-if="isFree(event)" class="event__price-free"> Free </span>
        <span v-if="event.is_sold_out" class="event__price-soldout">
          Sold out
        </span>
        <span v-else>{{ getPriceRange(event.ticket) }} </span>
      </p>
    </NuxtLink>
  </section>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  methods: {
    isFree(event) {
      return Object.keys(event.ticket).length === 0 || event.is_free
    },
  },
}
</script>

<style lang="scss" scoped>
.event {
  margin-bottom: 3rem;
  &__image {
    margin-bottom: 1.9rem;
    &-item {
      height: 23.1rem;
      border-radius: 6px;
      object-fit: cover;
      filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.306764));
      border-radius: 6px;
      width: 100vw;
    }
  }

  &__date {
    font-family: $secondary-font;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: $secondary-color;
    margin-bottom: 0.5rem;
  }

  &__name {
    font-family: $primary-font;
    font-style: normal;
    font-weight: bold;
    font-size: 1.8rem;
    line-height: 2.2rem;
    margin-bottom: 0.7rem;
    color: $primary-text-color;
  }

  &__price {
    font-family: $primary-font;
    font-style: normal;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1.7rem;
    letter-spacing: 0.05rem;
    color: $secondary-color;

    &-free {
      font-weight: bold;
      color: $green;
    }

    &-soldout {
      font-weight: bold;
      color: $red;
    }
  }
}
</style>
