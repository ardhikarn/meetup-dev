<template>
  <v-app id="meetups">
    <Navbar></Navbar>
    <v-container>
      <v-card
        max-width="500"
        outlined
        class="mx-auto secondary my-4"
        v-for="(meetup, index) in meetups"
        :key="index"
      >
        <v-container>
          <v-row dense>
            <v-col cols="5">
              <v-img :src="meetup.imageUrl" height="130px"></v-img>
            </v-col>
            <v-col cols="7">
              <v-card-title>{{ meetup.title }}</v-card-title>

              <v-card-subtitle>{{ meetup.date }}</v-card-subtitle>

              <v-btn outlined small class="mx-4" :to="`/meetup/${meetup.id}`">
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
  data: () => ({}),
  computed: {
    // eslint-disable-next-line
    meetups() {
      return this.$store.getters.featuredMeetups
    }
  }
}
</script>

<style scoped></style>
