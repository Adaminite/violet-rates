const express = require('express');

const router = express.Router();

const Reviews = require('../models/Review.model');
const Locations = require('../models/Location.model');

const mongoose = require('mongoose');

router.put('/add', (req, res) => {
    const query = req.body;
    let content = query.content;
    let rating = query.rating;
    let userId = mongoose.Types.ObjectId(query.userId);
    let date = query.date;
    let locationId = query.locationId;
    let username = query.username;

    Reviews.create({
        user: userId,
        username: username,
        content: content,
        date: date,
        rating: rating,
        location: locationId
    }, (error, data) => {
        if(error){
            res.send(error);
        }
        else{
            let reviewId = data._id;
            Locations.findOne({_id: locationId}, (error, data) =>{
                if(error){
                    res.send(error);
                }
                else{
                    let reviews = data.reviews;
                    reviews.unshift(mongoose.Types.ObjectId(reviewId));
                    Locations.updateOne({
                        _id: locationId
                    }, {reviews: reviews});
                }
            });
            res.send(data);
        }
    })
});

router.get('/get', (req, res) => {
    const data = req.query;
    const locationId = data.locationId;

    Reviews.find({location: mongoose.Types.ObjectId(locationId)}, (error, data) => {
        if(error){
            res.send([]);
        }
        else{
            res.send(data);
        }
    });
})
module.exports = router;