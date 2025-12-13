const pool = require('../database');
const cloudinary = require('../cloudinary.config');


const getWebs = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM web');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos web', error });
    }
};

const getWebById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM web WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Proyecto web no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyecto web', error });
    }
};

const createWeb = async (req, res) => {
    const { id_proyecto, titulo, descripcion, link_github, link_demo } = req.body;
    try {
        let img= null;
        let img_public_id= null;


        if(req.file) {
            img = req.file.path;
            img_public_id = req.file.filename;
        }

        const { rows } = await pool.query('INSERT INTO web (id_proyecto, titulo, descripcion, img, img_public_id, link_github, link_demo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [id_proyecto, titulo, descripcion, img, img_public_id, link_github, link_demo]);
        res.status(201).json({ id: rows[0].id, id_proyecto, titulo, descripcion, img, img_public_id, link_github, link_demo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proyecto web', error });
    }
};

const updateWeb = async (req, res) => {
    const { id } = req.params;
    const { id_proyecto, titulo, descripcion, link_github, link_demo } = req.body;

    try {
        const { rows } = await pool.query('SELECT * FROM web WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Proyecto web no encontrado' });

        let img = rows[0].img;
        let img_public_id = rows[0].img_public_id;

        if (req.file) {
            if (img_public_id) {
                await cloudinary.uploader.destroy(img_public_id);
            }
            
            img = req.file.path;
            img_public_id = req.file.filename;
        }

    await pool.query(
      `UPDATE web SET
      id_proyecto=$1,
      titulo=$2,
      descripcion=$3,
      img=$4,
      img_public_id=$5,
      link_github=$6,
      link_demo=$7
      WHERE id=$8`,
      [id_proyecto, titulo, descripcion, img, img_public_id, link_github, link_demo, id]
    );

    res.json({ message: 'Proyecto web actualizado correctamente' });

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar proyecto web', error });
  }
};

const deleteWeb = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM web WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Proyecto web no encontrado' });
        }

        if(rows[0].img_public_id) {
            await cloudinary.uploader.destroy(rows[0].img_public_id);
        }

        const result = await pool.query('DELETE FROM web WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Proyecto web no encontrado' });
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
