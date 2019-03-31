import Vue from 'vue'
import Router from 'vue-router'
import News from './views/news.vue'
import Main from './views/main.vue'
import Leaderboard from './views/leaderboard.vue'
import Profile from './views/profile.vue'
import Profile_detailed from './views/profile_detailed.vue'
import Stats from './views/server_stats.vue'
import Game from './views/game.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/profile/total',
      component: Profile
    },
    {
      path: '/leaderboard',
      component: Leaderboard
    },
    {
      path: '/stats',
      component: Stats
    },
    {
      path: '/game',
      component: Game
    },
    {
      path: '/profile/:id',
      component: Profile_detailed
    },

  ]
})
