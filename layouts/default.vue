<template>
  <div>
    <Navbar />
    <Nuxt />
    <div v-if="!isLoading">
      <Footer />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoading']),
  },
}
</script>
