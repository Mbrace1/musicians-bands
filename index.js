
const {Sequelize, sequelize} = require('./db');
const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsToMany(Band, {through: "bandSongs"});
Band.belongsToMany(Song, {through: "bandSongs"});


module.exports = {
    Band,
    Musician,
    Song
};
