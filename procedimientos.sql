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
create procedure login(in email varchar(250), in pass varchar(257))
begin
	if( (select pass from usuario where email = email) = pass ) then
		select 1 as 'Resultado';
	else
		select 0 as 'Resultado';
	end if; 
end //
delimiter ;
