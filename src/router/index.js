import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Meetups from '../views/Meetup/Meetups.vue'
import CreateMeetup from '../views/Meetup/CreateMeetup.vue'
import Meetup from '../views/Meetup/Meetup.vue'
import Signin from '../views/User/Signin.vue'
import Signup from '../views/User/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup
  },
  {
    path: '/meetup/:id',
    name: 'Meetup',
    component: Meetup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/User/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
