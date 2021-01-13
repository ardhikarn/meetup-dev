<template>
  <v-app id="Meetup">
    <Navbar></Navbar>
    <v-container class="mt-4">
      <v-card class="mx-auto" max-width="700">
        <v-row dense>
          <v-col cols="12">
            <v-img
              :src="meetup.imageUrl"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <v-card-title>{{ meetup.title }}</v-card-title>
              <v-card-subtitle class="secondary--text">
                {{ meetup.date | date }}
              </v-card-subtitle>
            </v-img>

            <v-card-text class="primary--text">
              <div>{{ meetup.location }}</div>

              <div>
                {{ meetup.description }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text>
                Share
              </v-btn>

              <v-btn color="primary" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Meetup',
  components: {
    Navbar
  },
  data: () => ({}),
  props: ['id'],
  computed: {
    // eslint-disable-next-line
    meetup() {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
