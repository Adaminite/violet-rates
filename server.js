const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path");
const LocationsRouter = require('./routes/locations');
const UsersRouter = require('./routes/users');
const ReviewsRouter = require('./routes/reviews');


const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/locations', LocationsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/reviews', ReviewsRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}
else{
    app.get('/', (req, res) => {
        res.send("Works");
    });    
}

app.listen(port, () => {
    console.log("Listening on port " + port);
});


module.exports = app;
