<template>
     <div class="modal fade" id="Guest_mode" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Guest mode">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body" style="padding-bottom: 0px;">
<form id="form2" @submit="guest_play">
 <div class="form-group">
    <input type="text" class="form-control" id="username_guest" name="name" aria-describedby="username_guest" placeholder="Enter username" required/>
  </div>
  <div class="modal-footer" style="padding: 0;border: 0;">
<button type="submit"  style="
    margin-bottom: 5px;" class="btn btn-primary" @click="guest_play">Play</button>
</div>
</form>
</div>
</div>
</div>
</div>
</template>

<script>
export default {

  methods: {
    guest_play: function (e) {
      const regex = /[&<>"'/`=]/g
      e.preventDefault()
      if (regex.test(document.getElementById('Username').value) === true) {
        alert("Symbols &< > \" \'/ \`= are prohibited")
        return
      }
      $.ajax({
        url: 'https://backend.4battle.ru:8080/check_username',
        type: 'POST',
        data: $('#form2').serialize(),
        success: function (data) {
          if (data == '0') {
            window.sessionStorage.guest_username = document.getElementById('username_guest').value
            $('#Guest_mode').modal('hide')
            $('#GameModes').modal('show')
          } else {
            alert('This username is already taken')
          }
        },
        error: function (jXHR, textStatus, errorThrown) {
          alert(errorThrown)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
