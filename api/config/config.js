require('dotenv').config();  // Για να φορτώσει τις μεταβλητές από το .env

var path = require('path'),
  rootPath = path.normalize(__dirname + '/..');

const apiMailSettings = {
  recipient: process.env.API_EMAIL_SEND_TO,
  emailSettings: {
    host: process.env.API_EMAIL_SMTP_HOST,
    port: process.env.API_EMAIL_SMTP_PORT,
    secure: process.env.API_EMAIL_SMTP_SECURE,
    auth: {
      user: process.env.API_EMAIL_USER,
      pass: process.env.API_EMAIL_PASSWORD,
    },
  },
};

var config = {
  development: {
    apiKey: process.env.API_KEY,
    apiVersion: process.env.DEV_API_VERSION,
    imagesPath: process.env.DEV_IMAGES_PATH,
    uiPath: process.env.DEV_UI_PATH,
    root: rootPath,
    apiMailSettings,
    app: {
      name: 'mobiroad',
    },
    port: process.env.DEV_NODE_PORT,
    stimulsoftPort: process.env.DEV_STIMULSOFT_PORT,
    description: process.env.DEV_DESCRIPTION,
    db: {
      database: process.env.DEV_DATABASE_NAME,    // Όνομα βάσης δεδομένων
      user: process.env.DEV_USERNAME,            // Χρήστης για σύνδεση στη βάση δεδομένων
      password: process.env.DEV_PASSWORD,        // Κωδικός για τον χρήστη
      define: {
        timestamps: true,
        underscored: true,
      },
      options: {
        host: process.env.DEV_DB_HOST,           // Host (localhost)
        port: process.env.DEV_DB_PORT,           // Θύρα (5432 για PostgreSQL)
        dialect: 'postgres',                    // Χρήση PostgreSQL
        minifyAliases: true,
        dialectOptions: {
          options: {
            requestTimeout: 10000,
          },
        },
        logQueryParameters: true,
        pool: {
          max: 100,
          min: 0,
          idle: 10000,
          maxIdleTime: 10000,
          acquire: 20000,
        },
      },
    },
  },
};

module.exports = config;
