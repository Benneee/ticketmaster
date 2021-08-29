<template>
  <header class="nav__container">
    <div class="header">
      <div class="header__logo">
        <NuxtLink to="/">
          <img src="~assets/images/Logo.svg" alt="Flutterwave" />
        </NuxtLink>
      </div>

      <ul
        class="header__menu"
        :class="[dropdownOpen ? 'active' : '']"
        role="navigation"
        aria-label="Main"
      >
        <li class="header__menu-item" @click="dropdownOpen = false">
          <NuxtLink to="/">I didn't get my tickets</NuxtLink>
        </li>
        <li class="header__menu-item" @click="dropdownOpen = false">
          <button class="nav-btn">Create Your Own Event</button>
        </li>
      </ul>

      <nav class="header__menu-controller" role="navigation" aria-label="Main">
        <div class="header__menu-icons">
          <span
            @click="
              dropdownIcon === 'menu'
                ? (dropdownOpen = true)
                : (dropdownOpen = false)
            "
          >
            <i :class="'mdi mdi-' + dropdownIcon"></i>
          </span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
    }
  },

  computed: {
    dropdownIcon() {
      return this.dropdownOpen ? 'close' : 'menu'
    },
  },

  methods: {},
}
</script>

<style scoped lang="scss">
.nav__container {
  @include set-container;
  font-family: $primary-font;

  .header {
    @include set-width(4rem);

    @include respond(tab-port) {
      padding: 0 2rem;
    }

    &__menu {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include respond(tab-port) {
        position: fixed;
        left: -100%;
        top: 5rem;
        padding: 4rem 0;
        z-index: 1;
        flex-direction: column;
        background-color: $background-color;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
      }

      &-item {
        a {
          font-weight: bold;
        }
        &:last-child {
          margin-left: 5rem;
          @include format-list;

          @include respond(tab-port) {
            margin-left: 0;
            margin-top: 1rem;
            padding-top: 1rem;
          }
        }
      }

      &.active {
        @include respond(tab-port) {
          left: 0;
        }
      }
    }

    &__menu-controller {
      display: none;

      @include respond(tab-port) {
        display: block;
        cursor: pointer;
      }
    }
  }
}
</style>
