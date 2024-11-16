const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');


const login = async (email, password) => {
    try {

        // Βρες τον χρήστη με βάση το email
        const user = await db.users.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        // Σύγκριση του παρεχόμενου κωδικού με τον hashed κωδικό που αποθηκεύτηκε στη βάση δεδομένων
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        // Δημιουργία access token με σύντομη διάρκεια (π.χ., 15 λεπτά)
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Δημιουργία refresh token με μεγαλύτερη διάρκεια (π.χ., 7 ημέρες)
        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // Αποθήκευση του refresh token στη βάση δεδομένων
        await db.users.update(
            { refresh_token: refreshToken },
            { where: { id: user.id } }
        );

        // Επιστροφή του χρήστη και των tokens
        return {
            user,            // Επιστροφή στοιχείων του χρήστη
            accessToken,     // Επιστροφή access token
            refreshToken,    // Επιστροφή refresh token
        };
    } catch (error) {
        console.error('Error finding user:', error);
        throw error; // Ρίξε το σφάλμα για να το χειριστεί ο controller
    }
};



const logoutService = async (userId) => {
    try {
        // Ενημέρωση του refresh token σε NULL στη βάση δεδομένων
        const result = await db.users.update({ refresh_token: null }, {
            where: { id: userId }
        });

        // Επιστροφή αποτελέσματος
        if (result[0] === 0) {
            return { success: false, message: 'User not found or refresh token not updated' };
        }

        return { success: true, message: 'Logout successful' };
    } catch (error) {
        console.error('Error during logout in service:', error);
        throw new Error('Server error during logout');
    }
};


const registerUser = async (name, surname, email, password) => {
    try {
        // Έλεγχος αν ο χρήστης υπάρχει ήδη
        let user = await db.users.findOne({ where: { email } });

        if (user) {
            return { success: false, message: 'User already exists' };
        }

        // Hash του password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Δημιουργία νέου χρήστη και αποθήκευση στη βάση δεδομένων
        user = await db.users.create({
            name,
            surname,
            email,
            password: hashedPassword,
        });

        return { success: true, message: 'User registered successfully', user: user.dataValues.id };
    } catch (error) {
        console.error('Error in registerUser:', error);
        throw new Error('Error in registering user');
    }
};





const getUserDetails = async (userId) => {
    try {
        const userDetails = await db.userDetails.findOne({ where: { user_id: userId } });

        if (!userDetails) {
            throw new Error('User details not found');
        }

        return userDetails;
    } catch (error) {
        throw new Error('Error while retrieving user details: ' + error.message);
    }
};






module.exports = { login, logoutService, registerUser, getUserDetails };
