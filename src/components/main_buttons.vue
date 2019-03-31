<template>
  <div class="container">
<h1 class="display-1  text-center">Tic Tac Toe X</h1>
<h3 class="text-center ">A multiplayer tic tac toe  game</h3>
<div class="d-flex justify-content-center mt-5 fadeInRight" style="flex-wrap: wrap;">
<a v-if="authed" href="#"  onclick="$('#GameModes').modal('show')" class="btn btn-success" ><span class="fa fa-play"></span> Play</a>
<a v-if="!authed" href="https://backend.4battle.ru:8080/login_google" class="btn btn-danger mr-3" ><span class="fa fa-google-plus"></span> Google</a>
<a v-if="!authed" href="https://backend.4battle.ru:8080/login_vk" class="btn btn-primary mr-3" ><span class="fa fa-vk"></span> Vkontakte</a>
<a v-if="!authed" href="#" onclick="$('#Email_Registration').modal('show')"  class="btn btn-secondary mr-3" ><span class="fa fa-envelope-o"></span> E-mail</a>
<a v-if="!authed" href="#"   onclick="$('#Guest_mode').modal('show')"  class="btn btn-info" ><span class="fa fa-user-secret"></span> Guest play</a>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    authed: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  margin-bottom: 5px;
}
@keyframes fadeInRight {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(100%,0,0);
        transform: translate3d(100%,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

.fadeInRight {
    -webkit-animation-name: fadeInRight;
    animation-name: fadeInRight;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
}

</style>
