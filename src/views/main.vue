<template>
  <div class="home">
    <MainButtons :authed="authed"/>
    <Reg_continue/>
    <Game_modes_modal/>
    <Email_signin/>
    <Guest_modal/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainButtons from '@/components/main_buttons.vue'
import Reg_continue from '@/components/registration_continue_modal.vue'
import Game_modes_modal from '@/components/game_modes_modal.vue'
import Email_signin from '@/components/email_signin.vue'
import Guest_modal from '@/components/guest_mode_modal.vue'

export default {
  computed: {
    authed () {
      return  this.$store.state.authed
    }
  },
  components: {
    MainButtons, Reg_continue, Game_modes_modal, Email_signin, Guest_modal
  },mounted: function () {
 if(this.getParameterByName('Token') != null){
   $(document).ready(function(){
    $('#flipFlop').modal('show')
   })
      }
},
}
</script>
