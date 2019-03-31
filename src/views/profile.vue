<template>
<div>
  <Profile_select/>
  <div class="container">
<h1 v-if='!authed'  class="display-4 text-center">Log in to see your stats</h1>
<h1 v-if='authed' class="display-4 text-center" style="padding-bottom: 10px;">Hello&nbsp;{{username}}</h1>
<div v-if='authed&&winrate'>
<h1  class="display-4 text-center">Your winrate:&nbsp;{{getwinrate()}}</h1>
<h1  class="display-4 text-center">Total Games Played:&nbsp;{{winrate.Loses+winrate.Wins}}</h1>
<h1  class="display-4 text-center">Games Won:&nbsp;{{winrate.Wins}}</h1>
<h1  class="display-4 text-center">Games Lost:&nbsp;{{winrate.Loses}}</h1>
</div>
</div>
</div>
</template>

<script>

import Profile_select from '@/components/profile_select.vue'


export default {
  components: {
    Profile_select
  },
  computed: {
    authed () {
      return  this.$store.state.authed
    },
    username () {
      return  this.$store.state.username
    },
     winrate () {
      return  this.$store.state.winrate
    }
  },
  methods: {
    getwinrate: function () {
      if (this.winrate.Loses + this.winrate.Wins == 0) {
        return 'No games played yet'
      } else {
        return ((this.winrate.Wins / (this.winrate.Wins + this.winrate.Loses)).toFixed(4) * 100).toFixed(2) + '%'
      }
    }
  }
}
</script>
