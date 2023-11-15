import React from 'react';
import {Link} from 'react-router-dom';
const axios = require('axios');

import randomImage from '../images/images';

class Reviews extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>

                <h1 className = "h1" style = {{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}> All Locations </h1>
                <div>
                    <div className = "row"> 
                        {
                           this.props.locations.map( (location) => {

                            return (<div className = 'col-sm-3'>
                                <div className='card'>
                                <img className="card-img-top" src={randomImage()} alt="Card image"/>
                                    <div className='card-body' >
                                        <h5 className="card-title"> {location.name} </h5>
                                        <p className='card-text'> {location.address} </p>
                                        <Link className="btn btn-primary" style={{backgroundColor: "#6f5499"}} to = {`/reviews/${location.id}`}> See Reviews</Link>
                                    </div>
                                </div>
                            </div>);
                           })     
                        }

                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Reviews;