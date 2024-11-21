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

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config(); // Φόρτωση περιβαλλοντικών μεταβλητών από το .env

const app = express();

// Ενεργοποίηση CORS
app.use(cors({
  origin: 'https://artachanidis-john-delivery-app.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Middleware για JSON δεδομένα
app.use(express.json());

// Routes
const userRoutes = require('./api/routes/userRoute'); // Ορθό path
app.use('/api', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Delivery API is running');
});

// Εκκίνηση του server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`[API] Express server is running on port ${PORT}`);
});

