import React from 'react';
import {Navigate} from 'react-router-dom';

const axios = require('axios');

class LogIn extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            toHome: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const data = event.target.elements;
        const username = data[0].value.toLowerCase();
        const password = data[1].value;

        axios.get('/api/users/verify', {params: {
            username: username, password: password
        }}).then( (response) => {
            if(typeof response.data === 'string' || response.data instanceof String){
                alert(response.data);
            }
            else{
                this.setState({
                    toHome: true
                });
                console.log(response.data);
                this.props.handleSignIn(response.data.name, response.data.id);
            }
        }).catch( (error) => {
            console.log(error);
            alert("Unable to sign in at this time. Please try again later");
        })
    }

    render(){
        if(this.state.toHome){
            return <Navigate to="/" replace={true}/>
        }
        return(
            <div>       
                <h1 style={{textAlign:"center", marginTop: "10px"}} className = "h1"> Log In </h1>
                <div id = "log-in-container">
                    <form id="log-in-form" onSubmit = {this.handleSubmit}>
                        <div className= "form-group">
                            <label htmlFor="username"> Username </label>
                            <input className = "form-control" type = "text" name = "username" required/>
                        </div>

                        <div className= "form-group">
                            <label htmlFor="password"> Password</label>
                            <input className = "form-control" type = "password" name = "password" required/>
                        </div>

                        <div className = "form-group submit-btn-ctnr">
                            <input style={{backgroundColor: "#6f5499"}} className = "btn btn-primary" type = "submit" value = "Log In"/> 
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LogIn;