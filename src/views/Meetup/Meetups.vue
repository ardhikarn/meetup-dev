<template>
  <div id="meetups">
    <Navbar></Navbar>
    <v-main>
      Meetups Page
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Meetups',
  components: {
    Navbar
  }
}
</script>

<style scoped></style>
