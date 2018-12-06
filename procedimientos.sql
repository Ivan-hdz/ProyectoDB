delimiter //
create procedure new_user(
	in email varchar(250),
	in pass varchar(257),
	in idPuesto int(3),
	in nombre varchar(250),
	in aPaterno varchar(250),
	in aMaterno varchar(250),
	in idGenero int(3),
	in idSepomex mediumint(8) unsigned,
	in calle varchar(250),
	in numExt int(5),
	in edad int(3)
	)
begin
	declare dirID int;
	declare infPerID int;
	declare idUserVar int;
	if (select email from usuario as u where u.email = email) = null then
		set dirID = (select (COALESCE(MAX(idDir),0) + 1) from direccion);
		insert into direccion values(dirID, calle, idSepomex, numExt);

		set infPerID = (select (COALESCE(MAX(idInfo),0) + 1) from infoPersona);
		insert into infoPersona values(infPerID, nombre, aPaterno, aMaterno, idGenero, dirID, edad);

		set idUserVar = (select (COALESCE(MAX(idUser),0) + 1) from usuario);
		insert into usuario values(idUserVar, email, pass, infPerID, idPuesto);
		select 'Usuario registrado correctamente' as 'Resultado';
	else
		select 'Ya se ha registrado un usuario con este correo' as 'Resultado';
	end if;
end //
delimiter ;

delimiter //
create procedure login(in correo varchar(250), in pwd varchar(257))
begin
	if (select pass from usuario where email = correo)  = pwd then
		select 1 as 'Resultado';
	else
		select 0 as 'Resultado';
	end if; 
end //
delimiter ;

delimiter //
create procedure delete_user(in id int) 
begin
	declare idInfoVar int;
	declare idDire int;
	if (select idUser from usuario where idUser = id) = id then 
		set idInfoVar = (select idInfoPersona from usuario where idUser = id);
		set idDire = (select idDir from infoPersona where idInfo = idInfoVar );
		delete from usuario where idUser = id;
		delete from infoPersona where idInfo = idInfoVar;
		delete from direccion where idDir = idDire;
		select 'Se ha eliminado el usuario correctamente' as 'Resultado';
	else
		select 'El usuario que intenta eliminar no existe' as 'Resultado';
	end if;
end //
delimiter ;

create view ver_datos_usuario as 
	select u.idUser as 'id', u.email as 'email', ip.nombre as 'nombre',
	  ip.aPaterno as 'aPaterno', ip.aMaterno as 'aMaterno', ip.edad as 'edad',
	  g.descripcion as 'genero', spo.estado as 'estado', spo.ciudad as 'ciudad',
	  spo.municipio as 'Municipio', spo.tipo as 'tipoAsentamiento', spo.asentamiento as 'asentamiento',
	  d.calle as 'calle', d.numExt as 'numeroExterior', cp.nombre as 'puesto'
	 from usuario as u
	 inner join infoPersona as ip on u.idInfoPersona = ip.idInfo
	 inner join catGeneros as g on ip.idGenero = g.idGen
	 inner join direccion as d on d.idDir = ip.idDir
	 inner join sepomex as spo on d.idSepomex = spo.id
	 inner join catPuestos as cp on u.idPuesto = cp.idPuesto;

delimiter //
create procedure new_salario(in n varchar(50), in s decimal) 
begin 
	declare id int;
	set id = (select (COALESCE(MAX(idSueldo),0) + 1) from catSueldos);
	insert into catSueldos values (id, n, s);
	select 'Registro realizado con exito' as 'Resultado';
end //
delimiter ;
