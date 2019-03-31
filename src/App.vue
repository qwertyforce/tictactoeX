<template>
  <div id="app">
    <NavBar :authed="authed"/>
     <transition name="fade">
  <router-view></router-view>
  </transition>
  </div>
</template>

<script>
import NavBar from '@/components/navbar.vue'

import store from '@/store'
export default {
  computed: {
    authed () {
      return store.state.authed
    }
  },
  components: {
    NavBar
  }
}
</script>
