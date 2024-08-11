const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: '3306',
  ssl: true,
  multipleStatements: true,
})

// const connection = mysql.createPool({
//     host: config.HOST,
//     database: config.DATABASE,
//     user: config.USER,
//     password: config.PASSWORD,
//     // ssl: {
//     //     cert: fs.readFileSync("./BaltimoreCyberTrustRoot.crt.pem"),
//     //     rejectUnauthorized: true,
//     //   },
// });

// connection.connect(function (err) {
//     if (err) {
//         console.log('Error connecting to Database', err);
//         return;
//     }
//     console.log('Connection established');
// });

module.exports = connection
