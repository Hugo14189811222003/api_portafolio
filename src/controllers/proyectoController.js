const pool = require('../database');

const getProyectos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proyecto');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos', error });
    }
};

const getProyectoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM proyecto WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyecto', error });
    }
};

const createProyecto = async (req, res) => {
    const { tipo } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO proyecto (tipo) VALUES (?)', [tipo]);
        res.status(201).json({ id: result.insertId, tipo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proyecto', error });
    }
};

const updateProyecto = async (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;
    try {
        const [result] = await pool.query('UPDATE proyecto SET tipo = ? WHERE id = ?', [tipo, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar proyecto', error });
    }
};

const deleteProyecto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM proyecto WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar proyecto', error });
    }
};

const getProyectoTecnologias = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT t.* FROM tecnologia t
            JOIN proyecto_tecnologia pt ON t.id = pt.id_tecnologia
            WHERE pt.id_proyecto = ?
        `, [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tecnologías del proyecto', error });
    }
};

const addProyectoTecnologia = async (req, res) => {
    const { id } = req.params;
    const { id_tecnologia } = req.body;
    try {
        await pool.query('INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES (?, ?)', [id, id_tecnologia]);
        res.status(201).json({ message: 'Tecnología agregada al proyecto' });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar tecnología al proyecto', error });
    }
};

const removeProyectoTecnologia = async (req, res) => {
    const { id, id_tecnologia } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM proyecto_tecnologia WHERE id_proyecto = ? AND id_tecnologia = ?', [id, id_tecnologia]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Relación no encontrada' });
        res.json({ message: 'Tecnología eliminada del proyecto' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tecnología del proyecto', error });
    }
};

module.exports = {
    getProyectos,
    getProyectoById,
    createProyecto,
    updateProyecto,
    deleteProyecto,
    getProyectoTecnologias,
    addProyectoTecnologia,
    removeProyectoTecnologia
};
