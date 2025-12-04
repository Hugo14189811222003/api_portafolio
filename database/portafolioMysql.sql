create database portafolio;
use portafolio;
select * from proyecto_tecnologia;

create table usuario (
id int auto_increment primary key,
nombre varchar(150) not null,
gmail varchar(150) not null unique,
password varchar(150) not null,
creado_en datetime default current_timestamp
);
create table sobre_mi (
id int auto_increment primary key,
id_usuario int not null,
titulo varchar(150),
descripcion text,
creado_en datetime default current_timestamp,
foreign key(id_usuario) references usuario(id) on delete cascade
);
create table experiencia_profesional (
id int auto_increment primary key,
id_usuario int not null,
titulo varchar(150),
trabajo_anterior varchar(150),
inicio_fin varchar(150),
informacion text,
creado_en datetime default current_timestamp,
foreign key(id_usuario) references usuario(id) on delete cascade
);
create table educacion (
id int auto_increment primary key,
id_usuario int null,
titulo varchar(150),
universidad varchar(225),
inicio_fin varchar(150),
creado_en datetime default current_timestamp,
foreign key(id_usuario) references usuario(id)
);
create table proyecto (
id int auto_increment primary key,
tipo enum('paginas web', 'branding'),
creado_en datetime default current_timestamp
);
create table web (
id int auto_increment primary key,
id_proyecto int not null,
titulo varchar(150) not null,
link_github varchar(150) not null,
link_demo varchar(150) not null,
creado_en datetime default current_timestamp,
foreign key(id_proyecto) references proyecto(id) on delete cascade
);
create table marca (
id int auto_increment primary key,
id_proyecto int not null,
titulo varchar(150) not null,
link_behance varchar(150) not null,
link_demo varchar(150) not null,
creado_en datetime default current_timestamp,
foreign key(id_proyecto) references proyecto(id) on delete cascade
);
create table tecnologia (
id int auto_increment primary key,
titulo varchar(150) not null
);
create table proyecto_tecnologia (
id int auto_increment primary key,
id_proyecto int not null,
id_tecnologia int not null,
FOREIGN KEY (id_proyecto) REFERENCES proyecto(id)
    ON DELETE CASCADE,
FOREIGN KEY (id_tecnologia) REFERENCES tecnologia(id)
    ON DELETE CASCADE
);
