<template>
<div class="container">
<h1 class="display-3 text-center">Statistics</h1>
<h1 class="display-4">Games&nbsp;&nbsp;Played: {{Games_Played}}</h1>
<h1 class="display-4">Current Online: {{Online}}</h1>
</div>
</template>

<script>

export default {
  data: function () {
    return {
      Online: null,
      Games_Played: null
    }
  },
  created () {
    $.ajax({
      url: 'https://backend.4battle.ru:8080/online'
    }).done(function (data) {
      this.Online = data
    }.bind(this))
    $.ajax({
      url: 'https://backend.4battle.ru:8080/Games_Played'
    }).done(function (data) {
      this.Games_Played = data
    }.bind(this))
  }
}
</script>
