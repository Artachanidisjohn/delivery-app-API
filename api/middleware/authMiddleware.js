const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired access token' });
        }

        req.user = user; // Αποθηκεύουμε τον χρήστη από το token
        next(); // Προχωράμε στο επόμενο middleware ή controller
    });
};

module.exports = authenticateToken;
