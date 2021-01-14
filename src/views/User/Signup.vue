<template>
  <v-app id="signup">
    <Navbar></Navbar>
    <v-container class="mt-4">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <Alert
            @dismissed="onDismissed"
            v-if="error"
            :pesan="error.message"
          ></Alert>
        </v-col>
        <v-col cols="12" sm="10" md="8" lg="6">
          <form @submit.prevent="onSignup">
            <v-card tile max-width="350" class="mx-auto">
              <v-card-title class="primary--text secondary"
                >Sign up</v-card-title
              >
              <v-card-text class="pt-5">
                <v-text-field
                  name="email"
                  v-model="email"
                  :rules="[
                    v => !!v || 'This field is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                  ]"
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                ></v-text-field>
                <v-text-field
                  name="password"
                  v-model="password"
                  :rules="[
                    () => !!password || 'This field is required',
                    v => v.length >= 6 || 'Min 6 characters'
                  ]"
                  label="Password"
                  prepend-icon="mdi-lock"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  required
                ></v-text-field>
                <v-text-field
                  name="confirmPassword"
                  v-model="confirmPassword"
                  label="Confirm Password"
                  prepend-icon="mdi-lock"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :rules="[comparePassword]"
                  required
                ></v-text-field>
              </v-card-text>
              <v-divider class="mt-12"></v-divider>
              <v-card-actions class="secondary">
                <v-btn
                  color="primary"
                  text
                  type="submit"
                  :loading="loading"
                  :disabled="loading"
                >
                  Sign up
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
import Alert from '@/components/Alert.vue'
export default {
  name: 'Signup',
  components: {
    Navbar,
    Alert
  },
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    show1: false,
    show2: false
  }),
  computed: {
    comparePassword() {
      return v => this.password === v || 'Password must match'
    },
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters.isLoading
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup() {
      if (this.confirmPassword === this.password) {
        this.$store.dispatch('userSignup', {
          email: this.email,
          password: this.password
        })
      }
    },
    onDismissed() {
      console.log('Dismissed Alert')
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped></style>
