const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Εισαγωγή του sequelize από το db.js




const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
},
    {
        timestamps: false, // Απενεργοποίηση των στηλών createdAt και updatedAt
    });


module.exports = Product;
