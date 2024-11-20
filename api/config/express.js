
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');




const app = express();
const router = express.Router();

const userController = require('../controllers/userController');

// Δημιουργία route για login
router.post('/login', userController.loginController);

// Δημιουργία route για logout
router.post('/logout', userController.logoutController);

// Δημιουργία route για εγγραφή
router.post('/register', userController.registerController);


app.use(cors()); // Χρήση CORS για να επιτρέπει αιτήματα από άλλες πηγές (π.χ. το frontend)


app.use(bodyParser.json()); // Για να μπορεί να επεξεργάζεται JSON αιτήματα


module.exports = app; // Εξάγεις την εφαρμογή Express για χρήση 