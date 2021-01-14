<template>
  <div>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item
          link
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app dense class="primary">
      <v-app-bar-nav-icon
        class="d-flex d-sm-none"
        @click.stop="sideNav = !sideNav"
      >
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        <router-link to="/" tag="span" style="cursor: pointer"
          >Meetup</router-link
        >
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        class="d-none d-sm-flex mx-3"
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.link"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    sideNav: false
    // { icon: 'mdi-logout-variant', title: 'Sign Out' }
  }),
  computed: {
    menuItems() {
      let menuItems = [
        { icon: 'mdi-account-plus-outline', title: 'Sign Up', link: '/signup' },
        { icon: 'mdi-login-variant', title: 'Sign In', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: 'mdi-account-group-outline',
            title: 'View Meetups',
            link: '/meetups'
          },
          {
            icon: 'mdi-map-marker-radius-outline',
            title: 'Organize Meetup',
            link: '/meetup/new'
          },
          { icon: 'mdi-account-outline', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      )
    }
  }
}
</script>

<style scoped></style>
