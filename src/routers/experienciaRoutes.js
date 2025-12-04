const { Router } = require('express');
const router = Router();
const experienciaController = require('../controllers/experienciaController');

router.get('/', experienciaController.getExperiencia);
router.get('/:id', experienciaController.getExperienciaById);
router.post('/', experienciaController.createExperiencia);
router.put('/:id', experienciaController.updateExperiencia);
router.delete('/:id', experienciaController.deleteExperiencia);

module.exports = router;
