const express = require('express');
const router = express.Router();
const controller = require('../controllers/petController');

router.post('/', controller.createPet);
router.get('/', controller.getAllPets);
router.get('/:id', controller.getPetById);
router.put('/:id', controller.updatePet);
router.delete('/:id', controller.deletePet);

module.exports = router;
