<template>
    <div class="modal fade" id="Email_Registration" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-label="Sign up">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body" style="padding-bottom: 0px;">
<form id="form1" @submit="email_reg" >
 <div class="form-group">
    <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
    <input type="password" class="form-control" name="password" id="InputPassword" oninput="checkPasswordValidity()" placeholder="Password" required/>
  </div>
  <div class="modal-footer" style="padding: 0;border: 0;">
<button type="submit"  class="btn btn-primary"  style="
    margin-bottom: 5px;" >Login/Signup</button>
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
    checkPasswordValidity: function () {
      var password = document.getElementById('InputPassword')
      if (password.value.length < 5) {
        password.setCustomValidity('Your password must be > 5')
      } else {
        password.setCustomValidity('')
      }
    },

    email_reg: function (e) {
      e.preventDefault()
      $.ajax({
        url: 'https://backend.4battle.ru:8080/by_email',
        type: 'POST',
        xhrFields: {
          withCredentials: true
        },
        data: $('#form1').serialize(),
        success: function (data) {
          if (data == 1) {
            alert('Check your email for registration link')
          } else if (data == 2) {
            location.reload()
          } else {
            alert('There is problem in email or password')
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
