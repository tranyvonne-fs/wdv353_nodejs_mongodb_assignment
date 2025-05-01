const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, enum: ['Dog', 'Cat', 'Bird', 'Other'], required: true },
  age: { type: Number, min: 0 },
  vaccinated: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true }
});

module.exports = mongoose.model('Pet', petSchema);
