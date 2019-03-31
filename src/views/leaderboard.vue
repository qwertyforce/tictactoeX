<template>
<div class="container" >
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Number of wins</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for='(user, index) in Leaderboard '>
      <th scope="row">{{index+1}}</th>
      <td>{{user.Username}}</td>
      <td>{{user.Wins}}</td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>

export default {
  data: function () {
    return {
      Leaderboard: null
    }
  },
  created () {
    $.ajax({
      url: 'https://backend.4battle.ru:8080/leaderboard'
    }).done(function (data) {
      var x = JSON.parse(data)
      for (var i = 0; i < x.length; i++) {
        x[i].Username = this.escapeHtml(x[i].Username)
      }
      this.Leaderboard = x
    }.bind(this))
  }
}
</script>
