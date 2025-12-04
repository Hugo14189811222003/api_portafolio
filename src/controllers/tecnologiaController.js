const pool = require('../database');

const getTecnologias = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM tecnologia');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tecnologías', error });
    }
};

const getTecnologiaById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM tecnologia WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Tecnología no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tecnología', error });
    }
};

const createTecnologia = async (req, res) => {
    const { titulo } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO tecnologia (titulo) VALUES ($1) RETURNING id', [titulo]);
        res.status(201).json({ id: rows[0].id, titulo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tecnología', error });
    }
};

const updateTecnologia = async (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;
    try {
        const result = await pool.query('UPDATE tecnologia SET titulo = $1 WHERE id = $2', [titulo, id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Tecnología no encontrada' });
        res.json({ message: 'Tecnología actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tecnología', error });
    }
};

const deleteTecnologia = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tecnologia WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Tecnología no encontrada' });
        res.json({ message: 'Tecnología eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tecnología', error });
    }
};

module.exports = {
    getTecnologias,
    getTecnologiaById,
    createTecnologia,
    updateTecnologia,
    deleteTecnologia
};
