-- Tabla usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    gmail VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla sobre_mi
CREATE TABLE sobre_mi (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(150),
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla experiencia_profesional
CREATE TABLE experiencia_profesional (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(150),
    trabajo_anterior VARCHAR(150),
    inicio_fin VARCHAR(150),
    informacion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla educacion
CREATE TABLE educacion (
    id SERIAL PRIMARY KEY,
    id_usuario INT,
    titulo VARCHAR(150),
    universidad VARCHAR(225),
    inicio_fin VARCHAR(150),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE SET NULL
);

-- Tabla contacto
CREATE TABLE contacto (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    email VARCHAR(150),
    telefono VARCHAR(20),
	direccion VARCHAR(150),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla proyecto
CREATE TABLE proyecto (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo TEXT CHECK (tipo IN ('paginas web', 'branding')),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);


-- Tabla web
CREATE TABLE web (
    id SERIAL PRIMARY KEY,
    id_proyecto INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    link_github VARCHAR(150) NOT NULL,
    link_demo VARCHAR(150) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proyecto) REFERENCES proyecto(id) ON DELETE CASCADE
);

-- Tabla marca
CREATE TABLE marca (
    id SERIAL PRIMARY KEY,
    id_proyecto INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    link_behance VARCHAR(150) NOT NULL,
    link_demo VARCHAR(150) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proyecto) REFERENCES proyecto(id) ON DELETE CASCADE
);

-- Tabla tecnologia
CREATE TABLE tecnologia (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL
);

-- Tabla proyecto_tecnologia
CREATE TABLE proyecto_tecnologia (
    id SERIAL PRIMARY KEY,
    id_proyecto INT NOT NULL,
    id_tecnologia INT NOT NULL,
    FOREIGN KEY (id_proyecto) REFERENCES proyecto(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tecnologia) REFERENCES tecnologia(id) ON DELETE CASCADE
);
