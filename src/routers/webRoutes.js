const { Router } = require('express');
const router = Router();
const webController = require('../controllers/webController');

router.get('/', webController.getWebs);
router.get('/:id', webController.getWebById);
router.post('/', webController.createWeb);
router.put('/:id', webController.updateWeb);
router.delete('/:id', webController.deleteWeb);

module.exports = router;
