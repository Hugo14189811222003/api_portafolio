const pool = require('../database');

const getContacto = async (req, res) => {
     try {
        const { rows } = await pool.query('SELECT * FROM contacto');
        if(rows.length > 0) {
            console.log('Datos encontrados con exito');
            return res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: 'No se encontraron resultados'
            })
        }
     } catch (error) {
        console.log('Error con la base de datos');
        res.status(500).json({
            message: 'Problema con el servidor'
        })
     }
}

const postContacto = async (req, res) => {
    const {id_usuario, email, telefono, direccion} = req.body;
    if(!id_usuario || !telefono || !email || !direccion) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        })
    }
    try {
        const result = await pool.query('INSERT INTO contacto (id_usuario, email, telefono, direccion) VALUES ($1, $2, $3, $4) RETURNING id', [id_usuario, email, telefono, direccion]);
        if (result.rowCount > 0) {
            console.log('Usuario registrado con exito');
            res.status(201).json({
            message: 'Usuario registrado con exito'
            })
        } else {
            console.log('Hubo un problema con el servidor');
            res.status(500).json({
            message: 'Hubo un problema con el servidor'
            })
        }
    } catch (error) {
        console.log('Hubo un problema con el servidor');
        res.status(500).json({
            message: 'Hubo un problema con el servidor'
        })
    }
}

const putContacto = async (req, res) => {
    const id = req.params.id;
    const { id_usuario, telefono, email,direccion } = req.body;
    if(!id_usuario || !telefono || !email || !direccion) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        })
    }
    try {
        const result = await pool.query('UPDATE contacto SET id_usuario = $1, telefono = $2, email = $3, direccion = $4 WHERE id = $5', [id_usuario, telefono, email,direccion, id]);
        if (result.rowCount > 0) {
            console.log('Usuario actualizado con exito');
            res.status(200).json({
            message: 'Usuario actualizado con exito'
            })
        } else {
            console.log('No se encontró el usuario para actualizar');
            res.status(404).json({
            message: 'No se encontró el usuario para actualizar'
            })
        }
    } catch (error) {
        console.log('Hubo un problema con el servidor: ', error);
        res.status(500).json({
            message: 'Hubo un problema con el servidor'
        })
    }
}

const deleteContacto = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM contacto WHERE id = $1', [id]);
        if (result.rowCount > 0) {
            console.log('Usuario eliminado con exito');
            res.status(200).json({
            message: 'Usuario eliminado con exito'
            })
        } else {
            console.log('No se encontró el usuario para eliminar');
            res.status(404).json({
            message: 'No se encontró el usuario para eliminar'
            })
        }
    } catch (error) {
        console.log('Hubo un problema con el servidor: ', error);
        res.status(500).json({
            message: 'Hubo un problema con el servidor'
        })
    }
}

module.exports = {
    getContacto,
    postContacto,
    putContacto,
    deleteContacto
}