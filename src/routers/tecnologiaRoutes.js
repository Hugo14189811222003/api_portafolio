const { Router } = require('express');
const router = Router();
const tecnologiaController = require('../controllers/tecnologiaController');

router.get('/', tecnologiaController.getTecnologias);
router.get('/:id', tecnologiaController.getTecnologiaById);
router.post('/', tecnologiaController.createTecnologia);
router.put('/:id', tecnologiaController.updateTecnologia);
router.delete('/:id', tecnologiaController.deleteTecnologia);

module.exports = router;
