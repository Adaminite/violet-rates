const express = require('express');
const router = express.Router();

const Users = require('../models/User.model');

router.post('/add', (req, res) => {
    const query = req.body;
    let username = query.username;
    let password = query.password;
    let email = query.email;

    Users.exists({username: username}, 
        (error, data) => {
            if(error){
                res.send("Cannot register at this time");
            }
            else if(data != null){
                res.send("Username already exists");
            }
            else{

                Users.exists({email: email}, (error, data) => {
                    if(error){
                        res.send("Cannot register at this time");
                    }
                    else if(data != null){
                        res.send("Email already taken");
                    }
                    else{
                        Users.create({
                            username: username,
                            password: password,
                            email: email
                        }, (error, data) => {
                            if(error){
                                res.send("Unable to register. Please try again later");
                            }
                            else{
                                res.send({id: data._id, name: username})  
                            }
                        })
                    }
                })
            }
        }   
    );}
)

router.get('/verify',(req, res) => {
    const data = req.query;
    const username = data.username;
    const password = data.password;

    Users.exists({username: username, password: password}, (error, data) => {
        if(error){
            res.send("Unable to sign in at this time. Please try again later");
        }
        else if(data != null){
            res.send({id: data._id, name: username})
        }
        else{
            res.send("Either username or password is incorrect");
        }
    });    
});

module.exports = router;