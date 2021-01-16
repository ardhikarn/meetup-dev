<template>
  <v-app id="Meetup">
    <Navbar></Navbar>
    <v-container class="mt-4">
      <v-row justify="center" v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-row>
      <v-card class="mx-auto" max-width="700" v-else>
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
                <EditDate v-if="userIsCreator" :meetup="meetup"></EditDate>
              </v-card-subtitle>
            </v-img>

            <v-card-text class="primary--text">
              <div>{{ meetup.location }}</div>
              <div>
                {{ meetup.description }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text>Join</v-btn>
              <v-spacer></v-spacer>
              <EditDialog v-if="userIsCreator" :meetup="meetup"></EditDialog>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import EditDialog from '@/components/EditDialog.vue'
import EditDate from '@/components/EditDate.vue'

export default {
  name: 'Meetup',
  components: {
    Navbar,
    EditDialog,
    EditDate
  },
  props: ['id'],
  data: () => ({}),
  computed: {
    // eslint-disable-next-line
    meetup() {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      )
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) return false
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  }
}
</script>
