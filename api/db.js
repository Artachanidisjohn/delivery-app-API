const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');

const envConfig = config[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(envConfig.db.database, envConfig.db.user, envConfig.db.password, {
    host: envConfig.db.options.host,
    dialect: envConfig.db.options.dialect,
    port: envConfig.db.options.port,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Εισαγωγή του μοντέλου Users από το αρχείο users.js
db.users = require('./models/users')(sequelize, DataTypes);

// Εισαγωγή του μοντέλου UserDetails από το αρχείο userDetails.js
db.userDetails = require('./models/userDetails')(sequelize, DataTypes);

module.exports = db;
