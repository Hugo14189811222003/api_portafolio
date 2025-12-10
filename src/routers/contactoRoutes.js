const { Router } = require("express");
const router = Router();
const {getContacto, postContacto, putContacto, deleteContacto} = require('../controllers/contactoController');

router.get('/', getContacto);
router.post('/', postContacto);
router.put('/:id', putContacto);
router.delete('/:id', deleteContacto);  

module.exports = router;