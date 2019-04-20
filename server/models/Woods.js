const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({

});

const Wood = mongoose.model('Wood',woodSchema);

module.exports = { Wood }
