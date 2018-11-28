const $ = require('jquery');
const jQuery = require('jquery');
const mysql = require('mysql');


(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
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
function getSepoFromCp(val)
{
    initDatabaseConnection('consultor', 'consultor123');
    con.connect(function (err) {
        if(err)
            console.log(err)
        else
        {
            let sql = 'select * from sepomex where cp = ?';
            con.query(sql, [val], function (err, result) {
                if(err)
                    console.log(err);
                else{
                    $('#sepomex').html('<option>Introduzca un código postal</option>');
                    for(let obj of result) {
                        $('#sepomex').append(
                            '<option value=' + obj.id + '>' +
                            obj.estado + ', ' + obj.ciudad + ', ' + obj.municipio + ', ' +
                            obj.tipo + ' ' + obj.asentamiento +
                            '</option>'
                        )
                    }
                }
            })
        }
    });
}
function submitForm(data)
{
    initDatabaseConnection('user_admin', 'user_admin123');
    con.connect(function (err) {
        if(err)
            console.log(err)
        else
        {
            let email = data.email;
            let pass = data.pwd;
            let idPuesto = data.puesto;
            let nombre = data.nombre;
            let aPaterno = data.aPaterno;
            let aMaterno = data.aMaterno;
            let idGenero = data.sexo;
            let idSepomex = data.sepomex;
            let calle = data.calle;
            let numExt = data.numExt;
            let edad = data.edad;
            let sql = 'call new_user(?,?,?,?,?,?,?,?,?,?,?);';
            con.query(sql,[email,pass,idPuesto,nombre,aPaterno,aMaterno,idGenero,idSepomex,calle,numExt,edad], function (err, result) {
                if(err)
                    console.log(err)
                else{
                    alert(result[0][0].Resultado);
                }
            });
        }
    });
}
$(document).ready(function () {
    $('#cp').keyup(function (ev) {
        getSepoFromCp($('#cp').val());
    })
    $( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        let data = $(this).serializeFormJSON();
        submitForm(data);
    });
    $("#btn_cancel").click((ev) => {
        window.location.replace('../main/index.html')
    })
});