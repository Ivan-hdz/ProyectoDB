#Usuarios
#admin@localhost : admin123 (all to ProyectoDB.*)
create user admin@localhost;
grant all on ProyectoDB.* to admin@localhost identified by 'admin123'

#user_admin@localhost : user_admin123 (all to ProyectoDB.usuario, ProyectoDB.direccion, ProyectoDB.infoPersona)
create user user_admin@localhost;
grant all on ProyectoDB.usuario to user_admin@localhost identified by 'user_admin123';
grant all on ProyectoDB.direccion to user_admin@localhost identified by 'user_admin123';
grant all on ProyectoDB.infoPersona to user_admin@localhost identified by 'user_admin123';
grant execute on procedure new_user to user_admin@localhost;

#operador@localhost : operador123 (select to ProyectoDB.trabajo, updato to ProyectoDB.trabajo.idEstadoTrabajo)
create user operador@localhost;
grant select on ProyectoDB.trabajo to operador@localhost identified by 'operador123';
grant update(idEstadoTrabajo) on trabajo to operador@localhost;

#consultor@localhost : consultor123 (select to ProyectoDB.*)
create user consultor@localhost;
grant select on ProyectoDB.* to consultor@localhost identified by 'consultor123'; 
