<template>
  <div id="profile">
    <Navbar></Navbar>
    <v-main>
      Profile Page
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Profile',
  components: {
    Navbar
  }
}
</script>

<style scoped></style>
