module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT // Αποθήκευση του refresh token
          }
    }, {
        tableName: 'users', // Αντιστοιχία με το όνομα του πίνακα στη βάση δεδομένων
        timestamps: false, // Αν έχεις ήδη τις στήλες created_at και updated_at
    });

    return Users;
};
