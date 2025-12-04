const { Router } = require('express');
const router = Router();
const sobreMiController = require('../controllers/sobreMiController');

router.get('/', sobreMiController.getSobreMi);
router.get('/:id', sobreMiController.getSobreMiById);
router.post('/', sobreMiController.createSobreMi);
router.put('/:id', sobreMiController.updateSobreMi);
router.delete('/:id', sobreMiController.deleteSobreMi);

module.exports = router;
