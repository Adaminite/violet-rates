import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div id = "home">
                <div className="home-overlay">
                    <h1 className='home-title'> Welcome to Violet Rates! </h1>
                    <p className='home-caption'> A review platform for NYC students by NYC students. </p>
                </div> 
            </div>
        );
    }
}

export default Home;