<template>
  <v-app id="home">
    <Navbar></Navbar>
    <v-container class="mt-2">
      <v-row>
        <v-col cols="12" sm="6" class="text-center">
          <v-btn router to="/meetups">Explore Meetups</v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="text-center">
          <v-btn router to="/meetup/new">Organize Meetups</v-btn>
        </v-col>
      </v-row>
      <v-carousel class="my-5">
        <v-carousel-item
          v-for="(item, index) in meetups"
          :key="index"
          :src="item.imageUrl"
        >
          <v-row class="fill-height" align="end" justify="center">
            <div class="title pa-2">
              <h1>{{ item.title }}</h1>
            </div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <v-row>
        <v-col cols="12" class="text-center">
          <p router to="/meetups">Join our Awesome Meetups !</p>
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
  data: () => ({
    meetups: [
      {
        imageUrl:
          'https://resources.matcha-jp.com/resize/720x2000/2019/12/20-93633.jpeg',
        id: 'qwertyzxcvb101',
        title: 'Meetup in Shibuya'
      },
      {
        imageUrl: 'https://static.toiimg.com/photo/47145223.cms',
        id: 'qwertyzxcvb102',
        title: 'Meetup in Tokyo'
      },
      {
        imageUrl:
          'https://www.mensjournal.com/wp-content/uploads/2019/05/kyoto.jpg?w=900&h=506&crop=1&quality=86&strip=all&iswp=1',
        id: 'qwertyzxcvb103',
        title: 'Meetup in Kyoto'
      }
    ]
  })
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
