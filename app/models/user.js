// pega uma instância de mongoose e mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// estabelece um model mongoose e passa-o a frente usando o module.exports

module.exports = mongoose.model('User', new Schema({
    login: String,
    password: String,
    admin: Boolean
}));