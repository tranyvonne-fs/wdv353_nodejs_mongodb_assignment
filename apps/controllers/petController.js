const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner');
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
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