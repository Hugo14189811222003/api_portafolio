const { Router } = require("express");
const router = Router();
const {getContactoById, getContacto, postContacto, putContacto, deleteContacto} = require('../controllers/contactoController');

router.get('/', getContacto);
router.get('/:id', getContactoById)
router.post('/', postContacto);
router.put('/:id', putContacto);
router.delete('/:id', deleteContacto);  

module.exports = router;