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
                <v-btn class="primary" @click="uploadImage">Upload Image</v-btn>
                <input
                  type="file"
                  accept="image/*"
                  style="display: none"
                  ref="fileInput"
                  @change="onFilePicked"
                />

                <v-img :src="imageUrl"></v-img>
                <v-textarea
                  name="description"
                  v-model="description"
                  :rules="[() => !!description || 'This field is required']"
                  label="Description"
                  required
                ></v-textarea>
                <p style="fontSize: 16px" class="mt-5">Date and Time</p>
                <v-row>
                  <v-col cols="12"
                    ><v-date-picker
                      v-model="date"
                      elevation="10"
                    ></v-date-picker
                  ></v-col>
                  <v-col
                    ><v-time-picker
                      v-model="time"
                      format="24hr"
                      elevation="10"
                    ></v-time-picker
                  ></v-col>
                </v-row>
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
    time: new Date(),
    image: null
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
      if (!this.isFormValid) return
      if (!this.image) return
      const dataMeetup = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', dataMeetup) // parameter creatMeetup is (store.action)
      this.$router.push('/meetups')
    },
    uploadImage() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      console.log(event.target)
      const files = event.target.files
      const filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style scoped></style>
