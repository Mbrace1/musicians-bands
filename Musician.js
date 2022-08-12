const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('./db');

const Musician = sequelize.define("musician", {
    name: {
        type: DataTypes.STRING,
    },
    instrument: {
        type: DataTypes.STRING
    }
})


module.exports = {
    Musician
};