const express = require('express');
const router = express.Router();

const Locations = require('../models/Location.model');


router.get('/', (req, res) => {
    Locations.find({}, (error, data) => {
        if(error){
            res.sendStatus(500);
        }
        else{
            res.send(data);
        }
    });
});

router.post('/add', (req, res) => {
    Locations.exists({
        name: req.body.name,
        address: req.body.address
    }, (error, data) => {
        if(error){
            console.log("Error: Unable to add location");
        }
        else if(data != null){
            console.log("Error: Already exists");
        }
        else{
            Locations.create({
                name: req.body.name,
                address: req.body.address,
                reviews: []
            }, (error, data) => {
                if(error){
                    res.send(error);
                }
                else{
                    res.send(data._id);
                }
            });
        }
    });
});


module.exports = router;