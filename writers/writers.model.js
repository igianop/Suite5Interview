const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WritersModel = new Schema({
    name: { type: String, required:true},
    age: { type: Number, required:true },
    email: { type: String, required:true }
},{
    timestamps: true
});

const Writer = mongoose.model('Writer', WritersModel);

module.exports = Writer;