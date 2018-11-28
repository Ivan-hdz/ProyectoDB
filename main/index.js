// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
$ = require('jquery');
mysql = require('mysql');
let con = null;

function initDatabaseConnection(in_user, in_pass) {
    if(con == null)
        con = mysql.createConnection({
            host: "localhost",
            user: in_user,
            password: in_pass,
            database: 'ProyectoDB'
        });
    else {
        con = null;
        initDatabaseConnection(in_user, in_pass);
    }
}
function login(email, pass) {
    initDatabaseConnection('user_admin', 'user_admin123');
    con.connect(function (err) {
        if (err)
            console.log(err)
        else {
            let sql = 'call login(?,?)';
            con.query(sql, [email, pass], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                    if(result[0][0].Resultado == '1') {
                        alert('Ha iniciado sesion correctamente')
                        window.location.replace('../welcome_admin/welcome_admin.html')
                    }else {
                        alert('Verifique su correo o contraseña')
                    }
                }
            });
        }
    });
}
$(document).ready(function () {
   $('#btn_login').click(function () {
      login($('#email').val(), $('#pwd').val());
   });
   $('#btn_regis').click(function () {
       window.location.replace('../signup/signup.html')
   });
});