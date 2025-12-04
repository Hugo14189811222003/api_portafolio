const pool = require('../database');

const getMarcas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM marca');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos de marca', error });
    }
};

const getMarcaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM marca WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Proyecto de marca no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyecto de marca', error });
    }
};

const createMarca = async (req, res) => {
    const { id_proyecto, titulo, link_behance, link_demo } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO marca (id_proyecto, titulo, link_behance, link_demo) VALUES (?, ?, ?, ?)', [id_proyecto, titulo, link_behance, link_demo]);
        res.status(201).json({ id: result.insertId, id_proyecto, titulo, link_behance, link_demo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proyecto de marca', error });
    }
};

const updateMarca = async (req, res) => {
    const { id } = req.params;
    const { id_proyecto, titulo, link_behance, link_demo } = req.body;
    try {
        const [result] = await pool.query('UPDATE marca SET id_proyecto = ?, titulo = ?, link_behance = ?, link_demo = ? WHERE id = ?', [id_proyecto, titulo, link_behance, link_demo, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto de marca no encontrado' });
        res.json({ message: 'Proyecto de marca actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar proyecto de marca', error });
    }
};

const deleteMarca = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM marca WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto de marca no encontrado' });
        res.json({ message: 'Proyecto de marca eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar proyecto de marca', error });
    }
};

module.exports = {
    getMarcas,
    getMarcaById,
    createMarca,
    updateMarca,
    deleteMarca
};
