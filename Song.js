const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('./db');

const Song = sequelize.define("songs", {
    name: {
        type: DataTypes.STRING,
    },
})


module.exports = {Song};