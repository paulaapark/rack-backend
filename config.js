const environment = process.env.NODE_ENV || "production";//production or development

if(environment === 'production') {
    host = 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
    database = 'wj4a532o7deyy051';
    username = 'y1srulg2vmsdu9qp';
    password = 'v4wl2u9m6ym9mcxv';
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
