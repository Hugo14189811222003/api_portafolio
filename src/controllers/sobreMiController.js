const pool = require('../database');

const getSobreMi = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sobre_mi');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener información sobre mi', error });
    }
};

const getSobreMiById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM sobre_mi WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registro', error });
    }
};

const createSobreMi = async (req, res) => {
    const { id_usuario, titulo, descripcion } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO sobre_mi (id_usuario, titulo, descripcion) VALUES (?, ?, ?)', [id_usuario, titulo, descripcion]);
        res.status(201).json({ id: result.insertId, id_usuario, titulo, descripcion });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro', error });
    }
};

const updateSobreMi = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, titulo, descripcion } = req.body;
    try {
        const [result] = await pool.query('UPDATE sobre_mi SET id_usuario = ?, titulo = ?, descripcion = ? WHERE id = ?', [id_usuario, titulo, descripcion, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro', error });
    }
};

const deleteSobreMi = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM sobre_mi WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Registro no encontrado' });
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
