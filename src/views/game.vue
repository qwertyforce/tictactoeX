<template>
<div class="container-fluid">
<div class="row">
 <Game_Info/>
 <Game/>
 <Chat/>
 <div aria-hidden="true" aria-labelledby="modalLabel" class="modal fade" id="Link" role="dialog" tabindex="-1">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="input-group">
                                <span class="input-group-addon" id="sizing-addon2">Link</span> <input aria-describedby="sizing-addon2" class="form-control" id="Link2" readonly type="text" value=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 </div>
 </div>
</template>

<script>
import Game_Info from '@/components/Game_Info.vue'
import Game from '@/components/Game.vue'
import Chat from '@/components/Chat.vue'
import Game_logic from '@/game_logic.js'
export default {
  components: {
    Game_Info,Game,Chat
  },
    beforeRouteLeave (to, from, next) {
    const answer = window.confirm('If you leave the game before it ends, you will be considered defeated.')
    if (answer) {
      window.onunload=null;
      Game_logic.wrapper.socket.close();
      next();
    } else {
      next(false)
    }
  },
  computed: {
    authed () {
      return  this.$store.state.authed
    }
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
    Game_logic.wrapper.create_socket()
    
    $(document).ready(function(){
      Game_logic.wrapper.game_start(self.$store,self.getParameterByName,self.escapeHtml);
    })
}
}
</script>
