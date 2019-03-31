<template>
<div class="col-md-2" id="LeftColumn">
                <div class="card card-block card-header">
                    Time for move: {{this.seconds}}s
                </div>
                <div class="card">
                    <div class="card-header">
                        Players ({{this.player_count}} of {{this.player_min_count}})
                    </div>
                    <div class="card-block" style=" padding-left: 0px;">
                        <div>
                            <i aria-hidden="true" class="fa fa-user-o fa-lg" style="padding: 10px;color:rgb(0,255,0);">{{this.players[0]}}</i>
                            <p id="0x" style="display:inline-block;margin-bottom: 0px;"></p>
                        </div>
                        <div>
                            <i aria-hidden="true" class="fa fa-user-o fa-lg" style="padding: 10px;color:rgb(0,197,255);">{{this.players[1]}}</i>
                            <p id="1x" style="display:inline-block;margin-bottom: 0px;"></p>
                        </div>
                        <div>
                            <i aria-hidden="true" class="fa fa-user-o fa-lg" style="padding: 10px;color:rgb(255,165,0);">{{this.players[2]}}</i>
                            <p id="2x" style="display:inline-block;margin-bottom: 0px;"></p>
                        </div>
                        <div>
                            <i aria-hidden="true" class="fa fa-user-o fa-lg" style="padding: 10px;color:rgb(0,0,255);">{{this.players[3]}}</i>
                            <p id="3x" style="display:inline-block;margin-bottom: 0px;"></p>
                        </div>
                    </div>
                </div>
                <div class="card card-block card-header" style="display: block;">
                    <span>Your Figure:</span> <span><i v-bind:class="this.figure" aria-hidden="true"></i></span>
                </div>
                <div class="card" id="bonus2" style="display: none;">
                    <div class="card-header">
                        Your Bonuses
                    </div>
                    <div class="card-block" id="bonus">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action"  v-bind:class="{ disabled: this.bonuses['set_block']===0 }" href="#" id="set_block"  role="tab">set_block (x{{this.bonuses["set_block"]}})</a> 
                            <a class="list-group-item list-group-item-action" href="#" v-bind:class="{ disabled: this.bonuses['destroy_block']===0 }" id="destroy_block"  role="tab">destroy_block (x{{this.bonuses["destroy_block"]}})</a>
                             <a class="list-group-item list-group-item-action" v-bind:class="{ disabled: this.bonuses['destroy_player_figure']===0 }" href="#" id="destroy_player_figure"  role="tab">destroy_player_figure (x{{this.bonuses["destroy_player_figure"]}})</a>
                              <a class="list-group-item list-group-item-action" v-bind:class="{ disabled: this.bonuses['enemy_figure_transform']===0 }" href="#" id="enemy_figure_transform"  role="tab">enemy_figure_transform (x{{this.bonuses["enemy_figure_transform"]}})</a>
                            <a class="list-group-item list-group-item-action" v-bind:class="{ disabled: this.bonuses['mine']===0 }" href="#" id="mine"  role="tab">mine (x{{this.bonuses["mine"]}})</a>
                        </div>
                    </div>
                </div>
                <div class="card card-block card-header" style="display: block;">
                    <label class="custom-control custom-checkbox"><input class="custom-control-input" @click="SoundToogle" type="checkbox"/> <span class="custom-control-indicator"></span> <span class="custom-control-description">Play sound when it is  your turn to play</span></label>
                </div>
            </div>
</template>

<script>

export default {
    computed: {
        seconds() {
            return this.$store.state.seconds
        },
        players() {
            return this.$store.state.players
        },
        player_min_count() {
            return this.$store.state.player_min_count
        },
        player_count() {
            return this.$store.state.player_count
        },
        bonuses() {
            return this.$store.state.bonuses
        }
    },
    data: function() {
        return {
            figure:  this.$store.state.figure
        }
    },
    methods: {
        SoundToogle: function() {
            let soundActive = (localStorage.getItem('sound') == 'true');
            if (soundActive) {
                localStorage.setItem('sound', "false")
            } else {
                localStorage.setItem('sound', "true")
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
