<template>
<div class="container-fluid">
<div class="row">
 <Game_Info/>
 <Game/>
 <Chat/>
 </div>
 </div>
</template>

<script>
import Game_Info from '@/components/Game_Info.vue'
import Game from '@/components/Game.vue'
import Chat from '@/components/Chat.vue'
import Game_logic from '@/game_logic_offline.js'
export default {
  components: {
    Game_Info,Game,Chat
  }, 
  methods: {
    SoundToogle: function () {
      let soundActive = (localStorage.getItem('sound') == 'true')
      if (soundActive) {
        localStorage.setItem('sound', 'false')
      } else {
        localStorage.setItem('sound', 'true')
      }
    }
  },
  mounted(){
    var self=this;
    $(document).ready(function(){
      Game_logic.wrapper.game_start(self.$store);
    })
}
}
</script>
