<template>
  <div>
  <select v-if='authed' id="Stat_modes" class="custom-select" @change="onChange($event)">
  <option value="1" :selected="this.$route.params.id=='total'">General Statistics</option>
  <option value="2" :selected="this.$route.params.id=='classic'">Classic Mode Statistics</option>
  <option value="3" :selected="this.$route.params.id=='modern' " >Modern Mode Statistics</option>
  <option value="4" :selected="this.$route.params.id=='point' ">Point Mode Statistics</option>
</select>
</div>
</template>

<script>


export default {
    computed: {
        authed() {
            return this.$store.state.authed
        }
    },

    methods: {
        onChange:function(event){
        switch (event.target.value) {
            case "1":
                this.$router.push('/profile/total')
                break;
            case "2":
                this.$router.push('/profile/classic')
                break;
            case "3":
                this.$router.push('/profile/modern')
                break;
            case "4":
                this.$router.push('/profile/point')
                break;
        }
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
