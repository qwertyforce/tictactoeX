<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" >
    <router-link to="/"  class="navbar-brand" >TicTacToe</router-link>
      <button aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-target="#navbarNav" data-toggle="collapse" type="button"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
             <router-link to="/news"  class="nav-link" >News</router-link>
          </li>
          <li class="nav-item">
             <router-link to="/leaderboard" class="nav-link" >Leaderboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/stats" class="nav-link" >Server Statistics</router-link>
          </li>

          <li class="nav-item" v-if="authed">
            <router-link to="/profile/total" class="nav-link" >Profile</router-link>
          </li>
          <li class="nav-item" v-if="authed">
            <a href="https://backend.4battle.ru:8080/logout" class="nav-link" onclick="localStorage.setItem('authed','0')" >Log out</a>
          </li>
        </ul>
            <button type="button" class="btn btn-secondary" id="change_theme_button"
    onclick="document.querySelector('body').classList.toggle('light-theme');" >Change theme</button>
        <div class="card border-info d-inline-block" id="server_info">
          <div class="bullet connecting d-inline-block" id="server_info_bullet"></div>
          <p class="card-text d-inline-block" id="server_info_text">Connecting to server...</p>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  props: {
    authed: Boolean
  }
}
</script>
