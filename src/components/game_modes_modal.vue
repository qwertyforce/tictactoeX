<template>
 <div class="modal fade" id="GameModes" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-body">

  <div style="display: flex; align-items: center; justify-content: center;">
  <label class="custom-control custom-radio"   v-on:click="checkModes_Link(1)" >
    <input id="radio1" name="radio" type="radio" class="custom-control-input" checked/>
    <span class="custom-control-indicator"></span>
    <span class="custom-control-description">Classic</span>
  </label>
  <label class="custom-control custom-radio"  v-on:click="checkModes_Link(2)" >
    <input id="radio2" name="radio" type="radio" class="custom-control-input" />
    <span class="custom-control-indicator"></span>
    <span class="custom-control-description">Modern</span>
  </label>
  <label class="custom-control custom-radio"  v-on:click="checkModes_Link(3)" >
    <input id="radio3" name="radio" type="radio" class="custom-control-input" />
    <span class="custom-control-indicator"></span>
    <span class="custom-control-description">Point</span>
  </label>
  </div>

<div style="display: flex; align-items: center; justify-content: center;">
  <label class="custom-control custom-checkbox"  >
    <input type="checkbox" class="custom-control-input" v-on:click="Private_gm=!Private_gm;checkModes_Link(Current_gm)" />
    <span class="custom-control-indicator"></span>
    <span class="custom-control-description">Private Game (access only by link) </span>
  </label>
  <label class="custom-control custom-checkbox"  >
    <input type="checkbox" class="custom-control-input" v-on:click="Duel=!Duel;checkModes_Link(Current_gm)" />
    <span class="custom-control-indicator"></span>
    <span class="custom-control-description">1v1</span>
  </label>
  </div>
  <div style="display: flex;
    align-items: center;
    justify-content: center;">
    <p>{{Text}}</p>
  </div>
  <div style="display: flex;
   align-items: center;
    justify-content: center;">
    <button type="button" class="btn btn-primary " v-on:click="gotogame">Start</button>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      Text: 'Win line=5. No bonuses. Matchmaking.',
      Current_gm: 1,
      Private_gm: false,
      Duel: false,
      Link: '/game?classic=1'
    }
  },

  methods: {
    gotogame: function () {
       $('#GameModes').modal('hide')
       this.$router.push(this.Link);
    },
    get_pass: function () {
      var lut = []
      for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16)
      }
      var d0 = Math.random() * 0xffffffff | 0
      var d1 = Math.random() * 0xffffffff | 0
      var d2 = Math.random() * 0xffffffff | 0
      var d3 = Math.random() * 0xffffffff | 0
      return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
        lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
        lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
        lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
    },
    checkModes_Link: function (Gamemode) {
      if (this.Private_gm) {
        if (Gamemode == 1) {
          this.Link = '/game?classic=1&pass=' + this.get_pass()
          this.Current_gm = 1
          this.Text = 'Win line=5. No bonuses. Game is available only by link.'
        } else if (Gamemode == 2) {
          this.Link = '/game?modern=1&pass=' + this.get_pass()
          this.Current_gm = 2
          this.Text = 'Win line=7. Bonuses available. Game is available only by link.'
        } else if (Gamemode == 3) {
          this.Link = '/game?point=1&pass=' + this.get_pass()
          this.Current_gm = 3
          this.Text = 'Capture the point. Bonuses available. Game is available only by link.'
        }
      } else {
        if (Gamemode == 1) {
          this.Link = '/game?classic=1'
          this.Current_gm = 1
          this.Text = 'Win line=5. No bonuses. Matchmaking.'
        } else if (Gamemode == 2) {
          this.Link = '/game?modern=1'
          this.Current_gm = 2
          this.Text = 'Win line=7. Bonuses available. Matchmaking.'
        } else if (Gamemode == 3) {
          this.Link = '/game?point=1'
          this.Current_gm = 3
          this.Text = 'Capture the point. Bonuses available.'
        }
      }
      if (this.Duel) {
        this.Link = this.Link + '&duel=1'
        this.Text = this.Text + ' 1v1'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
