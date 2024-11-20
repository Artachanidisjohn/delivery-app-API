const userService = require('../services/userService');



// Συνάρτηση για την επεξεργασία του αιτήματος login
const loginController = async (req, res) => {

    console.log("Request Body:", req.body);


    try {
        // Καλούμε την υπηρεσία που ελέγχει αν ο χρήστης υπάρχει και αν ο κωδικός πρόσβασης είναι σωστός
        const user = await userService.login(req.body.email, req.body.password);

        // Αν ο χρήστης δεν βρεθεί ή ο κωδικός είναι λάθος, επιστρέφουμε 401 Unauthorized
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Αν ο έλεγχος είναι επιτυχής, επιστρέφουμε 200 OK και τα στοιχεία του χρήστη
        res.status(200).json({ message: 'Login successful', accessToken: user.accessToken, userId: user });

    } catch (error) {

        // Αν υπάρξει σφάλμα στον server κατά την επεξεργασία, επιστρέφουμε 500 Internal Server Error
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
};


const logoutController = async (req, res) => {
    const userId = req.body.userId; // Παίρνουμε το user ID από το access token μέσω του middleware

    try {
        // Κλήση του service για να διαγράψουμε το refresh token από τη βάση δεδομένων
        const result = await userService.logoutService(userId);

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        // Επιστροφή μηνύματος επιτυχίας
        res.status(200).json({ message: result.message });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};


const registerController = async (req, res) => {
    const { email, password, name, surname } = req.body;

    try {
        const result = await userService.registerUser(name, surname, email, password);

        if (!result.success) {
            return res.status(400).json({ msg: result.message });
        }

        res.status(200).json({ msg: result.message, userId: result.user });
    } catch (error) {
        console.error('Error in userController:', error);
        res.status(500).send('Server error');
    }
};





const getUserDetails = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userDetails = await userService.getUserDetails(userId);
        res.json(userDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    loginController,
    logoutController,
    registerController,
    getUserDetails
};
