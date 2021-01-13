<template>
  <v-app id="create-meetups">
    <Navbar></Navbar>
    <v-container class="mt-4">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <form @submit.prevent="onSubmit">
            <v-card ref="form">
              <v-card-text>
                <h1 class="secondary--text mb-5">Create a new Meetup</h1>
                <v-text-field
                  name="title"
                  v-model="title"
                  :rules="[() => !!title || 'This field is required']"
                  label="Title"
                  required
                ></v-text-field>
                <v-text-field
                  name="location"
                  v-model="location"
                  :rules="[() => !!location || 'This field is required']"
                  label="Location"
                  required
                ></v-text-field>
                <v-text-field
                  name="imageUrl"
                  v-model="imageUrl"
                  :rules="[() => !!imageUrl || 'This field is required']"
                  label="Image URL"
                  required
                ></v-text-field>
                <v-img :src="imageUrl"></v-img>
                <p style="fontSize: 16px" class="mt-5">Date and Time</p>
                <v-date-picker v-model="date" elevation="10"></v-date-picker>

                <v-time-picker
                  class="mt-4"
                  v-model="time"
                  format="24hr"
                  elevation="10"
                ></v-time-picker>

                <v-textarea
                  name="description"
                  v-model="description"
                  :rules="[() => !!description || 'This field is required']"
                  label="Description"
                  required
                ></v-textarea>
              </v-card-text>
              <v-divider class="mt-12"></v-divider>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  :disabled="!isFormValid"
                  type="submit"
                >
                  Submit
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text>
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'CreateMeetup',
  components: {
    Navbar
  },
  data: () => ({
    title: '',
    location: '',
    imageUrl: '',
    description: '',
    date: new Date().toISOString().substr(0, 10),
    time: new Date()
  }),
  computed: {
    isFormValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      )
    },
    submittableDateTime() {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onSubmit() {
      if (!this.isFormValid) return alert('form not Valid')
      const dataMeetup = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', dataMeetup) // parameter creatMeetup is (store.action)
      this.$router.push('/meetups')
    }
  }
}
</script>

<style scoped></style>
