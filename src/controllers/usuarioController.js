const pool = require('../database');

const getUsuarios = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};

const createUsuario = async (req, res) => {
    const { nombre, gmail, password } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO usuario (nombre, gmail, password) VALUES ($1, $2, $3) RETURNING id', [nombre, gmail, password]);
        res.status(201).json({ id: rows[0].id, nombre, gmail });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, gmail, password } = req.body;
    try {
        const result = await pool.query('UPDATE usuario SET nombre = $1, gmail = $2, password = $3 WHERE id = $4', [nombre, gmail, password, id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
