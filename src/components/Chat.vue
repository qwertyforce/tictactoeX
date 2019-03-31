<template>
    <div class="col-md-3" id="RightColumn">
                <div class="chat-box">
                    <div class="chat-box-header">
                        Chat
                    </div>
                    <div class="chat-box-body" v-bind:style="{height:  ComputedHeight}">
                        <div class="chat-box-overlay"></div>
                        <div class="chat-logs"></div>
                    </div>
                    <div class="chat-input">
                        <div class="input-group">
                            <textarea id="chat-input" placeholder="Send a message..." rows="2"></textarea> 
                            <span class="input-group-btn grey_border">
                            <button class="chat-submit" id="chat-submit" type="submit"><span class="input-group-btn">
                            <i class="material-icons">send</i>
                            </span>
                            </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>


export default {
    computed: {
    ComputedHeight() {
        return 100-((56/this.innerHeight)*100+5+5)+'vh'
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
