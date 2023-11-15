const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
        unique: true
    },
    reviews:{
        type: [Schema.Types.ObjectId],
        default: [],
        required: true
    }
});

const locationModel = mongoose.model('Location', locationSchema);

module.exports = locationModel;