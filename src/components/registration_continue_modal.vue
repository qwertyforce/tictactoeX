<template>

<div class="modal fade" id="flipFlop" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Sign up">
<span aria-hidden="true">&times;</span>
</button>
<h4 class="modal-title" id="modalLabel">Registration</h4>
</div>

<div class="modal-body">
Please, enter your username
<form class="form">
   <div class="form-group row">
    <div class="col-sm-10">
      <input type="text"  @keydown.enter.prevent="Username_send" class="form-control" id="Username" placeholder="Username"/>
    </div>
  </div>
</form>

</div>
<div class="modal-footer">
<button type="button" @click="Username_send" class="btn btn-primary" >Sign up</button>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
  methods: {
    Username_send() {
      const regex = /[&<>"'/`=]/g;
     if (regex.test(document.getElementById('Username').value) === true) {
        alert("Symbols &< > \" \'/ \`= are prohibited")
        return
    }
    $.ajaxSetup({xhrFields: { withCredentials: true } });
    var posting = $.post('https://backend.4battle.ru:8080/change_username', { Token: this.getParameterByName("Token"),
      name:document.getElementById('Username').value } );
  posting.done(function( data ) {
    if (data==="1"){
      window.location.replace("https://4battle.ru")
    } else{
      alert("Username already used")
    }
  });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
