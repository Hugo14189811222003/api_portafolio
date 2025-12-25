const { Router } = require('express');
const router = Router();
const marcaController = require('../controllers/marcaController');
const upload = require('../middleware/upload');

router.get('/', marcaController.getMarcas);
router.get('/:id', marcaController.getMarcaById);
router.post('/', upload.single('img'), marcaController.createMarca);
router.put('/:id', upload.single('img'), marcaController.updateMarca);
router.delete('/:id', marcaController.deleteMarca);

module.exports = router;
