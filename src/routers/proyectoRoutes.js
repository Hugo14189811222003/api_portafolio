const { Router } = require('express');
const router = Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/', proyectoController.getProyectos);
router.get('/:id', proyectoController.getProyectoById);
router.post('/', proyectoController.createProyecto);
router.put('/:id', proyectoController.updateProyecto);
router.delete('/:id', proyectoController.deleteProyecto);

// Rutas para tecnologías de proyectos
router.get('/:id/tecnologias', proyectoController.getProyectoTecnologias);
router.post('/:id/tecnologias', proyectoController.addProyectoTecnologia);
router.delete('/:id/tecnologias/:id_tecnologia', proyectoController.removeProyectoTecnologia);

module.exports = router;
