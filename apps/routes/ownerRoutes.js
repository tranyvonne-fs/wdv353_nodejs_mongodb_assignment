const express = require('express');
const router = express.Router();
const controller = require('../controllers/ownerController');

router.post('/', controller.createOwner);
router.get('/', controller.getAllOwners);
router.get('/:id', controller.getOwnerById);
router.put('/:id', controller.updateOwner);
router.delete('/:id', controller.deleteOwner);

module.exports = router;