const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    location:{
        type: Schema.Types.ObjectId,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;

