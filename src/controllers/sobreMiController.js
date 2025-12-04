const pool = require('../database');

const getSobreMi = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM sobre_mi');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener información sobre mi', error });
    }
};

const getSobreMiById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM sobre_mi WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registro', error });
    }
};

const createSobreMi = async (req, res) => {
    const { id_usuario, titulo, descripcion } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO sobre_mi (id_usuario, titulo, descripcion) VALUES ($1, $2, $3) RETURNING id', [id_usuario, titulo, descripcion]);
        res.status(201).json({ id: rows[0].id, id_usuario, titulo, descripcion });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro', error });
    }
};

const updateSobreMi = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, titulo, descripcion } = req.body;
    try {
        const result = await pool.query('UPDATE sobre_mi SET id_usuario = $1, titulo = $2, descripcion = $3 WHERE id = $4', [id_usuario, titulo, descripcion, id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro', error });
    }
};

const deleteSobreMi = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM sobre_mi WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro', error });
    }
};

module.exports = {
    getSobreMi,
    getSobreMiById,
    createSobreMi,
    updateSobreMi,
    deleteSobreMi
};
