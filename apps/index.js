const express = require('express');
const ownerRoutes = require('./routes/ownerRoutes');
const petRoutes = require('./routes/petRoutes');

const app = express();
app.use(express.json());

app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);

module.exports = app;
