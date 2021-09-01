<template>
  <div>
    <button
      class="change-count"
      aria-roledescription="Increase ticket count"
      role="button"
      @click="$emit('increase-count', ticketId)"
    >
      <img
        :src="require('@/assets/images/+.png')"
        alt="increase-ticket-count"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    ticketId: {
      type: [Number, String],
      required: true,
    },
  },
}
</script>

<style></style>
