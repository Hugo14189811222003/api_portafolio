const { Router } = require('express');
const router = Router();
const webController = require('../controllers/webController');
const upload = require('../middleware/upload');

router.get('/', webController.getWebs);
router.get('/:id', webController.getWebById);
router.post('/', upload.single('img'), webController.createWeb);
router.put('/:id', upload.single('img'), webController.updateWeb);
router.delete('/:id', webController.deleteWeb);

module.exports = router;
