<template>
  <section class="event">
    <figure class="event__image">
      <img
        class="event__image-item"
        :src="require('@/assets/images/event-image.png')"
        :alt="`The event`"
      />
    </figure>
    <p class="event__date">8th February 2019</p>
    <p class="event__name">The Nathan Cole Experience</p>
    <p class="event__price">N5000 - N20000</p>
  </section>
</template>

<script>
export default {}
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
      max-width: 40rem;
      filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.306764));
      border-radius: 6px;
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
