<template>
  <v-app id="home">
    <Navbar></Navbar>
    <v-container class="mt-4 text-center">
      <v-row justify="center">
        <v-col cols="12" sm="6" class="text-center">
          <v-btn class="primary" to="/meetups">Explore Meetups</v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="text-center">
          <v-btn class="primary" to="/meetup/new">Organize Meetups</v-btn>
        </v-col>
        <v-col cols="12" v-if="isLoading">
          <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
          ></v-progress-circular>
        </v-col>
        <v-col cols="12">
          <v-carousel class="mt-5" show-arrows-on-hover cycle>
            <v-carousel-item
              v-for="(item, index) in meetups"
              :key="index"
              :src="item.imageUrl"
              @click="onLoadMeetup(item.id)"
              style="cursor: pointer"
            >
              <v-row class="fill-height" align="end" justify="center">
                <div class="title pa-2">
                  <h1>{{ item.title }}</h1>
                </div>
              </v-row>
            </v-carousel-item>
          </v-carousel>
          <div class="text-center">
            <v-btn text to="/meetups">Join our Awesome Meetups !</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  computed: {
    // eslint-disable-next-line
    meetups() {
      return this.$store.getters.featuredMeetups
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  data: () => ({}),
  methods: {
    // eslint-disable-next-line
    onLoadMeetup(id) {
      this.$router.push(`meetup/${id}`)
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  text-shadow: 4px 4px #000;
}
</style>
