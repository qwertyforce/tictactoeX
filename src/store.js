import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authed: false,
    username: null,
       bonuses: {
             "set_block": 0,
             "destroy_block": 0,
             "destroy_player_figure": 0,
             "enemy_figure_transform": 0,
             "mine": 0
         },
         seconds: 45,
         player_count: 1,
         player_min_count: 4,
         players: [1, 2, 3, 4],
         figure: "",
         margin:0,
         winrate:null
  },
  mutations: {
    set_auth (state, isAuthed) {
    	state.authed = isAuthed
    },
    set_username (state, username) {
    	state.username = username
    },
    countdown_step(state) {
      state.seconds = state.seconds-1;
    },
    clear_time(state,time){
     state.seconds=time;
    },
    set_player_min_count (state, min_count) {
      state.player_min_count = min_count;
    },
    set_player_count (state, count) {
      state.player_count = count;
    },
    player_count_decrement (state){
    state.player_count=state.player_count-1;
    },
    set_player (state,{i,username}){
      state.players[i]=username
    },
    set_current_figure(state, figure) {
     state.figure=figure
    },
    change_bonus_amount_by(state,{bonus_name,amount}){
      state.bonuses[bonus_name]+=amount;    //works with negative values too, because math is cool
    },
    set_margin(state,margin){
      state.margin=margin;
    },
    set_winrate(state,winrate){
      state.winrate=winrate;
    }


  },
  actions: {

  }
})
