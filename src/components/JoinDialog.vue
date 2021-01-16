<template>
  <v-dialog v-model="joinDialog" max-width="290" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :class="isRegistered ? 'accent' : 'primary'"
        v-bind="attrs"
        v-on="on"
        text
      >
        <v-icon small>mdi-{{ isRegistered ? 'minus' : 'plus' }}</v-icon>
        {{ isRegistered ? 'Unjoin' : 'Join' }}
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-card-title class="headline" v-if="isRegistered">
          Join to Meetup ?
        </v-card-title>
        <v-card-title class="headline" v-else>
          Cancel to join ?
        </v-card-title>
        <v-card-text>You can always change your decision later on.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="joinDialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="onAgree">
            Agree
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'JoinDialog',
  props: ['meetupId'],
  data() {
    return {
      joinDialog: false
    }
  },
  computed: {
    isRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      )
    }
  },
  methods: {
    onAgree() {
      if (this.isRegistered) {
        this.$store.dispatch('userUnjoinMeetup', this.meetupId)
      } else {
        this.$store.dispatch('userJoinMeetup', this.meetupId)
      }
    }
  }
}
</script>
