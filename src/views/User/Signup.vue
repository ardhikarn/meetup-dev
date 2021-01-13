<template>
  <v-app id="signup">
    <Navbar></Navbar>
    <v-container class="mt-4">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <form @submit.prevent="onSignup">
            <v-card ref="form">
              <v-card-text>
                <h1 class="primary--text mb-5">Sign up</h1>
                <v-text-field
                  name="email"
                  v-model="email"
                  :rules="
                    ([() => !!email || 'This field is required'],
                    [v => /.+@.+/.test(v) || 'E-mail must be valid'])
                  "
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                ></v-text-field>
                <v-text-field
                  name="password"
                  v-model="password"
                  :rules="[() => !!password || 'This field is required']"
                  label="Password"
                  type="password"
                  prepend-icon="mdi-lock"
                  required
                ></v-text-field>
                <v-text-field
                  name="confirmPassword"
                  v-model="confirmPassword"
                  label="Confirm Password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="[comparePassword]"
                  required
                ></v-text-field>
              </v-card-text>
              <v-divider class="mt-12"></v-divider>
              <v-card-actions>
                <v-btn color="primary" text type="submit">
                  Sign up
                </v-btn>
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
  name: 'Signup',
  components: {
    Navbar
  },
  data: () => ({
    email: '',
    password: '',
    confirmPassword: ''
  }),
  computed: {
    comparePassword() {
      return v => this.password === v || 'Password must match'
    }
  },
  methods: {
    onSignup() {
      if (this.confirmPassword === this.password) {
        const newSignup = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
        console.log(newSignup)
      }
    }
  }
}
</script>

<style scoped></style>
