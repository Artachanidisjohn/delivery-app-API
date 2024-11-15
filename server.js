const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./apis/routes/userRoute');
app.use('/', userRoutes);

// Εκκίνηση του server
const PORT = process.env.PORT || 7071;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
