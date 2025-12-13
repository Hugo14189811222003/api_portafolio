const pool = require('../database');
const cloudinary = require('../cloudinary.config');


const getMarcas = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM marca');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos de marca', error });
    }
};

const getMarcaById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM marca WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Proyecto de marca no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyecto de marca', error });
    }
};

const createMarca = async (req, res) => {
    const { id_proyecto, titulo, descripcion, link_behance, link_demo } = req.body;
    try {
        let img = null;
        let img_public_id = null;
        if(req.file) {
            img = req.file.path;
            img_public_id = req.file.filename;
        }
        const { rows } = await pool.query('INSERT INTO marca (id_proyecto, titulo, descripcion, img, img_public_id, link_behance, link_demo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [id_proyecto, titulo, descripcion, img, img_public_id, link_behance, link_demo]);
        res.status(201).json({ id: rows[0].id, id_proyecto, titulo, descripcion, img, link_behance, link_demo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proyecto de marca', error });
    }
};

const updateMarca = async (req, res) => {
    const { id } = req.params;
    const { id_proyecto, titulo, descripcion, link_behance, link_demo } = req.body;
    try {
        const { rows } = await pool.query('SELECT * FROM marca WHERE id = $1', [id]);
        let img = rows[0].img;
        let img_public_id = rows[0].img_public_id;
        if (rows.length === 0) return res.status(404).json({ message: 'Proyecto no encontrado de usuario' });
        if(req.file) {
            if(rows[0].img_public_id) {
                await cloudinary.uploader.destroy(rows[0].img_public_id);
            }
            img = req.file.path;
            img_public_id = req.file.filename;
        }

        const result = await pool.query('UPDATE marca SET id_proyecto = $1, titulo = $2, descripcion = $3, img = $4, img_public_id = $5, link_behance = $6, link_demo = $7 WHERE id = $8', [id_proyecto, titulo, descripcion, img, img_public_id, link_behance, link_demo, id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Proyecto de marca no encontrado' });
        res.json({ message: 'Proyecto de marca actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar proyecto de marca', error });
    }
};

const deleteMarca = async (req, res) => {
    const { id } = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM marca WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({message: 'Proyecto de marca no encontrado'});
        let img_public_id = rows[0].img_public_id;
        if (img_public_id) {
            await cloudinary.uploader.destroy(img_public_id);
        }

        const result = await pool.query('DELETE FROM marca WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Proyecto de marca no encontrado' });
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
