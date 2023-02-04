const Sequelize =  require('sequelize');
const config = require('./../config');

const Rack = config.define('Rack', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Season: {
        type: Sequelize.ENUM('Spring','Summer','Fall','Winter'),
        allowNull: false
    },
    Item_type: {
        type: Sequelize.ENUM('Top','Bottom'),
        allowNull: true
    },
    Image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    User_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    },  

}, {timestamps: false});

module.exports = Rack;