const environment = process.env.NODE_ENV || "development";//production or development

if(environment === 'production') {
    host = 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
    database = 'pmgwgtbp5nsh0hox';
    username = 'c0cnh90cdwwigw01';
    password = 'bcir8ams7dq0ax8c';
    port = 3306;
}else {
    host = 'localhost';
    database = 'rackdb';
    username = 'root';
    password = 'password';
    port = 3307;
}

const Sequelize = require('sequelize');
const config = new Sequelize(database, username, password, {dialect: 'mariadb', host: host, port: port});

module.exports = config;
