import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";;
import Reviews from "./pages/Reviews";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Location from "./pages/Location";
import AddLocation from "./pages/AddLocation";

const axios = require("axios");


class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isSignedIn: false,
            username: "",
            User: null,
            locations: []
        }

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleAddLocation = this.handleAddLocation.bind(this);
        this.handleAddReview = this.handleAddReview.bind(this);
    }

    componentDidMount(){
        axios.get("/api/locations").then( (response) => {
            let locations = []
            response.data.map( (value) => {

                let reviews = [];
                axios.get("/api/reviews/get", {params: {
                    locationId: (value._id).toString()
                }}).then( (response2) => {

                    if(response2.data != null){
                        response2.data.map( (review) => {
                            reviews.push(
                                {
                                    user: review.user,
                                    rating: review.rating, 
                                    date: review.date,
                                    content: review.content,
                                    username: review.username
                                }
                            );
                        });
                    }
                }).catch( (error) => {
                    console.log(error);
                });
                locations.push({
                    address: value.address,
                    name: value.name,
                    id: (value._id).toString(),
                    reviews: reviews
                });
            });

            this.setState({
                locations: locations
            });

            }).catch( (error) => {
                console.log(error);
            });
    }

    handleAddLocation(newLocation){
        this.setState({
            locations: this.state.locations.concat(newLocation)
        });
    }

    handleAddReview(text, locationId, rating){
        axios.put("/api/reviews/add", {
            userId: this.state.User,
            username: this.state.username,
            content: text,
            rating: rating, 
            date: Date.now(),
            locationId: locationId
        }).then( (response) => {
            let newLocations = this.state.locations.map( (location) => {
                if(location.id === locationId){
                    location.reviews.unshift({
                        user: response.data.user,
                        rating: response.data.rating, 
                        date: response.data.date,
                        content: response.data.content,
                        username: this.state.username
                    });
                }

                return location;
            });
            this.setState({
                locations: newLocations
            });

        }).catch( (error) => {
            console.log(error);
        })
    }

    handleSignIn(username, id){
        this.setState({
            isSignedIn: true,
            username: username,
            User: id
        });
    }
    

    handleLogOut(){
        this.setState({
            isSignedIn: false,
            username: "",
            User: null
        });
    }

    render(){
        return(
            <div className = "app">
                <Router>
                    <Navbar handleLogOut={this.handleLogOut} isSignedIn = {this.state.isSignedIn} currentUser = {this.state.username}/>
                    <Routes>
                        <Route exact path = "/" element={<Home/>}/>
                        <Route path = "/addlocation" element = {<AddLocation  handleAddLocation = {this.handleAddLocation}/>}/>
                        <Route exact path = "/reviews" element = {<Reviews locations = {this.state.locations}/>}/>
                        <Route path = "/reviews/:id" element={<Location locations = {this.state.locations} isSignedIn = {this.state.isSignedIn} addReview = {this.handleAddReview}/>} />
                        <Route path = "/signup" element = {<SignUp handleSignIn = {this.handleSignIn}/>}/>
                        <Route path = "/login" element = {<LogIn handleSignIn = {this.handleSignIn}/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}


export default App;