//
const mysql = require('promise-mysql');
var config = require('../config.json')['development'];

export default {
  get_connection: async function() {
    let connection = await mysql.createConnection({
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DBNAME,
      multipleStatements: true
    });
    return connection;
  },    
  
}
