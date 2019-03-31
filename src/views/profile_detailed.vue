<template>
<div v-if='authed'>
 <Profile_select/>

<div  class="container">
<div class="row">
<div class="col">
<h1  class="display-2 text-center">Matchmaking&nbsp;{{this.$route.params.id}}&nbsp; mode stats</h1>
<h1  class="display-2 text-center">
Winrate:&nbsp;{{this.GetWinrate("M_","",$route.params.id)}}</h1>
<h1  class="display-2 text-center">
Games Won:&nbsp;{{this.Get("M_","",$route.params.id,'wins')}}</h1>
<h1  class="display-2 text-center">
Games Lost:&nbsp;{{this.Get("M_","",$route.params.id,'losses')}}</h1>
</div>
<div class="col">
<h1  class="display-2 text-center">Matchmaking&nbsp;{{this.$route.params.id}}&nbsp; pvp mode stats</h1>
<h1  class="display-2 text-center">
Winrate:&nbsp;{{this.GetWinrate("M_","pvp_",this.$route.params.id)}}</h1>
<h1  class="display-2 text-center">
Games Won:&nbsp;{{this.Get("M_","pvp_",this.$route.params.id,'wins')}}</h1>
<h1  class="display-2 text-center">
Games Lost:&nbsp;{{this.Get("M_","pvp_",this.$route.params.id,'losses')}}</h1>
</div>
</div>
<div class="row">
<div class="col">
<h1  class="display-2 text-center">Private&nbsp;{{this.$route.params.id}}&nbsp; mode stats</h1>
<h1  class="display-2 text-center">
Winrate:&nbsp;{{this.GetWinrate("P_","",this.$route.params.id)}}</h1>
<h1  class="display-2 text-center">
Games Won:&nbsp;{{this.Get("P_","",this.$route.params.id,'wins')}}</h1>
<h1  class="display-2 text-center">
Games Lost:&nbsp;{{this.Get("P_","",this.$route.params.id,'losses')}}</h1>
</div>
<div class="col">
<h1  class="display-2 text-center">Private&nbsp;{{this.$route.params.id}}&nbsp; pvp mode stats</h1>
<h1  class="display-2 text-center">
Winrate:&nbsp;{{this.GetWinrate("P_","pvp_",this.$route.params.id)}}</h1>
<h1  class="display-2 text-center">
Games Won:&nbsp;{{this.Get("P_","pvp_",this.$route.params.id,'wins')}}</h1>
<h1  class="display-2 text-center">
Games Lost:&nbsp;{{this.Get("P_","pvp_",this.$route.params.id,'losses')}}</h1>
</div>
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
  data:function () {
 return{
   Game_mode_private: 'M_',
  Game_mode_pvp:"",
  }  
},
  methods: {
    Get: function (prefix,pvp,routeid,sub) {
      return this.winrate[prefix+routeid+"_"+pvp+sub]
    },
    GetWinrate: function (prefix,pvp,routeid) {
      if ((this.Get(prefix,pvp,routeid,'wins')+this.Get(prefix,pvp,routeid,'losses'))==0){
        return "No games played yet"
      }
      return ((this.Get(prefix,pvp,routeid,'wins')/(this.Get(prefix,pvp,routeid,'wins')+this.Get(prefix,pvp,routeid,'losses'))).toFixed(4)*100).toFixed(2)+"%"
    }
  }
}

</script>
