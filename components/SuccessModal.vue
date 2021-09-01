<template>
  <BaseModal class="success-modal">
    <div class="modal-content success-modal-content">
      <div class="modal-header">
        <i
          class="mdi mdi-close close-button"
          role="button"
          @click="$emit('success-modal-closed')"
        ></i>
      </div>
      <div class="modal-body">
        <div class="success__circle">
          <span>
            <svg
              width="137"
              height="137"
              viewBox="0 0 137 137"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M125.583 63.2476V68.4993C125.576 80.8089 121.59 92.7864 114.22 102.646C106.849 112.505 96.4894 119.717 84.685 123.207C72.8806 126.698 60.2642 126.278 48.7174 122.013C37.1707 117.747 27.3122 109.862 20.6124 99.5359C13.9126 89.2093 10.7303 76.9937 11.5402 64.7108C12.3502 52.4279 17.1089 40.7358 25.1067 31.3784C33.1045 22.021 43.9128 15.4996 55.9197 12.7868C67.9267 10.074 80.4889 11.3151 91.7328 16.3251"
                stroke="#F5A623"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M125.583 22.8335L68.5 79.9739L51.375 62.8489"
                stroke="#F5A623"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <div class="success__container">
          <h3 class="success__container-text">
            You have successfully registered for the nathan cole experience.
          </h3>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.success__container,
.success__circle {
  text-align: center;
}

.success__circle {
  margin-top: 10rem;
}

.success__container {
  margin-top: 5rem;
  padding: 2rem 4.7rem;
  &-text {
    font-family: $primary-font;
    font-size: 1.8rem;
    line-height: 2.2rem;
    letter-spacing: 0.065em;
    color: $black;
  }
}
</style>
