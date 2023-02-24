const Sequelize =  require('sequelize');
const config = require('./../config');

const City = config.define('City', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    City: {
        type: Sequelize.STRING,
        allowNull: false
    },
    State: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Country: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {timestamps: false});

module.exports = City;