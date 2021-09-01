<template>
  <div>
    <button
      class="change-count"
      :disabled="currentTicketCount === 0"
      @click="$emit('decrease-count', ticketId)"
    >
      <img
        :src="require('@/assets/images/-.png')"
        alt="decrease-ticket-count"
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
    currentTicketCount: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style></style>
