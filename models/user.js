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
        allowNull: false
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
        type: Sequelize.ENUM('female', 'male', 'non-binary', 'prefer not to answer'),
        allowNull: true
    },
    Image: {
        type: Sequelize.STRING,
        allowNull: true
    }  

}, {timestamps: false});

module.exports = User;