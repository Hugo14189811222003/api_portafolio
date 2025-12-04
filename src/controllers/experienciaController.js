const pool = require('../database');

const getExperiencia = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM experiencia_profesional');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener experiencia profesional', error });
    }
};

const getExperienciaById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM experiencia_profesional WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Experiencia no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener experiencia', error });
    }
};

const createExperiencia = async (req, res) => {
    const { id_usuario, titulo, trabajo_anterior, inicio_fin, informacion } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO experiencia_profesional (id_usuario, titulo, trabajo_anterior, inicio_fin, informacion) VALUES ($1, $2, $3, $4, $5) RETURNING id', [id_usuario, titulo, trabajo_anterior, inicio_fin, informacion]);
        res.status(201).json({ id: rows[0].id, id_usuario, titulo, trabajo_anterior, inicio_fin, informacion });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear experiencia', error });
    }
};

const updateExperiencia = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, titulo, trabajo_anterior, inicio_fin, informacion } = req.body;
    try {
        const result = await pool.query('UPDATE experiencia_profesional SET id_usuario = $1, titulo = $2, trabajo_anterior = $3, inicio_fin = $4, informacion = $5 WHERE id = $6', [id_usuario, titulo, trabajo_anterior, inicio_fin, informacion, id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Experiencia no encontrada' });
        res.json({ message: 'Experiencia actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar experiencia', error });
    }
};

const deleteExperiencia = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM experiencia_profesional WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Experiencia no encontrada' });
        res.json({ message: 'Experiencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar experiencia', error });
    }
};

module.exports = {
    getExperiencia,
    getExperienciaById,
    createExperiencia,
    updateExperiencia,
    deleteExperiencia
};
