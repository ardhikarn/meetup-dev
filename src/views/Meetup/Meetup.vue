<template>
  <v-app id="Meetup">
    <Navbar></Navbar>
    <v-container class="mt-3">
      <v-card class="mx-auto" max-width="700">
        <v-row dense>
          <v-col cols="12">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <v-card-title>{{ card.title }}</v-card-title>
              <v-card-subtitle class="secondary--text">{{
                card.date
              }}</v-card-subtitle>
            </v-img>

            <v-card-text class="primary--text">
              <div>Whitehaven Beach</div>

              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi quis laudantium debitis nihil adipisci, maiores
                aliquam obcaecati sequi dolorem expedita inventore nam fugit
                reiciendis fuga perspiciatis tempora eligendi. Et, ex!
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
  data: () => ({
    card: {
      title: 'Meetup in Tokyo',
      date: '12nd January 2021',
      src: 'https://static.toiimg.com/photo/47145223.cms'
    }
  })
}
</script>
