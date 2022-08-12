const path = require('path');
const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data.sqlite"
})

module.exports = {
    sequelize,
    Sequelize
};
