<template>
  <div>
    <button class="change-count" @click="$emit('decreaseCount', ticketId)">
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
  },
}
</script>

<style></style>
