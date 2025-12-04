const { Router } = require('express');
const router = Router();
const educacionController = require('../controllers/educacionController');

router.get('/', educacionController.getEducacion);
router.get('/:id', educacionController.getEducacionById);
router.post('/', educacionController.createEducacion);
router.put('/:id', educacionController.updateEducacion);
router.delete('/:id', educacionController.deleteEducacion);

module.exports = router;
