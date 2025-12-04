const { Router } = require('express');
const router = Router();
const marcaController = require('../controllers/marcaController');

router.get('/', marcaController.getMarcas);
router.get('/:id', marcaController.getMarcaById);
router.post('/', marcaController.createMarca);
router.put('/:id', marcaController.updateMarca);
router.delete('/:id', marcaController.deleteMarca);

module.exports = router;
