const Owner = require('../models/Owner');

exports.createOwner = async (req, res) => {
  try {
    const owner = await Owner.create(req.body);
    res.status(201).json(owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllOwners = async (req, res) => {
  try {
    let query = Owner.find();

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

    const owner = await query;
    res.status(200).json(owner);
  } catch (err) {
    console.error('🐛 getOwner ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
  };

exports.getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.json(owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOwner = async (req, res) => {
  try {
    const updated = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOwner = async (req, res) => {
  try {
    await Owner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Owner deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};