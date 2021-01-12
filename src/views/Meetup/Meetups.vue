<template>
  <v-app id="meetups">
    <Navbar></Navbar>
    <v-container>
      <v-card max-width="500" outlined class="mx-auto secondary">
        <v-container>
          <v-row dense>
            <v-col cols="5">
              <v-img :src="items.src" height="130px"></v-img>
            </v-col>
            <v-col cols="7">
              <v-card-title>{{ items.title }}</v-card-title>

              <v-card-subtitle>{{ items.date }}</v-card-subtitle>

              <v-btn outlined small class="mx-4" to="/meetup/1">
                <v-icon left>mdi-calendar-account</v-icon>
                View Meetup
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Meetups',
  components: {
    Navbar
  },
  data: () => ({
    items: {
      title: 'My Meetup',
      src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
      date: '12nd January 2021'
    }
  })
}
</script>

<style scoped></style>
