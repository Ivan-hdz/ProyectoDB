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
	in numInterior int(5),
	in edad int(3)
	)
begin
	declare dirID int;
	declare infPerID int;
	declare idUser int;

	set dirID = (select max(idDir) from direccion);
	if( dirID = null ) then
		set dirID = 0;
	else
		set dirID = (dirID + 1);
	end if;
	insert into direccion values(dirID, calle, numInterior, idSepomex);

	set infPerID = (select max(idInfo) from infoPersona);
	if( infPerID = null ) then
		set infPerID = 0;
	else
		set infPerID = (infPerID + 1);
	end if;
	insert into infoPersona values(infPerID, nombre, aPaterno, aMaterno, idGenero, dirID, edad);

	set idUser = (select max(idUser) from usuario);
	if( idUser = null ) then
		set idUser = 0;
	else
		set idUser = (idUser + 1);
	end if;
	insert into usuario values(idUser, email, pass, infPerID, idPuesto);
	select 'Usuario registrado correctamente' as 'Resultado';
end //
delimiter ;

delimiter //
create procedure login(in email )