<template>
<div class="col-md-7 " style="padding: 0px;"> 
                <div v-bind:style="{ marginTop: margin + 'px',marginBottom: margin + 'px'}" class="row justify-content-center" >
                    <canvas id="myCanvas"></canvas>
                </div>
            </div>
</template>

<script>

import store from '@/store'
export default {
    computed: {
    margin () {
      return  this.$store.state.margin
    }
  }

}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
