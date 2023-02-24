const Sequelize =  require('sequelize');
const config = require('./../config');

const User = config.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email_verification: {
        type: Sequelize.TINYINT,
        defaultValue: '0',
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Birthday: {
        type: Sequelize.DATE,
        allowNull: true
    },
    Gender: {
        type: Sequelize.ENUM('Female', 'Male', 'Non-binary', 'Unselected'),
        allowNull: true,
        defaultValue: 'Unselected'
    },
    Image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Language: {
        type: Sequelize.ENUM('English'),
        defaultValue: 'English'
    },
    City_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true
    },  

}, {timestamps: false});

module.exports = User;