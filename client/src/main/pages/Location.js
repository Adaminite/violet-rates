import React, { useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';

const Location = (props) => {
    const {id} = useParams();
    const [rerender, setRerender] = useState(false);
    const[location, setLocation] = useState(null);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);

    const handleChange = (e) =>{
        setReview(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let rating = e.target.elements.rating.value;
        if(props.isSignedIn){
            props.addReview(review, id, rating);
            setReview("");  
        }
        else{
            alert("Please sign in to write a review!")
        }  
    }

    useEffect( () => {        
        let locations = props.locations;
        locations.map( (item) => {
                if(item.id === id && location === null){
                    setLocation(item);
                    setReviews(item.reviews);
                }
        });
    });

    useEffect( () => {
        setTimeout( () => {
            setRerender(!rerender)
        }, 100); 
    }, []);
    
    const capitalize = (word) => {
        
        let parts = word.split("\n");
        for(let part in parts){
            let words = parts[part].split(" ");
            for(let item in words){
                words[item] = words[item][0].toUpperCase() + words[item].substring(1);
            }
            parts[part] = words.join(" ");
        }
        return parts;
    }

    if(location === null){
        return(
            <div> </div>
        )
    }
    else{
        return(
            <div style = {{padding: "10px" }}>
   
                <div>
                    <h1>
                        {capitalize(location.name)}
                    </h1>
                    {
                        capitalize(location.address).map( (part) => {
                            return <h2> {part} </h2>
                        })
                    }
                </div>

                <br/>
                <br/>

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend className="form-label"> Add Review </legend>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="rating" id = "option1" value="1"/>
                            <label className="form-check-label" htmlFor="option1">1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="rating" id = "option2" value="2"/>
                            <label className="form-check-label" htmlFor="option2">2</label>
                        </div>

                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id = "option3" value="3"/>
                        <label className="form-check-label" htmlFor="option3">3</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id = "option4" value="4"/>
                        <label className="form-check-label" htmlFor="option4">4</label>
                        </div>

                        <div className ="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rating" id = "option5" value="5"/>
                        <label className="form-check-label" htmlFor="option5">5</label>
                        </div>
                    </fieldset>
                    <div className = "form-group">
                        <textarea onChange = {handleChange} style ={{resize: "none"}} maxLength={500} name = "review" className = "form-control" value={review}> </textarea>
                    </div>
                    <a> {500 - review.length} characters remaining </a>
                    <div className = "form-group submit-btn-ctnr">
                        <input style={{backgroundColor: "#6f5499"}} className = "btn btn-primary" type = "submit" value = "Add Review"/> 
                    </div>

                </form>

                <h2 id ="review-header"> Reviews </h2>
                <div id = "reviews-wrapper">

                
                    <div id = "reviews-container" className = "container">

                        <div className="row row-cols-3 align-items-start">
                                <div className = "col" style = {{flex: "1 0 auto", width: "100px", textAlign: "center"}}> Username </div>  
                                <div className = "col" style = {{flex: "1 0 auto", width: "100px", textAlign: "center"}}> Rating </div> 
                                <div className = "col" style = {{flex: "14 1 auto"}}> <p> Review </p> </div>
                        </div>

                        <hr/>

                        {reviews.map( (review) => {
                            return  (<div className="row row-cols-3 review-container align-items-start">
                                <div className = "col" style = {{flex: "1 0 auto", width: "100px", textAlign: "center", alignSelf:"center"}}> {review.username} </div>  
                                <div className = "col" style = {{flex: "1 0 auto", width: "100px", textAlign: "center",  alignSelf:"center"}}> {review.rating} </div> 
                                <div className = "col" style = {{flex: "14 1 auto", alignSelf:"center"}}> <p> {review.content} </p> </div>
                            </div>);
                        })}
                    </div>
                </div>


            </div>
        )
    }
}

export default Location;
