$ = require('jquery');
mysql = require('mysql');
const prompt = require('electron-prompt');
let con = null;
function newSalario() {

    let name;
    let salary;
    prompt({
        title: 'Registrar nombre de salario',
        label: 'Nombre',
        inputAttrs: {
            type: 'text',
            required: true
        }
    }).then((r) => {
        if(r) {
            prompt({
                title: 'Registrar cantidad de salario',
                label: 'Salario en MXN: ',
                inputAttrs: {
                    type: 'number',
                    required: true
                }
            }).then((r2) => {
                newSalarioToDB(r, r2);
            })
        }
    })
}
function newSalarioToDB(n, s) {
    console.log(n);
    console.log(s);
    initDatabaseConnection('inserter', 'inserter123');
    con.connect((err) => {
        if(err) {
            console.log(err)
        } else {
            sql = 'call new_salario(?,?);';
            con.query(sql, [n, s], (err, res) => {
                if(err)
                {
                    console.log(err)
                } else {
                    console.log(res)
                    alert(res[0][0].Resultado);
                }
            })
        }
    })
}
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
function borraUser(id) {
    initDatabaseConnection('user_admin', 'user_admin123');
    console.log(id);
    con.connect((err) => {
       if(err) {
           console.log(err);
       } else {
           sql = 'call delete_user(?);';
           con.query(sql, [id], (err, res) => {
              if(err) {
                  console.log(err)
              } else {
                  console.log(res)
                  alert(res[0][0].Resultado)
                  window.location.reload()
              }
           });
       }
    });
}
function addListenets() {
    $('button').click((ev) => {
        let btn_value = ev.target.value;
        if(btn_value.includes('del')) {
            borraUser(btn_value.split(':')[1]);
            console.log('del')
        } else if(btn_value.includes('add')) {
            console.log('añadir trabajo')
        }
    });
}

$(document).ready(() => {
    initDatabaseConnection('consultor', 'consultor123');
    $('#upSal').click(function () {
        newSalario();
    });
    con.connect((err) => {
       if(err) {
           console.log(err)
       } else {
           sql = 'select id, email, nombre, aPaterno, edad, genero, estado from ver_datos_usuario where puesto = \'Operador\'';
           con.query(sql, (err, res) => {
              if(err) {
                  console.log(err)
              } else {
                  console.log(res);
                  let i = 1;
                  for(let obj of res) {
                      console.log(obj)
                      $('#tableContent').append(
                        '<tr>' +
                          '<td scope="row">' + i + '</td>' +
                          '<td>' + obj.email + '</td>' +
                          '<td>' + obj.nombre + '</td>' +
                          '<td>' + obj.aPaterno + '</td>' +
                          '<td>' + obj.edad + '</td>' +
                          '<td>' + obj.genero + '</td>' +
                          '<td>' + obj.estado + '</td>' +
                          '<td>' +
                          '<button class="btn btn-danger" value="del:'+obj.id+'" >' + 'Eliminar usuario'  + '</button>' +
                          '<button class="btn btn-primary" value="add:'+obj.id+'">' + 'Agregar trabajo'  + '</button>' +
                          '</td>' +
                          '</tr>'
                      );
                      i++;
                  }
                  addListenets();
              }
           });
       }
    });
});