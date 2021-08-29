<template>
  <footer class="footer__container">
    <section class="footer">
      <div class="footer__copyright">
        <NuxtLink to="/"> Copyright 2019. Flutterwave inc </NuxtLink>
      </div>
      <ul class="footer__articles">
        <li class="footer__articles-item">Terms & Conditions</li>
        <li class="footer__articles-item">Privacy Policy</li>
      </ul>
    </section>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.footer__container {
  @include set-container;

  .footer {
    @include set-width(15rem);
    font-family: $secondary-font;
    color: $tertiary-color;
    letter-spacing: 0.0028px;
    font-size: 1.5rem;

    @include respond(tab-port) {
      @include set-width(2rem);
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    &__copyright {
      @include respond(tab-port) {
        margin-bottom: 1rem;
      }
    }

    &__articles {
      display: flex;
      justify-content: space-between;

      @include respond(tab-port) {
        display: flex;
        flex-direction: column;
      }

      &-item {
        @include respond(tab-port) {
          margin-bottom: 1rem;
        }
        &:last-child {
          margin-left: 5rem;
          @include respond(tab-port) {
            margin-left: 0rem;
            margin-bottom: 0rem;
          }
        }
      }
    }
  }
}
</style>
