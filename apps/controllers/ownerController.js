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
      const {
        isActive, // filter by boolean
        name,     // partial text match (optional)
        select,   // comma-separated fields like "name,email"
        page = 1,
        limit = 10,
        sortBy = 'createdAt'
      } = req.query;
  
      const query = {};
  
      if (isActive !== undefined) {
        query.isActive = isActive === 'true'; // converts string to boolean
      }
  
      if (name) {
        query.name = new RegExp(name, 'i'); // case-insensitive partial match
      }
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      const owners = await Owner.find(query)
        .select(select?.split(',').join(' ') || '')
        .sort({ [sortBy]: 1 })
        .skip(skip)
        .limit(parseInt(limit));
  
      res.json(owners);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
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