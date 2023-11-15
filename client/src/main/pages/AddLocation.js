import React from 'react';
import { Navigate } from 'react-router-dom';
const axios = require('axios');

class AddLocation extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            toReviews: false
        }
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.target.elements);

        let data = event.target.elements;

        let name = data[0].value;
        let address;
        if(!data[2].value === ""){
            address = data[1].value + ", " + data[2].value;
        }
        else{
            address = data[1].value;
        }

        let location = data[3].value + ", " + data[4].value + " " + data[5].value; 
        
        axios.post('/api/locations/add', {
            name:  name.toLowerCase(),
            address: (address + "\n" + location).toLowerCase()
        }).then( (response) => {
            this.props.handleAddLocation({
                name: name.toLowerCase(),
                address: (address + "\n" + location).toLowerCase(),
                reviews: [], 
                id: (response.data).toString()
            })

            this.setState({
                toReviews: true
            })
        }).catch( (error) => {
            console.log(error);
        });
    }
    
    render(){
        if(this.state.toReviews){
            return <Navigate to="/reviews" replace={true}/>
        }
        return(
        <div>
            <h1 style={{textAlign:"center", marginTop: "10px"}} className = "h2"> Add A Location </h1>
            <div id = "add-form-ctnr">    
                <form id = "add-form"  onSubmit={this.handleSubmit}>
                    <div className ="form-group">
                        <label htmlFor = "name"> Name of Location </label>
                        <input className="form-control" name = "name" type = "text" placeholder="Papa's Pizzeria" required/>
                    </div>
                    
                    <div className = "form-group"> 
                        <label htmlFor = "address"> Address Line 1 </label>
                        <input className="form-control" name = "address" placeholder = "12345 Cinderella Dr" type = "text" required/>
                    </div>

                    <div className = "form-group"> 
                        <label htmlFor = "address"> Address Line 2 </label>
                        <input className="form-control" name = "address" placeholder = "Apt 106" type = "text"/>
                    </div>

                    <div className = "row">
                        <div className = "form-group col-auto">
                            <label htmlFor = "name"> City </label>
                            <input className="form-control" name = "name" type = "text" placeholder="Los Angeles" required/>
                        </div>

                        <div className = "form-group  col-auto">
                            <label htmlFor = "name"> State </label>
                            <input className="form-control" name = "name" type = "text" placeholder="CA" required/>
                        </div>

                        <div className = "form-group  col-auto">
                            <label htmlFor = "name"> Zip Code </label>
                            <input className="form-control" name = "name" type = "text" placeholder="28742" required/>
                        </div>
                    </div>
                    <div className = "form-group submit-btn-ctnr">
                        <input style={{backgroundColor: "#6f5499"}} className = "btn btn-primary" type = "submit" value = "Add Location"/> 
                    </div>
                    
                </form>
            </div>
        </div>
        );
    }
}

export default AddLocation;