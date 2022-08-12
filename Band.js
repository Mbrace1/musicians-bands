const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('./db');

const Band = sequelize.define("bands", {
    name: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING
    }
})


module.exports = {Band};