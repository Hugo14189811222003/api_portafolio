const pool = require('../database');

const getWebs = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM web');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos web', error });
    }
};

const getWebById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM web WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Proyecto web no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyecto web', error });
    }
};

const createWeb = async (req, res) => {
    const { id_proyecto, titulo, link_github, link_demo } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO web (id_proyecto, titulo, link_github, link_demo) VALUES (?, ?, ?, ?)', [id_proyecto, titulo, link_github, link_demo]);
        res.status(201).json({ id: result.insertId, id_proyecto, titulo, link_github, link_demo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proyecto web', error });
    }
};

const updateWeb = async (req, res) => {
    const { id } = req.params;
    const { id_proyecto, titulo, link_github, link_demo } = req.body;
    try {
        const [result] = await pool.query('UPDATE web SET id_proyecto = ?, titulo = ?, link_github = ?, link_demo = ? WHERE id = ?', [id_proyecto, titulo, link_github, link_demo, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto web no encontrado' });
        res.json({ message: 'Proyecto web actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar proyecto web', error });
    }
};

const deleteWeb = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM web WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto web no encontrado' });
        res.json({ message: 'Proyecto web eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar proyecto web', error });
    }
};

module.exports = {
    getWebs,
    getWebById,
    createWeb,
    updateWeb,
    deleteWeb
};
