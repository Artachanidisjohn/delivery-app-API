const express = require('express');
const { sequelize } = require('../db'); // Σύνδεση με τη βάση δεδομένων
const cors = require('cors');
const userRoutes = require('../../apis/routes/userRoute'); // Εξαρτάται από τη δομή των routes

const app = express();
const PORT = process.env.PORT || 3200;

// Middleware
app.use(cors());
app.use(express.json()); // Για να χειρίζεσαι JSON δεδομένα

// Σύνδεση των routes
app.use('/apis/users', userRoutes);

// Συγχρονισμός της βάσης δεδομένων και εκκίνηση του server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to sync database:', err);
});

module.exports = app;
