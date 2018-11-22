// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
$ = require('jquery');
function login(email, pass) {

}
$(document).ready(function () {
   $('#btn_login').click(function () {
      login($('#email').val(), $('#pwd').val());
   });
   $('#btn_regis').click(function () {
       window.location.replace('../signup/signup.html')
   })
});