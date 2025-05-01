const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const ownerRoutes = require('./routes/ownerRoutes');
const petRoutes = require('./routes/petRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);

module.exports = app;
