import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const linkInlineStyle = {textDecoration: 'none', color: 'inherit'};
        let rightPart;
        if(this.props.isSignedIn){
            rightPart = <ul style = {{margin: 0, padding: 0, listStyleType: 'none'}} className = "right-items">
                            <li style={linkInlineStyle}> Hello, {this.props.currentUser}!</li>
                            <Link onClick = {this.props.handleLogOut} style={linkInlineStyle} to = "/"> Log Out </Link>
                        </ul>
        }
        else{
            rightPart = <ul style = {{margin: 0, padding: 0}} className = "right-items">   
                            <Link style={linkInlineStyle} to = "/signup"> Sign Up </Link>
                            <Link style={{textDecoration: 'none', color: 'inherit'}} to = "/login"> Log In </Link>
                        </ul>
        }
        return(
            <nav className = "my-navbar bg-dark">
                <ul style = {{margin: 0, padding: 0}} className ="left-items" >
                    <Link style={linkInlineStyle} to = "/"> Home </Link>
                    <Link style={linkInlineStyle} to = "/reviews"> Reviews </Link>
                    <Link style = {linkInlineStyle} to ="/addlocation"> Add Location</Link>
                </ul>
                {rightPart}
            </nav>
        );
    }
}


export default Navbar;