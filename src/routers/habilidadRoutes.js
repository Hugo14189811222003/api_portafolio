const { Router } = require('express');
const router = Router();
const habilidadController = require('../controllers/habilidadController');

// Rutas para 'habilidad' (Categorías)
router.get('/', habilidadController.getHabilidades);
router.get('/:id', habilidadController.getHabilidadById);
router.post('/', habilidadController.createHabilidad);
router.put('/:id', habilidadController.updateHabilidad);
router.delete('/:id', habilidadController.deleteHabilidad);

// Rutas para 'habilidades' (Items/Skills específicos)
// Se usa el prefijo /items para diferenciar de las categorías
router.get('/items/all', habilidadController.getHabilidadesItems); // Obtener todos los items sin importar padre
router.get('/items/parent/:id_habilidad', habilidadController.getHabilidadesItemsByParent); // Obtener items de una categoría
router.post('/items', habilidadController.createHabilidadItem);
router.put('/items/:id', habilidadController.updateHabilidadItem);
router.delete('/items/:id', habilidadController.deleteHabilidadItem);

module.exports = router;
