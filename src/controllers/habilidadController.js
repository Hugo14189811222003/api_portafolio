const pool = require('../database');

// --- Controladores para la tabla 'habilidad' (Categorías) ---

const getHabilidades = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM habilidad');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener habilidades', error });
    }
};

const getHabilidadById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM habilidad WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Habilidad no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener habilidad', error });
    }
};

const createHabilidad = async (req, res) => {
    const { id_usuario, titulo } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO habilidad (id_usuario, titulo) VALUES ($1, $2) RETURNING id',
            [id_usuario, titulo]
        );
        res.status(201).json({ id: rows[0].id, id_usuario, titulo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear habilidad', error });
    }
};

const updateHabilidad = async (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;
    try {
        const result = await pool.query(
            'UPDATE habilidad SET titulo = $1 WHERE id = $2',
            [titulo, id]
        );
        if (result.rowCount === 0) return res.status(404).json({ message: 'Habilidad no encontrada' });
        res.json({ message: 'Habilidad actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar habilidad', error });
    }
};

const deleteHabilidad = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM habilidad WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Habilidad no encontrada' });
        res.json({ message: 'Habilidad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar habilidad', error });
    }
};

// --- Controladores para la tabla 'habilidades' (Items/Skills específicos) ---

const getHabilidadesItems = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM habilidades');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener items de habilidades', error });
    }
};

const getHabilidadesItemsByParent = async (req, res) => {
    const { id_habilidad } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM habilidades WHERE id_habilidad = $1', [id_habilidad]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener items por habilidad padre', error });
    }
};

const createHabilidadItem = async (req, res) => {
    const { id_habilidad, titulo, porcentaje } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO habilidades (id_habilidad, titulo, porcentaje) VALUES ($1, $2, $3) RETURNING id',
            [id_habilidad, titulo, porcentaje]
        );
        res.status(201).json({ id: rows[0].id, id_habilidad, titulo, porcentaje });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear item de habilidad', error });
    }
};

const updateHabilidadItem = async (req, res) => {
    const { id } = req.params;
    const { titulo, porcentaje } = req.body;
    try {
        const result = await pool.query(
            'UPDATE habilidades SET titulo = $1, porcentaje = $2 WHERE id = $3',
            [titulo, porcentaje, id]
        );
        if (result.rowCount === 0) return res.status(404).json({ message: 'Item de habilidad no encontrado' });
        res.json({ message: 'Item de habilidad actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar item de habilidad', error });
    }
};

const deleteHabilidadItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM habilidades WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Item de habilidad no encontrado' });
        res.json({ message: 'Item de habilidad eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar item de habilidad', error });
    }
};

module.exports = {
    getHabilidades,
    getHabilidadById,
    createHabilidad,
    updateHabilidad,
    deleteHabilidad,
    getHabilidadesItems,
    getHabilidadesItemsByParent,
    createHabilidadItem,
    updateHabilidadItem,
    deleteHabilidadItem
};
