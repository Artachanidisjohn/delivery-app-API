// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const express = require('express');
// const cors = require('cors');

// // Φόρτωση περιβαλλοντικών μεταβλητών
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors()); // Ενεργοποίηση CORS
// app.use(express.json());
// app.use(bodyParser.json()); // Για την επεξεργασία JSON δεδομένων
// app.use(bodyParser.urlencoded({ extended: true })); // Για URL-encoded δεδομένα

// // Routes
// const userRoutes = require('./api/routes/userRoute');
// app.use('/api', userRoutes); // Όλες οι routes θα είναι διαθέσιμες στο `/api`

// // Default route (προαιρετικό)
// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });

// // Εκκίνηση του server
// const PORT = process.env.PORT || 3100; // Χρήση μεταβλητής περιβάλλοντος αν υπάρχει
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const userController = require('./api/controllers/userController');

// Δημιουργία route για login
router.post('/login', userController.loginController);

// Δημιουργία route για logout
router.post('/logout', userController.logoutController);

// Δημιουργία route για εγγραφή
router.post('/register', userController.registerController);

app.use(cors({
  origin: 'https://artachanidis-john-delivery-app.vercel.app', // Βάλε το URL του frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Επιτρεπόμενες μέθοδοι
  credentials: true
})); // Ενεργοποίηση CORS

app.use(bodyParser.json()); // Για να μπορεί να επεξεργάζεται JSON αιτήματα

app.use(router); // Χρήση router για τις routes

module.exports = app; // Εξαγωγή του Express app
