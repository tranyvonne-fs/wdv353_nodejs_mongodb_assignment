const Pet = require('../models/Pet');
const messages = require('../utils/messages');

exports.createPet = async (req, res) => {
    try {
      const { name, type, age, ownerId } = req.body;
  
      const owner = await Owner.findById(ownerId);
      if (!owner) {
        return res.status(404).json({ message: messages.ownerNotFound });
      }
  
      const newPet = new Pet({ name, type, age, owner: ownerId });
      await newPet.save();
  
      res.status(201).json({ message: messages.petCreated, data: newPet });
    } catch (err) {
      res.status(500).json({ message: messages.serverError });
    }
  };

  exports.getAllPets = async (req, res) => {
    try {
      let query = Pet.find();
  
      if (req.query.select) {
        query = query.select(req.query.select);
      }
      if (req.query.sort) {
        query = query.sort(req.query.sort);
      }
      if (req.query.skip || req.query.limit) {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 10;
        query = query.skip(skip).limit(limit);
      }
  
      const pets = await query;
      res.status(200).json(pets);
    } catch (err) {
      console.error('🐛 getPets ERROR:', err.message);
      res.status(500).json({ message: err.message });
    }
  };

exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id)
          .select('-__v') // Exclude version field
          .populate('owner', '-__v'); // Populate owner details, excluding __v
    
        if (!pet) {
          return res.status(404).json({ message: messages.petNotFound });
        }
    
        res.json(pet);
      } catch (err) {
        res.status(500).json({ message: messages.serverError });
      }
};

exports.updatePet = async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
