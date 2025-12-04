const pool = require('../database');

const getEducacion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM educacion');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener educación', error });
    }
};

const getEducacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM educacion WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Educación no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener educación', error });
    }
};

const createEducacion = async (req, res) => {
    const { id_usuario, titulo, universidad, inicio_fin } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO educacion (id_usuario, titulo, universidad, inicio_fin) VALUES (?, ?, ?, ?)', [id_usuario, titulo, universidad, inicio_fin]);
        res.status(201).json({ id: result.insertId, id_usuario, titulo, universidad, inicio_fin });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear educación', error });
    }
};

const updateEducacion = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, titulo, universidad, inicio_fin } = req.body;
    try {
        const [result] = await pool.query('UPDATE educacion SET id_usuario = ?, titulo = ?, universidad = ?, inicio_fin = ? WHERE id = ?', [id_usuario, titulo, universidad, inicio_fin, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Educación no encontrada' });
        res.json({ message: 'Educación actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar educación', error });
    }
};

const deleteEducacion = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM educacion WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Educación no encontrada' });
        res.json({ message: 'Educación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar educación', error });
    }
};

module.exports = {
    getEducacion,
    getEducacionById,
    createEducacion,
    updateEducacion,
    deleteEducacion
};
